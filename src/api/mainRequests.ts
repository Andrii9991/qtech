import store from "@/store";
import { instanceApi } from "./instance";
import { AxiosResponse } from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/FireBase/Config";
import { IUser } from "@/interfaces/users";

export const getAllProducts = async (): Promise<AxiosResponse> => {
  const responsePhones = await instanceApi.get("products/category/smartphones");
  const phonesList = responsePhones.data.products;
  const responseLaptops = await instanceApi.get("products/category/laptops");
  const laptopsList = responseLaptops.data.products;

  const allResponses = phonesList.concat(laptopsList);

  store.commit("products/setProducts", allResponses);
  return responsePhones;
};

export const login = async (): Promise<Record<string, unknown>> => {
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
      message: "You have successfully logged in",
    };
  } catch (error) {
    return {
      responseType: "error",
      message: error,
    };
  }
};

export const registration = async (): Promise<Record<string, unknown>> => {
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

    addDoc(collection(db, "users"), {
      email: store.state.user.email,
      username: store.state.user.username,
      password: store.state.user.password,
    });

    store.commit("user/setEmail", user.email);
    store.commit("user/setUsername", user.displayName);
    store.commit("user/setImage", user.photoURL);
    store.commit("user/authUser");
    return {
      responseType: "success",
      message: "User has been successfully created",
    };
  } catch (error) {
    return {
      responseType: "error",
      message: error,
    };
  }
};

export const getAllUsers = async (): Promise<Record<string, unknown>> => {
  try {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      const tempUser: IUser[] = [];
      querySnapshot.forEach((doc) => {
        tempUser.push({
          id: doc.id,
          ...doc.data(),
        } as any);
        store.commit("user/setUserData", tempUser);
      });
    });

    return {
      responseType: "",
      message: "",
    };
  } catch (error) {
    return {
      responseType: "error",
      message: error,
    };
  }
};

export const getAllComments = async (): Promise<void> => {
  const { data } = await instanceApi.get("comments");

  store.commit("comments/setAllComments", data.comments);
};
