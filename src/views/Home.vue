<template>
  <v-container class="pt-0">
    <v-row class="control">
      <v-btn
        icon
        absolute
        top
        right
        large
        class="mr-4"
        :color="showCharts ? 'primary': 'none'"
        @click="() => {showCharts = !showCharts}"
      >
        <v-icon>mdi-poll</v-icon>
      </v-btn>
      <v-col
        md="6"
        sm="12"
      >
        <LocationDisplay />
        <LocationMap v-if="showCharts" />
      </v-col>
      <v-col
        md="6"
        sm="12"
      >
        <PeriodRangeDisplay />
        <PeriodRangeSelector v-if="showCharts" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        md="12"
        sm="12"
      >
        <Timeseries />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PeriodRangeDisplay from '../components/control/PeriodRangeDisplay'
import PeriodRangeSelector from '../components/control/PeriodRangeSelector'

import LocationDisplay from '../components/control/LocationDisplay'
import LocationMap from '../components/control/LocationMap'

import Timeseries from '../components/Timeseries'

export default {
  components: {
    PeriodRangeDisplay,
    PeriodRangeSelector,
    LocationDisplay,
    LocationMap,

    Timeseries
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

.display__icon {
  width: 45px;
  text-align: center;
}

</style>
