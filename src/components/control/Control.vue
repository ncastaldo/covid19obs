<template>
  <div>
    <PeriodRangeDisplay />
    <PeriodRangeSelector />
    <LocationDisplay />
    <LocationSelector />
    <!--v-dialog
      v-model="mapDialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn>
          <v-icon
            large
            v-bind="attrs"
            v-on="on"
          >
            mdi-map
          </v-icon>
        </v-btn>
      </template>

      <Location :height="500" />
    </v-dialog-->
  </div>
</template>

<script>
import PeriodRangeDisplay from './PeriodRangeDisplay'
import PeriodRangeSelector from './PeriodRangeSelector'

import LocationDisplay from './LocationDisplay'
import LocationSelector from './LocationSelector'

import { mapGetters } from 'vuex'

export default {
  components: {
    PeriodRangeDisplay,
    PeriodRangeSelector,

    LocationDisplay,
    LocationSelector
  },
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  },
  data () {
    return {
      mapDialog: false
    }
  }
}
</script>

<style>

.display__icon {
  width: 45px;
  text-align: center;
}

</style>
