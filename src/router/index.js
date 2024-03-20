import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/products/:categoryId',
    name: 'products_list',
    meta: {loggedNavbar: true, requiresAuth: true},
    component: () => import('@/components/ProductsList.vue'),
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    meta: {loggedNavbar: true, requiresAuth: true},
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
    name: 'register',
    meta: {loggedNavbar: false},
    component: () => import('@/components/RegisterForm.vue'),
  },
  {
    path: '/products/:id',
    name: 'product_details',
    meta: {loggedNavbar: true, requiresAuth: true},
    component: () => import('@/components/SingleProduct.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authToken = localStorage.getItem('userToken'); // Adjust depending on where you store the token

    if (!authToken) {
      next({ name: 'login' }); // Redirect to login
    } else {
      next(); // Proceed to route
    }
  } else {
    next(); // Does not require auth, make sure to always call next()!
  }
});

export default router
