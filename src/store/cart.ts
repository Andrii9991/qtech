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
    removeFromCart(state: any, cartId: number) {
      const neededIndex = state.userCart.findIndex(
        (item: IProduct) => item.id === cartId
      );
      if (neededIndex !== -1) {
        state.userCart.splice(neededIndex, 1);
      }
    },
  },
};
