<template>
  <v-container>
    <v-row>
      <v-col
        md="6"
        sm="12"
      >
        <PeriodRangeDisplay />
        <PeriodRangeSelector />
        <LocationDisplay />
        <LocationMap />
      </v-col>
      <v-col
        md="6"
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
  }
}
</script>

<style>

.display__icon {
  width: 45px;
  text-align: center;
}

</style>
