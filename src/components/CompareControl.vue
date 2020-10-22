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
                v-for="c in regions"
                :key="c.regionId"
                class="pa-2"
              >
                <LocationListSelector
                  :name="c.regionName"
                  :color="c.regionColor"
                  :value="regionValues[c.regionId]"
                  :locations="c.locations"
                  @input="value => change(c.regionId, value)"
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
            <PeriodBars />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

import PeriodDisplay from '../components/control/PeriodDisplay'
import PeriodBars from '../components/control/PeriodBars'

import LocationListSelector from '../components/control/LocationListSelector'
import LocationListMap from '../components/control/LocationListMap'

import LocationPresets from '../components/control/LocationPresets'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PeriodDisplay,
    PeriodBars,

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
      allRegions: 'location/getRegions',
      locationList: 'location/getLocationList'
    }),
    regions () {
      return this.allRegions
        .filter(c => c.regionId !== '_WORLD_CONTINENT')
    },
    regionValues () {
      const base = Object.assign({}, ...this.regions.map(c => ({ [c.regionId]: [] })))
      return this.locationList
        .reduce((acc, l) => ({
          ...acc,
          [l.regionId]: [...acc[l.regionId], l.locationId]
        }), base)
    }
  },
  methods: {
    ...mapActions({
      setLocationIdList: 'location/setLocationIdList'
    }),
    change (regionId, value) {
      const regionIdList = Object.entries(this.regionValues)
        .filter(([id]) => id !== regionId)
        .map(([_, locationIdList]) => locationIdList)
        .flat()
      this.setLocationIdList([...regionIdList, ...value])
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
