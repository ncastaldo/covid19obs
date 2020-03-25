<template>
  <v-card
    tile
  >
    <v-card-title class="py-2 justify-center">
      <span class="font-weight-light pr-2">Current location:</span>
      <span>{{ location.locationName }}</span>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  }
}
</script>

<style>

</style>
