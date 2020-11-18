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
          md="12"
          cols="12"
        >
          <v-card class="pa-2">
            <LocationSelector />
            <LocationMap v-if="showCharts" />
          </v-card>
        </v-col>
        <v-col
          md="12"
          cols="12"
        >
          <v-card class="pa-2">
            <PeriodSelector />
            <DateRangeBrush v-if="showCharts" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

import PeriodSelector from '../components/control/PeriodSelector'
import LocationSelector from '../components/control/LocationSelector'

export default {
  components: {
    PeriodSelector,
    LocationSelector,
    DateRangeBrush: () => import(/* webpackChunkName: "DateRangeBrush" */'../components/control/DateRangeBrush'),
    LocationMap: () => import(/* webpackChunkName: "LocationMap" */'../components/control/LocationMap')
  },
  data () {
    return {
      showCharts: null
    }
  },
  created () {
    this.showCharts = true
  }
}
</script>

<style scoped>

.btn-fix:focus::before {
  opacity: 0 !important;
}

</style>
