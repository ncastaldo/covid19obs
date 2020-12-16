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
          Select the countries you want to compare
          <v-icon>
            mdi-arrow-down-thick
          </v-icon>
        </h4>
      </div>
      <div class="d-flex flex-wrap justify-center align-center py-2">
        <div
          v-for="region in regions"
          :key="region.regionId"
          class="px-2 py-1"
        >
          <LocationListSelector
            :name="region.regionName"
            :color="region.regionColor"
            :value="regionValues[region.regionId]"
            :locations="getRegionLocations(region.regionId)"
            @input="value => change(region.regionId, value)"
          />
        </div>
      </div>
      <div
        class="pb-3 pt-0 d-flex align-center justify-center"
      >
        <v-divider class="mr-4" />
        <LocationPresets />
        <v-btn
          class="ml-4"

          @click="setLocationIdList([])"
        >
          <b style="color: #D62728">Reset!</b>
        </v-btn>
        <v-divider class="ml-4" />
      </div>
    </v-container>
    <LocationListMap />
  </div>
</template>

<script>

import LocationListSelector from '../components/control/LocationListSelector'
import LocationListMap from '../components/control/LocationListMap'

import LocationPresets from '../components/control/LocationPresets'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {

    LocationListSelector,
    LocationListMap,

    LocationPresets
  },
  data () {
    return {
      showMap: null
    }
  },
  computed: {
    ...mapGetters({
      allRegions: 'location/getRegions',
      locationList: 'location/getLocationList',
      getRegionLocations: 'location/getRegionLocations'
    }),
    regions () {
      return this.allRegions
        .filter(r => r.regionId !== '_WORLD_REGION')
        .sort((a, b) => a.regionId.startsWith('_')
          ? 1 : b.regionId.startsWith('_') ? -1
            : a.regionId.localeCompare(b.regionId))
    },
    regionValues () {
      // to compute the selected locations for each region
      const base = Object.assign({}, ...this.regions.map(c => ({ [c.regionId]: [] })))
      return this.locationList
        .reduce((acc, l) => ({
          ...acc,
          [l.regionId]: [...acc[l.regionId], l.locationId]
        }), base)
    }
  },
  created () {
    this.showMap = true
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
