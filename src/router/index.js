/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component:() => import('../views/HomeView.vue')
  // },
  {
    path: '/',
    name: 'main',
    meta: {layout: 'main'},
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/allpodcast',
    name: 'allpodcast',
    meta: {layout: 'main'},
    component: () => import('../views/AllPodcast.vue')
  },
  {
    path: '/podcast',
    name: 'podcast',
    meta: {layout: 'main'},
    component: () => import('../views/MyPodcast.vue')
  },
  {
    path: '/saved',
    name: 'saved',
    meta: {layout: 'main'},
    component: () => import('../views/MySaved.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main'},
    component: () => import('../views/AllCategories.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {layout: 'main'},
    component: () => import('../views/UserSettings.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main'},
    component: () => import('../views/UserProfile.vue')
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
