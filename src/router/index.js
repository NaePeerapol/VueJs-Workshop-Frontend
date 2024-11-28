import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import HomeView from '../views/SignIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signin',
    component: HomeView
  },
  {
    path: '',
    name: 'toolbar',
    component: () => import('../views/Toolbar.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: '/shop',
        name: 'shop',
        component: () => import('../views/Shop.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: '/grade',
        name: 'grade',
        component: () => import('../views/Grade.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/OrderList.vue'),
        meta: {requiresAuth: true}
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  const isAuthenticated = store.getters.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
