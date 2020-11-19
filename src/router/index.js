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
    component: HomeView
  },
  {
    path: '/compare',
    component: () => import(/* webpackChunkName: "CompareView" */'../views/CompareView')
  },
  // {
  //  path: '/choropleth',
  //  component: () => import(/* webpackChunkName: "ChoroplethView" */'../views/ChoroplethView')
  // },
  {
    path: '/case-studies',
    component: () => import(/* webpackChunkName: "CaseStudiesView" */'../views/CaseStudiesView')
  },
  {
    path: '/methods',
    component: () => import(/* webpackChunkName: "MethodsView" */'../views/MethodsView')
  },

  {
    path: '/api',
    component: () => import(/* webpackChunkName: "ApiView" */'../views/ApiView.vue')
  },
  {
    path: '/faqs',
    component: () => import(/* webpackChunkName: "FaqsView" */'../views/FaqsView')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
