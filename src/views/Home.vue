<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
      >
        <PeriodRangeDisplay />
        <PeriodRangeSelector />
        <LocationDisplay />
        <LocationSelector />
      </v-col>
      <v-col
        cols="6"
        class="pb-3"
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
import LocationSelector from '../components/control/LocationSelector'

import Timeseries from '../components/Timeseries'

export default {
  components: {
    PeriodRangeDisplay,
    PeriodRangeSelector,
    LocationDisplay,
    LocationSelector,

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
