<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
        class="pb-3"
      >
        <PeriodDisplay />
        <PeriodSelector />
        <LocationListMap />
      </v-col>
      <v-col
        cols="6"
        class="pb-3"
      >
        <Compare />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PeriodSelector from '../components/control/PeriodSelector'
import PeriodDisplay from '../components/control/PeriodDisplay'

import LocationListMap from '../components/control/LocationListMap'

import Compare from '../components/Compare'

export default {
  components: {
    PeriodSelector,
    PeriodDisplay,
    LocationListMap,
    Compare
  }
}
</script>
