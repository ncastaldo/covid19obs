<template>
  <div>
    <v-container class="pt-3">
      <div class="text-center">
        <v-icon
          large
          class="mr-2"
        >
          mdi-map
        </v-icon>
        <h4 class="d-inline">
          SELECT the <i>Region</i> and then the <i>Country</i> or CLICK on a country in the <i>Map</i>
          <v-icon>
            mdi-arrow-down-thick
          </v-icon>
        </h4>
      </div>
      <LocationSelector />
    </v-container>
    <LocationMap v-if="showCharts" />
  </div>
</template>

<script>
import LocationSelector from '../components/control/LocationSelector'

export default {
  components: {
    LocationSelector,
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
