import store from "@/store";
import { instanceApi } from "./instance";
import { AxiosResponse } from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();

export const getAllProducts = async (): Promise<AxiosResponse> => {
  const responsePhones = await instanceApi.get("products/category/smartphones");
  const phonesList = responsePhones.data.products;
  const responseLaptops = await instanceApi.get("products/category/laptops");
  const laptopsList = responseLaptops.data.products;

  const allResponses = phonesList.concat(laptopsList);

  store.commit("products/setProducts", allResponses);
  return responsePhones;
};

export const login = async (): Promise<void> => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      store.state.user.email,
      store.state.user.password
    );

    store.commit("user/setEmail", user.email);
    store.commit("user/setUsername", user.displayName);
    store.commit("user/authUser");

    instanceApi.defaults.headers.common.Authorization = `Bearer ${user.uid}`;
  } catch (error) {
    console.error(error);
  }
};

export const registration = async (): Promise<void> => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      store.state.user.email,
      store.state.user.password
    );

    await updateProfile(user, {
      displayName: store.state.user.username,
    });

    // // Додавання додаткових полів до бази даних
    // const database = getDatabase();
    // const userRef = ref(database, `users/${user.uid}`);

    // // Оновлення або додавання полів до існуючого об'єкта
    // await set(userRef, {
    //   username: user.displayName,
    //   email: user.email,
    // });

    store.commit("user/setEmail", user.email);
    store.commit("user/setUsername", user.displayName);
    store.commit("user/authUser");
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async (): Promise<void> => {
  const { data } = await instanceApi.get("users?select=username,password");

  store.commit("user/setUserData", data.users);
};

export const getAllComments = async (): Promise<void> => {
  const { data } = await instanceApi.get("comments");

  store.commit("comments/setAllComments", data.comments);
};
