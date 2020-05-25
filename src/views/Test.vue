<template>
  <div>
    <DateSlider />
    <div
      id="leaflet-map"
      style="height: 500px"
    />
  </div>
</template>

<script>
import { map, tileLayer, geoJSON, fitBounds } from 'leaflet'
import { mapGetters } from 'vuex'

import { extent } from 'd3-array'

import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import DateSlider from '../components/DateSlider'

import mapDictsJson from '../assets/mapDicts'

const INVALID_COLOR = '#888'

const tileLayerLink = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

export default {
  components: {
    DateSlider
  },
  data () {
    return {
      polygons: null,

      lMap: null,
      lTileLayer: null,
      lLocationsLayer: null,

      fnColorScale: null,

      mapDictId: null,
      mapData: null,
      mapInfo: null
    }
  },
  computed: {
    ...mapGetters({
      locations: 'getLocations',
      dateIndex: 'getDateIndex'
    }),
    mapDict () {
      return mapDictsJson.find(json => json.id === this.mapDictId)
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
        .interpolator(d3ScaleChromatic[mDict.interpolator])
    },
    dateIndex () {
      this.computeMapInfo()
    },
    mapData () {
      this.computeMapInfo()
    },
    mapInfo () {
      this.lLocationsLayer.eachLayer(layer => {
        const locationId = layer.feature.properties.locationId
        const fillColor = locationId in this.mapInfo ? this.mapInfo[locationId].color : INVALID_COLOR
        layer.setStyle({ fillColor })
      })
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
    fetchData () {
      // loading the actual data
      fetch(`/assets/map_dicts/${this.mapDictId}.json`)
        .then(res => res.json())
        .then(data => { this.mapData = data })
    },
    computeMapInfo () {
      const fnGetValue = list => list !== null ? list[this.dateIndex] : null
      const fnGetColor = value => value !== null ? this.fnColorScale(value) : INVALID_COLOR

      // color scale domain update
      const domain = extent(Object.values(this.mapData).map(fnGetValue))
      this.fnColorScale.domain(domain)

      // mapInfo computation
      this.mapInfo = Object.entries(this.mapData || {})
        .filter(([locationId, list]) => locationId !== '_WORLD')
        .map(([locationId, list]) => [locationId, fnGetValue(list)])
        .reduce((acc, [locationId, value]) => ({
          ...acc,
          [locationId]: {
            value,
            color: fnGetColor(value)
          }
        }), {})
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
  transition: fill 0.5s;
}

</style>
