import Vue from 'vue'
import App from './App.vue'

import store from './store/index'

import vuetify from './plugins/vuetify'

import ChartTooltip from './components/base/ChartTooltip'

Vue.config.productionTip = false

Vue.component('ChartTooltip', ChartTooltip)

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
