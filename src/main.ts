import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import fireBaseConfig from "./fireBaseConfig";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(fireBaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
