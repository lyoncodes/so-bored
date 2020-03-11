import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import SEO from '../views/SEO.vue'
import Resources from '../views/Resources.vue'
import SG from '../views/SG.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/SEO',
    name: 'SEO',
    component: SEO
  },
  {
    path: '/Resources',
    name: 'Resources',
    component: Resources
  },
  {
    path: '/SG',
    name: 'Styles',
    component: SG
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
