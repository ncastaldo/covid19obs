<template>
  <v-card color="#eee">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <v-card class="pa-2">
            <PeriodDisplay />
            <PeriodSelector />
          </v-card>
        </v-col>
        <v-col
          cols="12"
        >
          <v-card class="pa-2">
            <LocationListSelectors />
            <LocationListMap />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

import PeriodDisplay from '../components/control/PeriodDisplay'
import PeriodSelector from '../components/control/PeriodSelector'

import LocationListSelectors from '../components/control/LocationListSelectors'
import LocationListMap from '../components/control/LocationListMap'

export default {
  components: {
    PeriodDisplay,
    PeriodSelector,

    LocationListSelectors,
    LocationListMap
  }
}
</script>

<style scoped>

</style>
