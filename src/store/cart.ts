import { IProduct } from "@/interfaces/products";

export default {
  namespaced: true,
  state: {
    userCart: [],
    count: "1",
  },
  getters: {},
  mutations: {
    addToCart(state: any, cartItem: IProduct) {
      const existingCartItem = state.userCart.find(
        (item: IProduct) => item.id === cartItem.id
      );
      if (existingCartItem) {
        cartItem.count++;
      } else {
        cartItem.count = 1;
        state.userCart.push(cartItem);
      }
    },

    removeFromCart(state: any, cartId: number) {
      const neededIndex = state.userCart.findIndex(
        (item: IProduct) => item.id === cartId
      );
      if (neededIndex !== -1) {
        state.userCart.splice(neededIndex, 1);
      }
    },
    increament(state: any, cartItem: IProduct) {
      if (state.count) {
        cartItem.count++;
      }
    },

    decreament(state: any, cartItem: IProduct) {
      if (state.count > 0) {
        cartItem.count--;
      }
    },

    test(state: any, newCount: number) {
      state.count = newCount;
    },
  },
};
