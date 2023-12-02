export default {
  namespaced: true,
  state: {
    sortCategory: "",
    sortPrice: "",
  },

  mutations: {
    setSortCategory(state: any, newCategory: string) {
      state.sortCategory = newCategory;
    },
    setSortPrice(state: any, newPrice: string) {
      state.sortPrice = newPrice;
    },
  },
};
