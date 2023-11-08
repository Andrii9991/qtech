import { IProduct } from "@/interfaces/products";

export default {
  namespaced: true,
  state: {
    userCart: [],
    cartProduct: {},
    disabledButtonClicker: false,
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
    addToCart(state: any, productItem: IProduct) {
      const cartItem = { ...productItem };
      const existingCartItem = state.userCart.find(
        (item: IProduct) => item.id === cartItem.id
      );

      if (existingCartItem) {
        cartItem.count = (cartItem.count || 0) + 1;
      } else {
        cartItem.count = 1;
        state.userCart.push(cartItem);
      }
      state.cartProduct = cartItem;
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

    setCartProduct(state: any, product: IProduct) {
      state.cartProduct = { ...product };
    },

    searchCountItem(state: any, cartItem: IProduct) {
      const searchItem = state.userCart.find(
        (item: IProduct) => item.id === cartItem.id
      );
      if (searchItem.count) {
        state.disabledButtonClicker = true;
      }
      // console.log(searchItem);
    },
  },
};
