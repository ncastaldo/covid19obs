<template>
  <v-card>
    <v-card-title>
      {{ descriptionConfig.title }}
    </v-card-title>
    <v-divider />
    <v-card-text class="text-left">
      {{ descriptionConfig.text }}
    </v-card-text>
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
