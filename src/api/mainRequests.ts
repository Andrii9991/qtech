import store from "@/store";
import { instanceApi } from "./instance";
import { AxiosResponse } from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
    store.commit("user/authUser");
    instanceApi.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
  } catch (error) {}
};

export const registration = async (): Promise<void> => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      getAuth(),
      store.state.user.email,
      store.state.user.password
    );

    store.commit("user/setEmail", user.email);
    store.commit("user/authUser");
  } catch (error) {}
};

export const getAllUsers = async (): Promise<void> => {
  const { data } = await instanceApi.get("users?select=username,password");

  store.commit("user/setUserData", data.users);
};

export const getAllComments = async (): Promise<void> => {
  const { data } = await instanceApi.get("comments");

  store.commit("comments/setAllComments", data.comments);
};
