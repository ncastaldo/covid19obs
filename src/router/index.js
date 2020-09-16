import Vue from 'vue'
import VueRouter from 'vue-router'

// import Observatory from '../views/Observatory'
// import Location from '../views/Location'
// import Project from '../views/Project'
// import Contacts from '../views/Contacts'

import HomeView from '../views/HomeView'
import CompareView from '../views/CompareView'
import DetailsView from '../views/DetailsView'

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
    component: CompareView
  },
  {
    path: '/details',
    name: 'DetailsView',
    component: DetailsView
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
  routes
})

export default router
