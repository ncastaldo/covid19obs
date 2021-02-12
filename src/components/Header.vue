<template>
  <v-app-bar
    app
    height="60"
  >
    <v-app-bar-nav-icon
      v-if="false"
      @click="toggleDrawer"
    />
    <v-toolbar-title class="ml-1 text-left headline">
      <a
        class="pr-2"
        :style="style"
        href="/#/"
      > covid19obs </a>
      <span
        v-if="!['xs', 'sm'].includes(breakpoint)"
        class="font-weight-light pl-2"
        :style="{ 'font-size': '18px' }"
      >
        Covid19 Infodemics Observatory
      </span>
    </v-toolbar-title>
    <v-spacer />
    <v-img
      v-if="false && breakpoint !== 'xs'"
      class="mx-2"
      :src="imgSrc"
      max-height="40"
      max-width="140"
      contain
    />
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      imgSrc: require('../assets/img/FBK_WHO.svg')
    }
  },
  computed: {
    breakpoint () {
      return this.$vuetify.breakpoint.name
    },
    style () {
      return {
        'font-size': this.breakpoint === 'xs' ? '20px' : '24px',
        color: '#2877b8',
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
