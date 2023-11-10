import store from "@/store";
import { instanceApi } from "./instance";
import { AxiosResponse } from "axios";

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
  const { data } = await instanceApi.post("auth/login", {
    username: store.state.user.username,
    password: store.state.user.password,
  });

  store.commit("user/setUser", data);
  store.commit("user/authUser");

  instanceApi.defaults.headers.common.Authorization = `Bearer ${data.token}`;
};

export const getAllUsers = async (): Promise<void> => {
  const { data } = await instanceApi.get("users?select=username,password");

  store.commit("user/setUserData", data.users);
};
