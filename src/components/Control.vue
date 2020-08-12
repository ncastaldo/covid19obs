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
import PeriodRangeDisplay from './control/PeriodRangeDisplay'
import PeriodRangeSelector from './control/PeriodRangeSelector'

import LocationDisplay from './control/LocationDisplay'
import LocationSelector from './control/LocationSelector'

import { mapGetters } from 'vuex'

export default {
  components: {
    PeriodRangeDisplay,
    PeriodRangeSelector,

    LocationDisplay,
    LocationSelector
  },
  data () {
    return {
      mapDialog: false
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  }
}
</script>

<style>

.display__icon {
  width: 45px;
  text-align: center;
}

</style>
