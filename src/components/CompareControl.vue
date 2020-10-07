<template>
  <v-card color="#eee">
    <v-btn
      absolute
      fab
      right
      medium
      bottom
      class="btn-fix mr-4"
      :color="showMap ? 'primary': 'none'"
      @click="() => {showMap = !showMap}"
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
          cols="12"
        >
          <v-card class="pa-2">
            <div
              class="pa-2 d-flex align-center justify-center"
            >
              <v-divider class="mr-4" />
              <div class="display__icon mr-2">
                <v-icon large>
                  mdi-map
                </v-icon>
              </div>
              <LocationPresets />
              <v-divider class="ml-4" />
            </div>
            <div class="d-flex flex-wrap justify-center align-center ">
              <div
                v-for="c in continents"
                :key="c.continentId"
                class="pa-2"
              >
                <LocationListSelector
                  :name="c.continentName"
                  :color="c.continentColor"
                  :value="continentValues[c.continentId]"
                  :locations="c.locations"
                  @input="value => change(c.continentId, value)"
                />
              </div>
            </div>
            <div
              v-if="showMap"
              class="mt-2"
            >
              <LocationListMap />
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
        >
          <v-card class="pa-2">
            <PeriodDisplay />
            <PeriodSelector />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

import PeriodDisplay from '../components/control/PeriodDisplay'
import PeriodSelector from '../components/control/PeriodSelector'

import LocationListSelector from '../components/control/LocationListSelector'
import LocationListMap from '../components/control/LocationListMap'

import LocationPresets from '../components/control/LocationPresets'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PeriodDisplay,
    PeriodSelector,

    LocationListSelector,
    LocationListMap,

    LocationPresets
  },
  data () {
    return {
      showMap: false
    }
  },
  computed: {
    ...mapGetters({
      allContinents: 'location/getContinents',
      locationList: 'location/getLocationList'
    }),
    continents () {
      return this.allContinents
        .filter(c => c.continentId !== '_WORLD_CONTINENT')
    },
    continentValues () {
      const base = Object.assign({}, ...this.continents.map(c => ({ [c.continentId]: [] })))
      return this.locationList
        .reduce((acc, l) => ({
          ...acc,
          [l.continentId]: [...acc[l.continentId], l.locationId]
        }), base)
    }
  },
  methods: {
    ...mapActions({
      setLocationIdList: 'location/setLocationIdList'
    }),
    change (continentId, value) {
      const continentIdList = Object.entries(this.continentValues)
        .filter(([id]) => id !== continentId)
        .map(([_, locationIdList]) => locationIdList)
        .flat()
      this.setLocationIdList([...continentIdList, ...value])
      // setLocationIdList
    }
  }
}
</script>

<style scoped>

.btn-fix:focus::before {
  opacity: 0 !important;
}

</style>
