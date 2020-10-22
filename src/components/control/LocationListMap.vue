<template>
  <Map
    id="location-set-selector-map"
    :styleMapping="styleMapping"
    :onClick="onClick"
    :height="400"
  />
</template>

<script>
import Map from '../graphics/Map'

import { mapGetters, mapMutations } from 'vuex'

const BASE_STYLE = {
  fillColor: '#999'
}

export default {
  components: {
    Map
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
          fillOpacity: 1,
          color: '#ddd',
          weight: 0.5,
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
