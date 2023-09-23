import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue')
  },
  
  {
    path: '/catalog',
    name: 'CatalogPage',
    component: () => import('@/views/CatalogPage.vue')
  },

  

  {
    path: '/cotact',
    name: 'ContactPage',
    component: () => import('@/views/ContactPage.vue')
  },

  

  {
    path: "/content/:id",
    name: "ContentPage",
    component: () => import('@/views/ContentPage.vue'),
    props: true
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
