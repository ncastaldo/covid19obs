<template>
  <v-container>
    <v-row>
      <v-col
        md="6"
        sm="12"
      >
        <PeriodDisplay />
        <PeriodBrush />
        <LocationListMap />
      </v-col>
      <v-col
        md="6"
        sm="12"
      >
        <Compare />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PeriodBrush from '../components/control/PeriodBrush'
import PeriodDisplay from '../components/control/PeriodDisplay'

import LocationListMap from '../components/control/LocationListMap'

import Compare from '../components/Compare'

export default {
  components: {
    PeriodBrush,
    PeriodDisplay,
    LocationListMap,
    Compare
  }
}
</script>
