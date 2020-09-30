import Vue from 'vue'
import App from './App.vue'

import store from './store_2/index'

import vuetify from './plugins/vuetify'

import Article from './components/base/Article'

import ChartsContainer from './components/base/ChartsContainer'
import Tooltip from './components/base/Tooltip'
import Legend from './components/base/Legend'

import Background from './components/Background'

import VueMobileDetection from 'vue-mobile-detection'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueMobileDetection)

Vue.component('Article', Article)

Vue.component('ChartsContainer', ChartsContainer)
Vue.component('Tooltip', Tooltip)
Vue.component('Legend', Legend)

Vue.component('Background', Background)

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
