import Vue from "vue";
import Vuex from "vuex";
import products from "./products";
import user from "./user";
import cart from "./cart";
import filters from "./filters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    initialiseStore(state: any) {
      const savedState = localStorage.getItem("store");
      if (savedState) {
        this.replaceState({ ...state, ...JSON.parse(savedState) });
      }
    },
  },
  actions: {},
  modules: {
    products,
    user,
    cart,
    filters,
  },
});
