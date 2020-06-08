import Vue from 'vue'
import VueRouter from 'vue-router'

import Common from '../views/Common'

import Observatory from '../views/Observatory'
import Location from '../views/Location'
import Project from '../views/Project'
import Contacts from '../views/Contacts'

Vue.use(VueRouter)

const commonRoutes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Observatory',
    component: Common
  }
]

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Observatory',
    component: Observatory
  },
  {
    path: '/rankings',
    name: 'Location',
    component: Location
  },
  {
    path: '/project',
    name: 'Project',
    component: Project
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  }
]

const router = new VueRouter({
  routes: commonRoutes
})

export default router
