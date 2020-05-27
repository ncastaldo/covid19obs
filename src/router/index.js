import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Location from '../views/Location.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/__test',
    name: 'Location',
    component: Location
  }
]

const router = new VueRouter({
  routes
})

export default router
