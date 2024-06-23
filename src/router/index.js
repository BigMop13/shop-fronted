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
    path: '/client-purchase',
    name: 'client-purchase',
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
    path: '/product_details/:id',
    name: 'product_details_id',
    meta: {loggedNavbar: true, requiresAuth: false},
    component: () => import('@/components/SingleProduct.vue')
  },
  {
    path: '/product_details/:name',
    name: 'product_details_name',
    meta: {loggedNavbar: true, requiresAuth: false},
    component: () => import('@/components/SingleProduct.vue')
  },
  {
    path: '/user/purchase/history',
    name: 'purchase-history',
    meta: {loggedNavbar: true, requiresAuth: true},
    component: () => import('@/components/UserOrdersHistory.vue'),
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
      console.log('no token');
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
