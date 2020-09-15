<template>
  <Map
    id="location-selector-map"
    :styleMapping="styleMapping"
    :mapCenter="mapCenter"
    :onClick="onClick"
  />
</template>

<script>

import { latLng } from 'leaflet'
import { geoCentroid } from 'd3-geo'

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
    mapCenter () {
      return this.location.locationId === '_WORLD'
        ? latLng(41.90, 12.49)
        : latLng(...geoCentroid(this.location.geometry).reverse())
    },
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
