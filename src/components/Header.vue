<template>
  <v-app-bar
    app
    height="60"
  >
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-toolbar-title
      class="ml-1 text-left headline"
    >
      <a
        class="pr-2"
        :style="style"
        href="/#/"
      >
        covid19obs
      </a>
      <span
        v-if="!['xs', 'sm'].includes(breakpoint)"
        class="font-weight-light pl-2 "
        :style="{ 'font-size': '18px'}"
      >
        Covid19 Infodemics Observatory
      </span>
    </v-toolbar-title>
    <v-spacer />
    <a
      v-if="breakpoint !== 'xs'"
      href="https://comunelab.fbk.eu"
      target="_blank"
    >
      <v-img
        class="mx-2"
        :src="imgSrc"
        max-height="40"
        max-width="140"
        contain
      />
    </a>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      images: {
        logo: require('../assets/img/comune_lab_logo.svg'),
        full: require('../assets/img/CoMuNe_lab_Bianco_long.png')
      }
    }
  },
  computed: {
    breakpoint () {
      return this.$vuetify.breakpoint.name
    },
    imgSrc () {
      switch (this.breakpoint) {
        case 'xs': return this.images.logo
        case 'sm': return this.images.logo
        default: return this.images.full
      }
    },
    style () {
      return {
        'font-size': this.breakpoint === 'xs' ? '20px' : '24px',
        color: '#fff',
        'text-decoration': 'none'
      }
    }
  },
  methods: {
    ...mapActions({
      toggleDrawer: 'view/toggleDrawer'
    })
  }
}
</script>
