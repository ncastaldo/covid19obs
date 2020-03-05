<template>
  <v-footer
    padless
  >
    <v-card
      flat
      width="100%"
      class="text-center"
    >
      <v-card-text>
        <v-img
          v-for="logo in logos"
          :key="logo.id"
          max-height="30"
          max-width="120"
          :href="logo.link"
          :src="logo.src"
        />
      </v-card-text>

      <v-divider />

      <v-card-text class="white--text">
        Copyright?
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
const logos = [
  {
    id: 'FBK',
    src: require('../assets/img/logo-fbk_transp.svg'),
    link: 'https://fbk.eu'
  }
]

export default {
  name: 'Footer',
  data () {
    return {
      logos
    }
  }
}
</script>
