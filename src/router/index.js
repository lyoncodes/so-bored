import Vue from 'vue'
import VueRouter from 'vue-router'
import { LayoutPlugin, FormPlugin, FormTextareaPlugin, FormGroupPlugin, FormInputPlugin } from 'bootstrap-vue'
import { auth } from '../../firebase'

Vue.use(LayoutPlugin)
Vue.use(FormPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormInputPlugin)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '../views/PageNotFound.vue')
  }
]
// router stack
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// Check if the user exists and requires auth for every route with meta data !!requiresAuth. Create reference to the current user and authentication routes

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router