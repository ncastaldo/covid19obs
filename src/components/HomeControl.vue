<template>
  <v-card color="#eee">
    <v-btn
      absolute
      fab
      right
      bottom

      class="btn-fix mr-4"
      :color="showCharts ? 'primary': 'none'"
      @click="() => {showCharts = !showCharts}"
    >
      <v-icon
        dark
        medium
      >
        mdi-poll
      </v-icon>
    </v-btn>
    <v-container>
      <v-row>
        <v-col
          md="6"
          cols="12"
        >
          <v-card class="pa-2">
            <LocationSelector />
            <LocationMap v-if="showCharts" />
          </v-card>
        </v-col>
        <v-col
          md="6"
          cols="12"
        >
          <v-card class="pa-2">
            <PeriodRangeSelector />
            <PeriodRangeBrush v-if="showCharts" />
          </v-card>
        </v-col>
        <v-col v-if="showCharts">
          <v-card class="pa-2">
            <LayerSelector />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

import PeriodRangeSelector from '../components/control/PeriodRangeSelector'
import PeriodRangeBrush from '../components/control/PeriodRangeBrush'

import LocationSelector from '../components/control/LocationSelector'
import LocationMap from '../components/control/LocationMap'

import LayerSelector from '../components/control/LayerSelector'

export default {
  components: {
    PeriodRangeSelector,
    PeriodRangeBrush,
    LocationSelector,
    LocationMap,
    LayerSelector
  },
  data () {
    return {
      showCharts: false
    }
  }
}
</script>

<style scoped>

.btn-fix:focus::before {
  opacity: 0 !important;
}

</style>
