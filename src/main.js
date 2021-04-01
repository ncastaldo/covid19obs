import Vue from 'vue'
import App from './App.vue'

import store from './store/index'

import vuetify from './plugins/vuetify'

import Article from './components/base/Article'
import PolicyText from './components/base/PolicyText'

import ChartsContainer from './components/base/ChartsContainer'
import Gradient from './components/base/Gradient'
import Tooltip from './components/base/Tooltip'
import Legend from './components/base/Legend'

import Flag from './components/base/Flag'
import IndexCircles from './components/base/IndexCircles'

import NavLinks from './components/NavLinks'

import Background from './components/Background'

import VueMobileDetection from 'vue-mobile-detection'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueMobileDetection)

Vue.component('Article', Article)
Vue.component('PolicyText', PolicyText)

Vue.component('ChartsContainer', ChartsContainer)
Vue.component('Gradient', Gradient)
Vue.component('Tooltip', Tooltip)
Vue.component('Legend', Legend)

Vue.component('NavLinks', NavLinks)

Vue.component('Flag', Flag)
Vue.component('IndexCircles', IndexCircles)

Vue.component('Background', Background)

new Vue({
  store,
  vuetify,
  router,
  created () {
    this.$store.dispatch('init')
  },
  render: h => h(App)
}).$mount('#app')
