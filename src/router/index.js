/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component:() => import('../views/HomeView.vue')
  },
  {
    path: '/main',
    name: 'main',
    meta: {layout: 'main'},
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'LoginRegister'},
    component: () => import('../views/UserLogin.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'LoginRegister'},
    component: () => import('../views/UserRegister.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
