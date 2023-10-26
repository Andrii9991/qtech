import store from "@/store";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { instanceApi } from "@/api/instance";

Vue.use(VueRouter);

store.commit("initialiseStore");

const dataToken = store.state.user.token;
if (dataToken) {
  instanceApi.defaults.headers.common.Authorization = `Bearer ${dataToken}`;
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/catalog",
    name: "CatalogPage",
    component: () => import("@/views/CatalogPage.vue"),
  },
  {
    path: "/cotact",
    name: "ContactPage",
    component: () => import("@/views/ContactPage.vue"),
  },
  {
    path: "/catalog/:name",
    name: "ProductViewPage",
    component: () => import("@/views/ProductViewPage.vue"),
    // props: true
  },
  {
    path: "/sign-up",
    name: "SignUpPage",
    component: () => import("@/views/SignUpPage.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/cart",
    name: "CartPage",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/account",
    name: "AccountPage",
    component: () => import("@/views/AccountPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
