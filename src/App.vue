<template>
  <v-app
    id="app"
  >
    <Drawer v-if="false" />
    <Header />
    <v-main>
      <router-view v-if="storeReady" />
      <v-container
        v-else
        fill-height
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col class="text-center">
            <v-progress-circular
              indeterminate
              size="60"
              width="6"
              color="rgb(31, 121, 179)"
            />
            <h4 class="pt-5">
              Loading Data...
            </h4>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        v-show="false"
        v-scroll="onScroll"
        fab
        dark
        absolute
        right
        bottom
        color="rgba(31, 121, 179)"
        @click="toTop"
      >
        <v-icon medium>
          mdi-arrow-up-bold
        </v-icon>
      </v-btn>
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
  data () {
    return {
      fab: false
    }
  },
  computed: {
    ...mapGetters({
      storeReady: 'isReady'
    })
  },
  watch: {
    storeReady () {
      // console.log(this.storeReady, 'change')
    }
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      this.fab = (window.pageYOffset || e.target.scrollTop || 0) > 200
    },
    toTop () {
      if (typeof window === 'undefined') return
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
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

.v-tab {
  box-shadow:0px 0px 2px 0px inset;
}

.v-tab--active {
  box-shadow:0px 0px 0px 2px inset;
}

.thin-font {
  font-weight: 300;
}

</style>
