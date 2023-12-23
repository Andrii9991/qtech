import store from "@/store";
import { instanceApi } from "./instance";
import { AxiosResponse } from "axios";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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
      getAuth(),
      store.state.user.email,
      store.state.user.password
    );

    store.commit("user/setEmail", user.email);
    store.commit("user/setUsername", user.displayName);

    store.commit("user/authUser");

    instanceApi.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
  } catch (error) {
    console.log(error);
  }
};

export const registration = async (): Promise<void> => {
  try {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(
      auth,
      store.state.user.email,
      store.state.user.password
    );

    // Оновлення об'єкта користувача Firebase з новими даними
    await updateProfile(user, {
      displayName: store.state.user.username, // Додавання username
    });

    // Додавання додаткових полів до бази даних
    const database = getDatabase();
    const userRef = ref(database, `users/${user.uid}`);

    // Оновлення або додавання полів до існуючого об'єкта
    await set(userRef, {
      firstName: store.state.user.firstName,
      lastName: store.state.user.lastName,
      phoneNumber: store.state.user.phoneNumber,
      username: user.displayName,
      email: user.email,
    });

    store.commit("user/setEmail", user.email);
    store.commit("user/setUsername", user.displayName);
    store.commit("user/setPhoneNumber", store.state.user.phoneNumber);
    store.commit("user/setFirstName", store.state.user.firstName);
    store.commit("user/setLastName", store.state.user.lastName);
    store.commit("user/authUser");
  } catch (error) {
    console.log(error);
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
