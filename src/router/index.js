// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'default_with_nav_bar',
    component: () => import('@/layouts/default/DefaultWithNavBar.vue'),
    children: [
      {
        path: '/products',
        name: 'products_list',
        component: () => import('@/components/ProductsList.vue'), //to be fixed, component not loading
      },
      ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/layouts/default/Default.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/layouts/default/Default.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
