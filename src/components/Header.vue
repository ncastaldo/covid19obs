<template>
  <v-app-bar
    app
  >
    <v-toolbar-title class="ml-2 text-left headline">
      <span class="font-weight-light">COVID19</span>
      <span class="ml-2"> Infodemics Observatory</span>
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
    }
  }
}
</script>
