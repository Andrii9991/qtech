import store from "@/store";
import { instanceApi } from "./instance";
import { AxiosResponse } from "axios";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "../firebase";

export const getAllProducts = async (): Promise<AxiosResponse> => {
  const responsePhones = await instanceApi.get("products/category/smartphones");
  const phonesList = responsePhones.data.products;
  const responseLaptops = await instanceApi.get("products/category/laptops");
  const laptopsList = responseLaptops.data.products;

  const allResponses = phonesList.concat(laptopsList);

  store.commit("products/setProducts", allResponses);
  return allResponses;
};

export const login = async (): Promise<Record<string, unknown>> => {
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

    return {
      responseType: "success",
      message: "You have successfully logged in",
    };
  } catch (error) {
    return {
      responseType: "error",
      message: "There was an error",
    };
  }
};

export const googleAuth = async (
  method: "login" | "signup"
): Promise<Record<string, unknown>> => {
  const provider = new GoogleAuthProvider();

  try {
    const { user } = await await signInWithPopup(auth, provider);

    const token = await user.getIdToken();

    console.log(token);
    console.log(user);
    store.commit("user/setEmail", user.email);
    store.commit("user/setUsername", user.displayName);
    store.commit("user/authUser");

    instanceApi.defaults.headers.common.Authorization = `Bearer ${token}`;

    return {
      responseType: "success",
      message:
        method === "login"
          ? "You have successfully logged in"
          : "You have successfully signed up",
    };
  } catch (error) {
    return {
      responseType: "error",
      message: "There was an error",
    };
  }
};

export const registration = async (): Promise<Record<string, unknown>> => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      store.state.user.email,
      store.state.user.password
    );

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
      message: "There was an error",
    };
  }
};

export const getAllComments = async (): Promise<void> => {
  const { data } = await instanceApi.get("comments");

  store.commit("comments/setAllComments", data.comments);
};
