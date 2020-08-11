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
      {{ hover ? hover.locationName : '' }}
    </div>
    <div
      id="selector-map-chart"
      :style="{ height: `${height}px`}"
    />
  </div>
</template>

<script>
import { select } from 'd3-selection'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { map, tileLayer, geoJSON, DomEvent } from 'leaflet'
import { mapGetters, mapActions } from 'vuex'

const tileLayerLink = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
const baseView = [[41.90, 12.49], 3]
const BASE_COLOR = '#aaa'
const SELECTED_COLOR = schemeCategory10[0]

export default {
  props: {
    height: Number
  },
  data () {
    return {
      polygons: null,

      lMap: null,
      lTileLayer: null,
      lLocationsLayer: null,

      hover: null
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation',
      features: 'getFeatures'
    })
  },
  mounted () {
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
        fillColor: BASE_COLOR, // https://webkid.io/blog/fancy-map-effects-with-css/
        fillOpacity: 1,
        color: '#888',
        weight: 1
      },
      onEachFeature: this.fnOnEachFeature
    })

    this.fnRestyleLayer()

    // this.lTileLayer.addTo(this.lMap)
    this.lLocationsLayer.addTo(this.lMap)
  },
  methods: {
    ...mapActions({
      setLocationId: 'setLocationId'
    }),
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
      this.lLocationsLayer.eachLayer(layer => {
        const locationId = layer.feature.properties.locationId
        if (this.location.locationId === '_WORLD' || this.location.locationId === locationId) {
          layer.setStyle({ fillColor: SELECTED_COLOR })
        } else {
          layer.setStyle({ fillColor: BASE_COLOR })
        }
      })
    },
    fnOnMouseover (e) {
      e.target.setStyle({ weight: 2, fillOpacity: 0.7 })
      select(e.originalEvent.target).raise()
      this.hover = e.target.feature.properties
      // this.setLocationFocus(e.target.feature.properties)
    },
    fnOnMouseout (e) {
      e.target.setStyle({ weight: 0.5, fillOpacity: 1 })
      this.hover = null
      // this.setLocationFocus(null)
    }
  }
}
</script>

<style>
@import "../../node_modules/leaflet/dist/leaflet.css";
/*@import 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';*/

#selector-map-chart.leaflet-container{
    z-index: 1;
    background-color:#eee;
}

</style>
