<template>
  <v-app
    id="app"
  >
    <Header />
    <Content v-if="storeReady" />
    <Footer v-if="storeReady" />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Content,
    Footer
  },
  computed: {
    ...mapGetters({
      storeReady: 'isReady'
    })
  }
}
</script>

<style>
.axis {
  font-size: 14px
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
