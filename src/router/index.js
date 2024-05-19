import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/products/1'
  },
  {
    path: '/products/:categoryId',
    name: 'products_list',
    meta: {loggedNavbar: true, requiresAuth: false},
    component: () => import('@/components/ProductsList.vue'),
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    meta: {loggedNavbar: true, requiresAuth: false},
    component: () => import('@/components/ShoppingCart.vue'),
  },
  {
    path: '/client-data-purchase',
    name: 'client-data-purchase',
    meta: {loggedNavbar: true, requiresAuth: false},
    component: () => import('@/components/ClientInfoForm.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {loggedNavbar: true, requiresAuth: false},
    component: () => import('@/components/LoginForm.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {loggedNavbar: true, requiresAuth: false},
    component: () => import('@/components/RegisterForm.vue'),
  },
  {
    path: '/product_details/:id', // zrobić wyszukanie przedmiotu z sugestii przez name (osobny endpoint needed) (id przedmiotu nie jest dostępne w redisie, dołożyć index na name w bazie)
    name: 'product_details',
    meta: {loggedNavbar: true, requiresAuth: false},
    component: () => import('@/components/SingleProduct.vue')
  },
  {
    path: '/user/purchase/history',
    name: 'purchase-history',
    meta: {loggedNavbar: true, requiresAuth: true},
    component: () => import('@/components/RegisterForm.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/user/purchase/history') {
    const authToken = localStorage.getItem('userToken');

    if (!authToken) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
