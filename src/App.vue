<template>
  <v-app
    id="app"
  >
    <Header />
    <Content v-if="storeReady" />
    <!--TimeChart /-->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from './components/Header'
import Content from './components/Content'

export default {
  name: 'App',
  components: {
    Header,
    Content
    // TimeChart
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
