<template>
  <v-app
    id="app"
    :style="{'background-color': backgroundColor}"
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
  data () {
    return {
      backgroundColor: this.$vuetify.theme.themes.dark.background
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;/*
  margin-top: 60px;*/
}

</style>
