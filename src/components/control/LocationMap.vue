<template>
  <Map
    id="location-selector-map"
    :height="400"
    :styleMapping="styleMapping"
    :mapCenter="mapCenter"
    :mapZoom="mapZoom"
    :onClick="onClick"
  />
</template>

<script>

import { latLng } from 'leaflet'
import { geoCentroid, geoDistance, geoBounds } from 'd3-geo'

import Map from '../graphics/Map'
import { mapGetters, mapActions } from 'vuex'

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
        : latLng(...(this.location.geoCentroid.slice().reverse())) /* ...geoCentroid(this.location.geometry */
    },
    mapZoom () {
      if (this.location.locationId === '_WORLD') return 1
      const d = geoDistance(...this.location.geoBounds)// geoBounds(this.location.geometry))
      const lat = Math.abs(this.location.geoCentroid[1])// geoCentroid(this.location.geometry)[1])
      // decrease the zoom at higher latitudes
      const correct = lat > 50 ? 3 : lat > 45 ? 2 : lat > 40 ? 1 : 0
      const z = Math.ceil(1 / d) - correct
      return z < 1 ? 1 : z > 5 ? 5 : z
    },
    styleMapping () {
      return this.locations.reduce((acc, { locationId }) => ({
        ...acc,
        [locationId]: {
          fillColor: this.location.locationId !== '_WORLD' &&
          this.location.locationId !== locationId ? '#aeaeae' : 'rgb(31, 121, 179)',
          fillOpacity: 1,
          weight: 0.5,
          color: '#eee'
        }
      }), {})
    }
  },
  watch: {
    layerDict () {
      console.log(this.layerDict)
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
