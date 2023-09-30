import { IProducts } from "@/interface/interfaces";
export default {
  namespaced: true,
  state: {
    productList: [],
    currentProduct: {},
  },
  getters: {},
  mutations: {
    setProducts(state: any, products: IProducts[]): void {
      state.productList = [...products];
    },
    setCurrentProduct(state: any, product: IProducts) {
      state.currentProduct = { ...product };
    },
  },
};
