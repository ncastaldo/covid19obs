import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// Vue.component('ChartTooltip', ChartTooltip)

new Vue({
  render: h => h(App)
}).$mount('#app')
