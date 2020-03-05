<template>
  <v-card>
    <v-card-title>
      {{ dataSourcesConfig.title }}
    </v-card-title>
    <v-divider />
    <v-card
      v-for="(p,i) in dataSourcesConfig.paragraphs"
      :key="i"
      flat
      class="text-left pb-0"
    >
      <v-card-title class="subtitle-1 py-2">
        {{ p.title }}
      </v-card-title>
      <v-card-text
        class="pb-1"
        v-html="p.html"
      />
    </v-card>
  </v-card>
</template>

<script>
import dataSourcesConfig from '../assets/dataSources.json'

export default {
  data () {
    return {
      dataSourcesConfig
    }
  }
}
</script>

<style scoped>

</style>
