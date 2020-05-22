import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Test from '../views/Test.vue'

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
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
