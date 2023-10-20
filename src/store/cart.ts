import { IProduct } from "@/interfaces/products";

export default {
  namespaced: true,
  state: {
    userCart: [],
  },
  getters: {},
  mutations: {
    addToCart(state: any, cartItem: IProduct[]) {
      state.userCart.push(cartItem);
    },
    removeFromCart(state: any, cartItem: IProduct) {
      state.userCart.find((item: IProduct) => item.id === cartItem.id);
    },
  },
};
