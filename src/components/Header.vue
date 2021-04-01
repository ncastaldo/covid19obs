<template>
  <v-app-bar>
    <v-toolbar-title class="ml-1 text-left headline">
      <a
        class="pr-2"
        :style="style"
        href="/#/"
      > covid19obs </a>
      <span
        v-if="!smallScreen"
        class="font-weight-light pl-2"
        :style="{ 'font-size': '18px' }"
      >
        Covid19 Infodemics Observatory
      </span>
    </v-toolbar-title>
    <v-spacer />
    <v-app-bar-nav-icon
      v-if="smallScreen"
      class="mr-1"
      @click="toggleDrawer"
    />
    <template
      v-if="!smallScreen"
      #extension
    >
      <NavLinks />
    </template>
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
    smallScreen () {
      return ['xs', 'sm'].includes(this.breakpoint)
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
