import { IProduct } from "@/interfaces/products";

export default {
  namespaced: true,
  state: {
    userCart: [],
  },
  getters: {
    getCartCount(state: any): number {
      let cartCount = 0;

      state.userCart.forEach(
        (item: IProduct) => (cartCount += item.count || 0)
      );

      return cartCount;
    },
  },
  mutations: {
    addToCart(state: any, cartItem: IProduct) {
      const existingCartItem = state.userCart.find(
        (item: IProduct) => item.id === cartItem.id
      );
      if (existingCartItem) {
        cartItem.count = (cartItem.count || 0) + 1;
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

    increament(state: any, cartItemId: number) {
      const foundItem = state.userCart.find(
        (item: IProduct) => item.id === cartItemId
      );
      if (foundItem) {
        foundItem.count++;
      }
    },

    decreament(state: any, cartItemId: number) {
      const foundItem = state.userCart.find(
        (item: IProduct) => item.id === cartItemId
      );
      if (foundItem.count > 0) {
        foundItem.count--;
      }
    },

    setItem(state: any, updatedItem: { id: number; count: number }) {
      const foundItem = state.userCart.find(
        (item: IProduct) => item.id === updatedItem.id
      );
      if (foundItem) {
        foundItem.count = updatedItem.count + 1;
      }
    },
  },
};
