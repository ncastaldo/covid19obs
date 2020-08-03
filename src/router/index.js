import Vue from 'vue'
import VueRouter from 'vue-router'

// import Observatory from '../views/Observatory'
import Location from '../views/Location'
import Project from '../views/Project'
import Contacts from '../views/Contacts'

import Timeseries from '../views/Timeseries'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Timeseries',
    component: Timeseries
    // name: 'Observatory',
    // component: Observatory
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
  routes
})

export default router
