<template>
  <div>
    <div
      class="selector-map-chart__hover px-2 pt-1"
      :style="{
        'background-color': '#ddd',
        'font-size': '18px',
        'color': '#000',
        'height': '34px',
        'font-weight': 200
      }"
    >
      {{ hover ? [hover.locationName, generalMapDict[hover.locationId]] : '' }}
    </div>
    <div
      id="selector-map-chart"
      :style="{ height: `${height}px`}"
    />
    <MapLayerSelector />
  </div>
</template>

<script>
import MapLayerSelector from './MapLayerSelector'

import { max } from 'd3-array'
import { select } from 'd3-selection'
import { map, tileLayer, geoJSON, DomEvent } from 'leaflet'
import { mapGetters, mapActions } from 'vuex'

const generalMapDictUrl = '/assets/map_dicts/general.json'

const tileLayerLink = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
const baseView = [[41.90, 12.49], 3]

const BASE_STROKE = { color: '#fff', weight: 1 }
const SELECTED_STROKE = { color: '#000', weight: 2 }

const INVALID_FILL_COLOR = '#aaa'

export default {
  components: {
    MapLayerSelector
  },
  props: {
    height: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      polygons: null,

      lMap: null,
      lTileLayer: null,
      lLocationsLayer: null,

      generalMapDict: null,
      colors: null,

      hover: null
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation',
      features: 'getFeatures',
      mapLayer: 'mapLayer/getMapLayer'
    })
  },
  watch: {
    generalMapDict () {
      this.computeColors()
    },
    mapLayer () {
      this.generalMapDict && this.computeColors()
    }
  },
  created () {
    fetch(generalMapDictUrl)
      .then(res => res.json())
      .then(data => { this.generalMapDict = data })
  },
  mounted () {
    this.$nextTick(function () {
      this.lMap = map('selector-map-chart', {
        minZoom: 2,
        maxZoom: 7,
        maxBounds: [[-65, -180], [90, 180]], // antartica is out

        scrollWheelZoom: false
      })
        .setView(...baseView)
        .on('click', this.fnRestoreView)

      this.lTileLayer = tileLayer(tileLayerLink, {
        attribution
      })
      this.lLocationsLayer = geoJSON(this.features, {
        style: {
          fillColor: INVALID_FILL_COLOR, // https://webkid.io/blog/fancy-map-effects-with-css/
          fillOpacity: 1,
          ...BASE_STROKE
        },
        onEachFeature: this.fnOnEachFeature
      })

      this.fnRestyleLayer()

      // this.lTileLayer.addTo(this.lMap)
      this.lLocationsLayer.addTo(this.lMap)
    })
  },
  methods: {
    ...mapActions({
      setLocationId: 'setLocationId'
    }),
    computeColors () {
      // getting valid values
      const values = Object.values(this.generalMapDict)
        .map(d => d[this.mapLayer.mapLayerId])
        .filter(d => d !== null && d > 0)

      // creating the color scale
      const fnScale = this.mapLayer.mapLayerColorScale
        .domain([1, max(values)])

      // color mapping
      this.colors = Object.entries(this.generalMapDict)
        .map(([k, d]) => [k, d[this.mapLayer.mapLayerId]])
        .reduce((colors, [k, v]) => ({
          ...colors,
          [k]: v !== null && v > 0 ? fnScale(v) : INVALID_FILL_COLOR
        }), {})
      this.fnRestyleLayer()
    },
    fnOnEachFeature (feature, layer) {
      layer.on({
        click: this.fnOnClick,
        mouseover: this.fnOnMouseover,
        mouseout: this.fnOnMouseout
      })
    },
    fnOnClick (e) {
      DomEvent.stop(e) // https://github.com/Leaflet/Leaflet/issues/3756
      const newId = e.target.feature.properties.locationId
      const oldId = this.location.locationId
      if (newId !== oldId) {
        select(e.originalEvent.target).raise()
        this.setLocationId(newId)
        // this.lMap.fitBounds(e.target.getBounds())
      } else {
        this.fnRestoreView()
      }
      this.fnRestyleLayer()
    },

    fnRestoreView () {
      if (this.location.locationId !== '_WORLD') {
        this.setLocationId('_WORLD')
        this.fnRestyleLayer()
        // this.lMap.setView(...baseView)
      }
    },
    fnRestyleLayer () {
      this.lLocationsLayer && this.lLocationsLayer.eachLayer(layer => {
        // fill color
        const locationId = layer.feature.properties.locationId
        const fillColor = this.colors ? this.colors[locationId] : INVALID_FILL_COLOR

        // stroke
        const stroke = this.location.locationId === locationId && this.location.locationId !== '_WORLD'
          ? SELECTED_STROKE : BASE_STROKE
        layer.setStyle({ fillColor, ...stroke })
      })
    },
    fnOnMouseover (e) {
      e.target.setStyle({ fillOpacity: 0.7 })
      this.hover = e.target.feature.properties
      // this.setLocationFocus(e.target.feature.properties)
    },
    fnOnMouseout (e) {
      e.target.setStyle({ fillOpacity: 1 })
      this.hover = null
      // this.setLocationFocus(null)
    }
  }
}
</script>

<style>
@import "../../../node_modules/leaflet/dist/leaflet.css";
/*@import 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';*/

#selector-map-chart.leaflet-container{
    z-index: 1;
    background-color:#eee;
}

#selector-map-chart.leaflet-container path{
  transition: fill .75s;
}

</style>
