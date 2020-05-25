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
import { extent } from 'd3-array'
import * as d3Scale from 'd3-scale'

import mapDictsJson from '../assets/mapDicts'

const tileLayerLink = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

export default {
  data () {
    return {
      polygons: null,

      lMap: null,
      lTileLayer: null,
      lLocationsLayer: null,

      fnColorScale: null,

      mapDictId: null,
      mapData: null
    }
  },
  computed: {
    ...mapGetters({
      locations: 'getLocations'
    }),
    mapDict () {
      return mapDictsJson.find(json => json.id === this.mapDictId)
    },
    mapColors () {
      return Object.entries(this.mapData || {})
        .reduce((acc, [locationId, list]) => ({
          ...acc,
          locationId: list[0] // first one
        }), {})
    },
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
    mapDict (mDict) {
      this.fnColorScale = d3Scale[mDict.scaleColorType]()
        .interpolator(mDict.interpolator)
    },
    mapData (mData) {
      const domain = extent(Object.values(this.mapColors)) // first one
      this.fnColorScale.domain(domain)
      console.log(this.mapColors, this.fnColorScale.domain())
    }
  },
  created () {
    this.mapDictId = 'confirmed'
    this.fetchData()
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
      style: this.fnFeatureStyle,
      onEachFeature: this.fnOnEachFeature
    })

    // this.lTileLayer.addTo(this.lMap)
    this.lLocationsLayer.addTo(this.lMap)

    setInterval(() => {
      this.lLocationsLayer.eachLayer(layer => layer.setStyle({ fillColor: interpolateReds(randomUniform()()) }))
    }, 1500)
  },
  methods: {
    fetchData () {
      // loading the actual data
      fetch(`/assets/map_dicts/${this.mapDictId}.json`)
        .then(res => res.json())
        .then(data => { this.mapData = data })
    },
    fnFeatureStyle (feature) {
      return {
        fillColor: this.fnColorScale ? this.fnColorScale(randomUniform()()) : '#888', // https://webkid.io/blog/fancy-map-effects-with-css/
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
