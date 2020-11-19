<template>
  <v-app
    id="app"
  >
    <Drawer v-if="false" />
    <Header />
    <v-main>
      <router-view
        v-if="storeReady"
      />
    </v-main>
    <Footer />
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
}

.text-center {
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

.thin-font {
  font-weight: 300;
}

</style>
