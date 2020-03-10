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
        <v-row
          align="center"
          justify="center"
        >
          <v-img
            v-for="logo in logos"
            :key="logo.id"
            contain
            max-height="50"
            max-width="120"
            class="mx-2 my-1"
            :href="logo.link"
            :src="logo.src"
          />
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text>
        <p class="mb-1">
          Copyright @ 2020 - All right reserved, <a
            href="https://comunelab.fbk.eu"
            target="_blank"
          >CoMuNe Lab</a>, FBK
        </p>
        <p class="mb-1">
          Designed by <a
            href="https://github.com/ncastaldo"
            target="_blank"
          >Nicola Castaldo</a> with Vue.js, Vuetify, D3 and d3nic
        </p>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
const logos = [
  {
    id: 'FBK',
    src: require('../assets/img/fbk.svg'),
    link: 'https://fbk.eu'
  },
  {
    id: 'COMUNE_LAB',
    src: require('../assets/img/comune_lab_logo.svg'),
    link: 'https://comunelab.fbk.eu'
  },
  {
    id: 'HARVARD',
    src: require('../assets/img/harvard.svg'),
    link: 'https://www.harvard.edu/'
  },
  {
    id: 'IULM',
    src: require('../assets/img/iulm.png'),
    link: 'https://www.iulm.it/'
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
