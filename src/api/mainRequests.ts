import store from "@/store";
import { instanceApi } from "./instance";
import { AxiosResponse } from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";

export const getAllProducts = async (): Promise<AxiosResponse> => {
  const responsePhones = await instanceApi.get("products/category/smartphones");
  const phonesList = responsePhones.data.products;
  const responseLaptops = await instanceApi.get("products/category/laptops");
  const laptopsList = responseLaptops.data.products;

  const allResponses = phonesList.concat(laptopsList);

  store.commit("products/setProducts", allResponses);
  return responsePhones;
};

export const login = async (): Promise<Record<string, any>> => {
  try {
    const { user } = await signInWithEmailAndPassword(
      getAuth(),
      store.state.user.email,
      store.state.user.password
    );

    store.commit("user/setEmail", user.email);
    store.commit("user/setUsername", user.displayName);
    store.commit("user/authUser");

    instanceApi.defaults.headers.common.Authorization = `Bearer ${user.uid}`;

    return {
      responseType: "success",
      message: "User has been successfully created",
    };
  } catch (error) {
    console.error(error);
    return {
      responseType: "error",
      message: error,
    };
  }
};

export const registration = async (): Promise<void> => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      getAuth(),
      store.state.user.email,
      store.state.user.password
    );

    await updateProfile(user, {
      displayName: store.state.user.username,
      photoURL: "https://robohash.org/Z73.png?set=set2",
    });

    // Додавання додаткових полів до бази даних
    const database = getDatabase();
    const userRef = ref(database, `users/` + user.displayName);

    // Оновлення або додавання полів до існуючого об'єкта
    await set(userRef, {
      id: user.uid,
      username: store.state.user.username,
      email: store.state.user.email,
      password: store.state.user.password,
      photoURL: "https://robohash.org/Z73.png?set=set2",
    });

    store.commit("user/setEmail", user.email);
    store.commit("user/setUsername", user.displayName);
    store.commit("user/setImage", user.photoURL);
    store.commit("user/authUser");
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async (): Promise<void> => {
  try {
    const dbRef = ref(getDatabase());

    const allUsers = await get(child(dbRef, `/users`[0])).then((snapshot) => {
      return snapshot.val().users;
    });
    const usersArray = Object.values(allUsers);

    store.commit("user/setUserData", usersArray);
  } catch (error) {
    console.error("No data available");
  }
};

export const getAllComments = async (): Promise<void> => {
  const { data } = await instanceApi.get("comments");

  store.commit("comments/setAllComments", data.comments);
};
