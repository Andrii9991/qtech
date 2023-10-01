import store from "@/store";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

store.commit("initialiseStore");

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
    path: "/productiew/:name",
    name: "ProductViewPage",
    component: () => import("@/views/ProductViewPage.vue"),
    // props: true
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: () => import("@/views/SignUpPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
