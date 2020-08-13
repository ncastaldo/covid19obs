<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
        class="pb-3"
      >
        <LocationListSelector />
        <LocationListMap />
        <CompareVarSelector />
        <PeriodSelector />
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
import LocationListSelector from '../components/control/LocationListSelector'
import LocationListMap from '../components/control/LocationListMap'

import CompareVarSelector from '../components/control/CompareVarSelector'
import PeriodSelector from '../components/control/PeriodSelector'

import Compare from '../components/Compare'

export default {
  components: {
    LocationListSelector,
    LocationListMap,
    CompareVarSelector,
    PeriodSelector,
    Compare
  }
}
</script>
