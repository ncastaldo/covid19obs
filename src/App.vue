<template>
  <v-app
    id="app"
  >
    <Drawer
      v-if="true"
    />
    <Header />

    <v-content>
      <router-view
        v-if="
          storeReady"
      />
    </v-content>
    <Footer v-if="storeReady" />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import Drawer from './components/Drawer'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Drawer,
    Header,
    Footer
  },
  data () {
    return {
      drawer: true
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
}

.tick {
  font-size: 14px
}

.v-tooltip__content {
  background: rgba(97, 97, 97, 1) !important;
  opacity: 1 !important
}

.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}

</style>
