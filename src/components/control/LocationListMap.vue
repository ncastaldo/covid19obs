<template>
  <MapBox
    id="location-set-selector-map"
    :styleMapping="styleMapping"
    invalidFillColor="#bbb"
    lineColor="#ddd"
    :onClick="onClick"
    :height="450"
  />
</template>

<script>
import MapBox from '../graphics/MapBox'

import { mapGetters, mapMutations } from 'vuex'

const BASE_STYLE = {
  fillColor: '#999'
}

export default {
  components: {
    MapBox
  },
  computed: {
    ...mapGetters({
      allLocations: 'location/getAllLocations',
      locationList: 'location/getLocationList'
    }),
    locationIdSet () {
      return new Set(this.locationList.map(l => l.locationId))
    },
    styleMapping () {
      console.log(this.allLocations, this.locationIdSet)
      return this.allLocations.reduce((acc, { locationId, regionColor }) => ({
        ...acc,
        [locationId]: {
          lineColor: '#ddd',
          lineWidth: 0.5,
          fillColor: this.locationIdSet.has(locationId)
            ? regionColor
            : BASE_STYLE.fillColor
        }
      }), {})
    }
  },
  methods: {
    ...mapMutations({
      setLocationIdList: 'location/setLocationIdList'
    }),
    onClick (locationId) {
      if (locationId === '_WORLD') return
      const locationIdList = this.locationList.map(l => l.locationId).includes(locationId)
        ? this.locationList.map(l => l.locationId).filter(id => id !== locationId)
        : this.locationList.map(l => l.locationId).concat([locationId])
      this.setLocationIdList(locationIdList)
    }
  }
}
</script>
