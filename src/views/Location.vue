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
      <DateSlider />
      <LocationDictSelect />
      <LocationLegendChart class="mt-3" />
    </div>
    <v-row>
      <v-col class="col-12 col-md-8">
        <LocationMapChart
          :height="height"
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
import LocationMapChart from '../components/LocationMapChart'
import LocationDictSelect from '../components/LocationDictSelect'
import LocationLegendChart from '../components/LocationLegendChart'
import LocationBarChart from '../components/LocationBarChart'

export default {
  directives: { Sticky },
  components: {
    DateSlider,
    LocationDictSelect,
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
