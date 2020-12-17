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
      locations: 'location/getLocations',
      locationList: 'location/getLocationList'
    }),
    styleMapping () {
      return this.locations.reduce((acc, { locationId, regionColor }) => ({
        ...acc,
        [locationId]: {
          lineColor: '#ddd',
          lineWidth: 0.5,
          ...(this.locationList.map(l => l.locationId).includes(locationId)
            ? { fillColor: regionColor } : BASE_STYLE)
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
