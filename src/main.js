import Vue from 'vue'
import App from './App.vue'

import store from './store_2/index'

import vuetify from './plugins/vuetify'

import ChartsContainer from './components/base/ChartsContainer'
import ChartTooltip from './components/base/ChartTooltip'

import VueMobileDetection from 'vue-mobile-detection'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueMobileDetection)

Vue.component('ChartsContainer', ChartsContainer)
Vue.component('ChartTooltip', ChartTooltip)

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
