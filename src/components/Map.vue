<template>
  <div id="leaflet-map" />
</template>

<script>
import { map, tileLayer, geoJSON } from 'leaflet'
import { mapGetters } from 'vuex'

import { extent } from 'd3-array'

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
  watch: {
    mapValues () {
      const domain = extent(Object.values(this.mapValues)) // first one
      this.fnColorScale.domain(domain)
      this.lLocationsLayer.eachLayer(layer => {
        const value = this.mapValues[layer.feature.properties.locationId] || null
        const fillColor = value !== null ? this.fnColorScale(value) : '#888'
        layer.setStyle({ fillColor })
      })
    }
  },
  mounted () {
    this.lMap = map('leaflet-map', {
      minZoom: 2,
      maxZoom: 6
    }).setView([41.90, 12.49], 2)
    this.lTileLayer = tileLayer(tileLayerLink, {
      attribution
    })
    this.lLocationsLayer = geoJSON(this.features, {
      style: {
        fillColor: '#888', // https://webkid.io/blog/fancy-map-effects-with-css/
        fillOpacity: 0.9,
        color: '#fff',
        weight: 0.5
      },
      onEachFeature: this.fnOnEachFeature
    })

    // this.lTileLayer.addTo(this.lMap)
    this.lLocationsLayer.addTo(this.lMap)
  },
  methods: {
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
  transition: fill 0.5s;
}

</style>
