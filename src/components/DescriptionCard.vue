<template>
  <v-card>
    <v-card-title>
      {{ descriptionConfig.title }}
    </v-card-title>
    <v-divider class="pb-1" />
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
  }
}
</script>

<style scoped>

</style>
