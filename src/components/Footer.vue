<template>
  <v-footer
    padless
    class="text-center"
  >
    <v-container class="py-0">
      <v-row
        align="center"
        justify="center"
        class="py-2"
      >
        <v-img
          v-for="logo in logos"
          :key="logo.id"
          contain
          max-height="50"
          max-width="50"
          class="mx-2 my-1"
          :href="logo.link"
          :src="logo.src"
        />
      </v-row>

      <v-divider />
      <div class="caption py-3">
        <div class="pb-2">
          Copyright @ 2020-2021 - All right reserved, <a
            href="https://comunelab.fbk.eu"
            target="_blank"
          >CoMuNe Lab</a>, FBK
        </div>
        <div class="pb-2">
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          ><img
            alt="Creative Commons License"
            style="border-width:0"
            src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
          ></a><br>Data and derived products are licensed under a <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >Creative Commons Attribution-ShareAlike 4.0 International License</a>.
        </div>
        <div>
          Designed by <a
            href="https://ncastaldo.it"
            target="_blank"
          >Nicola Castaldo</a> with Vue.js, Vuetify, D3, <a
            href="https://github.com/ncastaldo/d3nic"
            target="_blank"
          >d3nic</a> and Mapbox
        </div>
      </div>
    </v-container>
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
  }

  /* {
    id: 'WHO',
    src: require('../assets/img/who.svg'),
    link: 'https://www.who.int/'
  } */
  /* {
    id: 'HARVARD',
    src: require('../assets/img/harvard.svg'),
    link: 'https://www.harvard.edu/'
  },
  {
    id: 'IULM',
    src: require('../assets/img/iulm.png'),
    link: 'https://www.iulm.it/'
  } */
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
