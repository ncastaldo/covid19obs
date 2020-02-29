<template>
  <v-card
    class="ma-4 ml-2"
  >
    <v-card-title>
      {{ location ? location.locationName : '- - -' }}
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LocationLabel',
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  }
}
</script>

<style>

</style>
