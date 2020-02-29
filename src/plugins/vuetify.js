import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#6a51a3',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        background: '#1E1E1E'
      }
    }
  }
})
