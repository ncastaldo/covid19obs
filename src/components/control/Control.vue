<template>
  <div>
    <LocationDisplay />
    <PeriodSelector />
    <LocationSelector />
    <!--v-dialog
      v-model="mapDialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn>
          <v-icon
            large
            v-bind="attrs"
            v-on="on"
          >
            mdi-map
          </v-icon>
        </v-btn>
      </template>

      <Location :height="500" />
    </v-dialog-->
  </div>
</template>

<script>
import LocationDisplay from './LocationDisplay'
import LocationSelector from './LocationSelector'

import PeriodSelector from './PeriodSelector'

import { mapGetters } from 'vuex'

export default {
  components: {
    LocationDisplay,
    LocationSelector,

    PeriodSelector
  },
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  },
  data () {
    return {
      mapDialog: false
    }
  }
}
</script>

<style>

</style>
