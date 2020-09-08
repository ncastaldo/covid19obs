<template>
  <div class="control">
    <v-container>
      <v-row>
        <v-btn
          icon
          absolute
          top
          right
          large
          class="mr-4 mt-3"
          :color="showCharts ? 'primary': 'none'"
          @click="() => {showCharts = !showCharts}"
        >
          <v-icon>mdi-poll</v-icon>
        </v-btn>
        <v-col
          md="6"
          sm="12"
        >
          <LocationSelector />
          <LocationMap v-if="showCharts" />
        </v-col>
        <v-col
          md="6"
          sm="12"
        >
          <PeriodRangeDisplay />
          <periodRangeBrush v-if="showCharts" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import PeriodRangeDisplay from '../components/control/PeriodRangeDisplay'
import periodRangeBrush from '../components/control/PeriodRangeBrush'

import LocationSelector from '../components/control/LocationSelector'
import LocationMap from '../components/control/LocationMap'

export default {
  components: {
    PeriodRangeDisplay,
    periodRangeBrush,
    LocationSelector,
    LocationMap
  },
  data () {
    return {
      showCharts: false
    }
  }
}
</script>

<style>

.control {
  background-color: #eee;
}

</style>
