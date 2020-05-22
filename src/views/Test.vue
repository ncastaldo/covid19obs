<template>
  <div
    id="leaflet-map"
    style="height: 500px"
  />
</template>

<script>
import { map, tileLayer, geoJSON, fitBounds } from 'leaflet'
import { mapGetters } from 'vuex'

import { interpolateReds } from 'd3-scale-chromatic'
import { randomUniform } from 'd3-random'

const tileLayerLink = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

export default {
  data () {
    return {
      polygons: null,

      lMap: null,
      lTileLayer: null,
      lLocationsLayer: null
    }
  },
  computed: {
    ...mapGetters({
      locations: 'getLocations'
    }),
    features () {
      return this.locations.filter(l => l.geometry)
        .map(({ geometry, ...properties }) => ({
          type: 'Feature',
          geometry,
          properties
        }))
    }
  },
  mounted () {
    this.lMap = map('leaflet-map').setView([51.505, -0.09], 2)
    this.lTileLayer = tileLayer(tileLayerLink, {
      minZoom: 2,
      maxZoom: 10,
      attribution
    })
    this.lLocationsLayer = geoJSON(this.features, {
      style: this.fnFeatureStyle,
      onEachFeature: this.fnOnEachFeature,
      minZoom: 2,
      maxZoom: 10
    })

    // this.lTileLayer.addTo(this.lMap)
    this.lLocationsLayer.addTo(this.lMap)

    setInterval(() => {
      this.lLocationsLayer.eachLayer(layer => layer.setStyle({ fillColor: interpolateReds(randomUniform()()) }))
    }, 1500)
  },
  methods: {
    fnFeatureStyle (feature) {
      return {
        fillColor: interpolateReds(randomUniform()()), // https://webkid.io/blog/fancy-map-effects-with-css/
        fillOpacity: 0.9,
        color: '#fff',
        weight: 0.5
      }
    },
    fnOnEachFeature (feature, layer) {
      layer.on({
        click: this.fnZoom
      })
    },
    fnZoom (e) {
      this.lMap.fitBounds(e.target.getBounds())
    }
  }
}
</script>

<style>

@import 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';

.leaflet-container {
    background-color:rgba(0,0,0,0.0);
}

.leaflet-container path {
  transition: fill 1s;
}

</style>
