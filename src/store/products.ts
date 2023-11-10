import { IProduct } from "@/interfaces/products";
export default {
  namespaced: true,
  state: {
    productList: [],
    currentProduct: {},
  },
  getters: {},
  mutations: {
    setProducts(state: any, products: IProduct[]): void {
      const cartItem = [...products];
      cartItem.forEach((item: IProduct) => (item.count = 0));
      state.productList = [...cartItem];
    },
    setCurrentProduct(state: any, product: IProduct) {
      state.currentProduct = { ...product };
    },

    increament(state: any, cartItemId: number) {
      const foundItem = state.productList.find(
        (item: IProduct) => item.id === cartItemId
      );
      if (foundItem) {
        foundItem.count++;
      }
      // state.currentProduct.count++;
    },

    decreament(state: any, cartItemId: number) {
      const foundItem = state.productList.find(
        (item: IProduct) => item.id === cartItemId
      );
      if (foundItem.count > 0) {
        foundItem.count--;
      }
    },
  },
};
