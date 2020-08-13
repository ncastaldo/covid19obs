<template>
  <Map
    id="location-set-selector-map"
    :styleMapping="styleMapping"
    :onClick="onClick"
  />
</template>

<script>

import Map from '../graphics/Map'
import { mapGetters, mapActions, mapMutations } from 'vuex'

const BASE_STYLE = {
  fillColor: '#999'
}

const SELECTED_STYLE = {
  fillColor: '#2877b8'
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
      return this.locations.reduce((acc, { locationId }) => ({
        ...acc,
        [locationId]: this.locationList.map(l => l.locationId).includes(locationId)
          ? SELECTED_STYLE : BASE_STYLE
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
