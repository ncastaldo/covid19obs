<template>
  <Map
    id="location-selector-map"
    :styleMapping="styleMapping"
    :onClick="onClick"
  />
</template>

<script>

import Map from '../graphics/Map'
import { mapGetters, mapActions } from 'vuex'

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
      location: 'location/getLocation'
    }),
    styleMapping () {
      return this.locations.reduce((acc, { locationId }) => ({
        ...acc,
        [locationId]: this.location.locationId === '_WORLD' ||
         this.location.locationId === locationId
          ? SELECTED_STYLE : BASE_STYLE
      }), {})
    }
  },
  methods: {
    ...mapActions({
      setLocationId: 'location/setLocationId'
    }),
    onClick (locationId) {
      if (locationId !== this.location.locationId) {
        this.setLocationId(locationId)
      }
    }
  }
}
</script>
