import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Seo from '../views/Seo.vue'
import SG from '../views/SG.vue'
import Menu from '../views/Menu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/SEO',
    name: 'SEO',
    component: Seo
  },
  {
    path: '/SG',
    name: 'SG',
    component: SG
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: Menu
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
