// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/products',
    name: 'products_list',
    meta: {loggedNavbar: true},
    component: () => import('@/components/ProductsList.vue'),
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    meta: {loggedNavbar: true},
    component: () => import('@/components/ShoppingCart.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {loggedNavbar: false},
    component: () => import('@/components/LoginForm.vue'),
  },
  {
    path: '/register',
    name: 'register_form',
    meta: {loggedNavbar: false},
    component: () => import('@/components/RegisterForm.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
