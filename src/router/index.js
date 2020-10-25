import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import(/* webpackChunkName: "CompareView" */'../views/CompareView')
  },
  {
    path: '/choropleth',
    name: 'Choropleth',
    component: () => import(/* webpackChunkName: "ChoroplethView" */'../views/ChoroplethView')
  },
  {
    path: '/details',
    name: 'DetailsView',
    component: () => import(/* webpackChunkName: "DetailsView" */'../views/DetailsView')
  },
  {
    path: '/methods',
    name: 'MethodsView',
    component: () => import(/* webpackChunkName: "MethodsView" */'../views/MethodsView')
  }
  /* {
    path: '/project',
    name: 'Project',
    component: Project
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  } */
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
