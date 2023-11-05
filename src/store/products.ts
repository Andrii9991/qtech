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
      products.forEach((item: IProduct) => (item.count = 1));
      state.productList = [...products];
    },
    setCurrentProduct(state: any, product: IProduct) {
      state.currentProduct = { ...product };
    },
  },
};
