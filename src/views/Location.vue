<template>
  <v-container
    fluid
    class="pt-0"
  >
    <div
      v-sticky
      sticky-z-index="4"
      sticky-offset="stickyOffset"
      style="background: rgba(13, 18, 15, 0.8)"
      class="pb-1"
    >
      <v-row class="px-2 pb-1">
        <v-col class="col-12 col-sm-4 col-md-3 py-1">
          <LocationDictSelect />
        </v-col>
        <v-col class="col-12 col-sm-8 col-md-9 py-1">
          <DateSlider />
        </v-col>
      </v-row>
      <LocationDetails />
    </div>
    <v-row>
      <v-col class="col-12 col-md-8">
        <LocationLegendChart :height="45" />
        <LocationMapChart
          :height="height - 45"
        />
      </v-col>
      <v-col class="col-12 col-md-4">
        <LocationBarChart
          :height="height"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sticky from 'vue-sticky-directive'
// bg = #0D120F -> 13, 18, 15

import DateSlider from '../components/DateSlider'
import LocationDictSelect from '../components/LocationDictSelect'
import LocationDetails from '../components/LocationDetails'
import LocationLegendChart from '../components/LocationLegendChart'
import LocationMapChart from '../components/LocationMapChart'
import LocationBarChart from '../components/LocationBarChart'

export default {
  directives: { Sticky },
  components: {
    DateSlider,
    LocationDictSelect,
    LocationDetails,
    LocationLegendChart,
    LocationMapChart,
    LocationBarChart
  },
  data () {
    return {
      stickyOffset: { top: 60 },
      height: 400
    }
  }
}
</script>

<style scoped>
.controls {
  background: rgba(0, 0, 0, 0.7);
}
</style>
