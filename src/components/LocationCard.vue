<template>
  <v-card
    tile
  >
    <v-card-title class="py-2 justify-center font-weight-light">
      {{ location.locationName }}
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
