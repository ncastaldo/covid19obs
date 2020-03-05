<template>
  <v-card class="pa-1">
    <v-card-actions class="py-1">
      <v-row class="px-2">
        <v-card
          v-for="t in toolbarConfig"
          :key="t.id"
          class="my-1 pa-2 mx-2"
          flat
          outlined
        >
          <span>
            {{ t.name }}:
          </span>
          <span class="font-weight-bold">
            {{ t.value }}
          </span>
        </v-card>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import toolbarConfig from '../assets/toolbar.json'

export default {
  data () {
    return {
      toolbarConfig
    }
  }
}
</script>

<style>

</style>
