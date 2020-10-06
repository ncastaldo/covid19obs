<template>
  <Map
    id="choropleth-map"
    :height="500"
    :styleMapping="styleMapping"
  >
    <v-card class="pa-2">
      <LayerSelector />
    </v-card></Map>
</template>

<script>
import { mapGetters } from 'vuex'
import Map from '../components/graphics/Map'
import LayerSelector from '../components/control/LayerSelector'

export default {
  components: {
    Map,
    LayerSelector
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations',
      location: 'location/getLocation',
      layerDict: 'layer/getLayerDict'
    }),
    styleMapping () {
      return this.locations.reduce((acc, { locationId }) => ({
        ...acc,
        [locationId]: {
          fillColor: this.layerDict
            ? this.layerDict[locationId].color
            : '#aeaeae',
          fillOpacity: 1,
          /* ...(this.location.locationId === '_WORLD' ||
          this.location.locationId !== locationId
            ? { color: '#444', weight: 0.5, toFront: false }
            : { color: '#111', weight: 2, toFront: true }) */
          color: '#444',
          weight: 0.5
        }
      }), {})
    }
  }

}
</script>

<style>

</style>
