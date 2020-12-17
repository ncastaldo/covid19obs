<template>
  <div>
    <v-container class="py-0">
      <div class="text-center">
        <v-icon
          large
          class="mr-2"
        >
          mdi-map
        </v-icon>
        <h4 class="d-inline">
          SELECT the <i>Region</i> and then the <i>Country</i> or CLICK on a <i>Country</i> in the map
          <v-icon>
            mdi-arrow-down-thick
          </v-icon>
        </h4>
      </div>
      <LocationSelector />
    </v-container>
    <LocationMap v-if="showCharts" />
  </div>
  <!--v-card
    color="#fff"
    flat
  >
    <v-btn
      v-if="false"
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
          <v-card
            class="pa-2"
          >
            <LocationSelector />
            <LocationMap v-if="showCharts" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card-->
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

<style scoped>

.btn-fix:focus::before {
  opacity: 0 !important;
}

</style>
