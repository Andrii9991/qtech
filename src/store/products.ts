export default {
  namespaced: true,
  state: {
    productList: [],
    currentProduct: {},
  },
  getters: {},
  mutations: {
    setProducts(state: any, products: Array<Record<string, unknown>>): void {
      state.productList = [...products];
    },
    setCurrentProduct(state: any, product: Array<Record<string, unknown>>) {
      state.currentProduct = { ...product };
    },
  },
};
