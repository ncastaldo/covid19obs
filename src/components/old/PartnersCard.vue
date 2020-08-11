<template>
  <v-card
    flat
    class="text-left pa-2 pb-3"
  >
    <div class="pa-2">
      <v-img
        :src="fbkWhoImg"
        contain
        max-height="100"
      />
    </div>

    <div class="text-center headline">
      <a
        href="https://magazine.fbk.eu/en/news/fbk-partners-with-who-on-new-initiative-to-monitor-covid-19-infodemics-from-around-the-world/"
        target="_blank"
      >
        FBK-WHO Partnership
      </a>
    </div>
  </v-card>
</template>
<script>

export default {
  name: 'Header',
  data () {
    return {
      fbkWhoImg: require('../assets/img/FBK_WHO.svg')
    }
  }
}

</script>
