import { IProduct } from "@/interfaces/products";

export default {
  namespaced: true,
  state: {
    userCart: [],
    // cartProduct: {},
  },
  getters: {},
  mutations: {
    addToCart(state: any, cartItem: IProduct[]) {
      state.userCart.push(cartItem);
    },
    removeFromCart(state: any, cartItem: IProduct) {
      const id = state.userCart.find(
        (item: IProduct) => item.id === cartItem.id
      );
      if (id !== 0) {
        state.userCart.splice(id, 1);
      }
    },
  },
};
