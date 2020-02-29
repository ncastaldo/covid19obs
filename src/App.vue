<template>
  <v-app
    id="app"
    :style="{'background-color': backgroundColor}"
  >
    <!--Header /-->
    <Content v-if="storeReady" />
    <!--TimeChart /-->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import config from './config'
import Content from './components/Content'

export default {
  name: 'App',
  components: {
    // Header,
    Content
    // TimeChart
  },
  data () {
    return {
      backgroundColor: config.colors.secondary
    }
  },
  computed: {
    ...mapGetters({
      storeReady: 'isReady'
    })
  }
}
</script>

<style>
body {
    overflow: hidden;
    height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;/*
  margin-top: 60px;*/
}

</style>
