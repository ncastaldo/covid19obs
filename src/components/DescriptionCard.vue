<template>
  <v-card>
    <v-card-title>
      {{ descriptionConfig.title }}
    </v-card-title>
    <v-divider class="pb-1" />
    <v-card
      flat
      class="text-left pb-1"
    >
      <v-card-title class="subtitle-1 py-2">
        Download the Report
      </v-card-title>
      <v-card-actions
        class="pb-2 ma-2"
      >
        <a
          href="/assets/files/report.pdf"
          download
        >
          <v-img
            width="200"
            class="report"
            :src="srcImg"
          />
        </a>
      </v-card-actions>
    </v-card>
    <v-card
      v-for="(p,i) in descriptionConfig.paragraphs"
      :key="i"
      flat
      class="text-left pb-1"
    >
      <v-card-title class="subtitle-1 py-2">
        {{ p.title }}
      </v-card-title>
      <v-card-text
        class="pb-2"
        v-html="p.html"
      />
    </v-card>
  </v-card>
</template>

<script>
import descriptionConfig from '../assets/description.json'

export default {
  data () {
    return {
      descriptionConfig
    }
  },
  computed: {
    srcImg () {
      return require('../assets/img/report.png')
    }
  }
}
</script>

<style scoped>

.report:hover {
  opacity: 0.8;
  outline: solid 2px #666;
  outline-offset: 2px;
  box-sizing: border-box;
}

</style>
