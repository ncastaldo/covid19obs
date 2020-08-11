<template>
  <div>
    <HybridDetails />
    <div
      id="hybrid-map-chart"
      :style="{ height: `${height}px`}"
    />
  </div>
</template>

<script>
import HybridDetails from './HybridDetails'

import { select } from 'd3-selection'
import { map, tileLayer, geoJSON, DomEvent } from 'leaflet'
import { mapGetters, mapActions, mapMutations } from 'vuex'

const tileLayerLink = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

const baseView = [[41.90, 12.49], 2]

const INVALID_COLOR = '#aaa'

export default {
  components: {
    HybridDetails
  },
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
      features: 'getFeatures',
      location: 'getLocation',
      locationMapping: 'location/getLocationMapping'
    })
  },
  watch: {
    locationMapping (mapping) {
      this.lLocationsLayer.eachLayer(layer => {
        const locationId = layer.feature.properties.locationId
        const fillColor = locationId in mapping
          ? mapping[locationId].color || INVALID_COLOR
          : INVALID_COLOR
        layer.setStyle({ fillColor })
      })
    }
  },
  mounted () {
    this.lMap = map('hybrid-map-chart', {
      minZoom: 2,
      maxZoom: 7,
      maxBounds: [[-65, -180], [90, 180]], // antartica is out
      scrollWheelZoom: false
    })
      .setView(...baseView)
      .on('click', this.fnOnClick)

    this.lTileLayer = tileLayer(tileLayerLink, {
      attribution
    })
    this.lLocationsLayer = geoJSON(this.features, {
      style: {
        fillColor: '#aaa', // https://webkid.io/blog/fancy-map-effects-with-css/
        fillOpacity: 1,
        color: '#888',
        weight: 1
      },
      onEachFeature: this.fnOnEachFeature
    })

    // this.lTileLayer.addTo(this.lMap)
    this.lLocationsLayer.addTo(this.lMap)
  },
  methods: {
    ...mapMutations({
      setLocationFocus: 'location/setLocationFocus'
    }),
    ...mapActions({
      setLocationId: 'setLocationId'
    }),
    fnOnEachFeature (feature, layer) {
      layer.on({
        // click: this.fnOnClick,
        click: this.fnOnClick, // e => Browser.touch && this.fnOnMouseover(e),
        mouseover: this.fnOnMouseover,
        mouseout: this.fnOnMouseout
      })
    },
    fnOnClick (e) {
      DomEvent.stop(e) // https://github.com/Leaflet/Leaflet/issues/3756
      const oldId = this.location.locationId
      if (e.target.feature && e.target.feature.properties.locationId !== oldId) {
        select(e.originalEvent.target).raise()
        this.setLocationId(e.target.feature.properties.locationId)
      } else {
        this.setLocationId('_WORLD')
      }
      this.fnRestyleLayer()
    },
    fnRestyleLayer () {
      this.lLocationsLayer.eachLayer(layer => {
        const locationId = layer.feature.properties.locationId
        if (this.location.locationId === '_WORLD' || this.location.locationId !== locationId) {
          layer.setStyle({ weight: 0.5 })
        } else {
          layer.setStyle({ weight: 2.5 })
        }
      })
    },
    fnOnMouseover (e) {
      e.target.setStyle({ fillOpacity: 0.7 })
      this.setLocationFocus(e.target.feature.properties)

      this.hover = e.target.feature.properties
    },
    fnOnMouseout (e) {
      e.target.setStyle({ fillOpacity: 1 })
      this.setLocationFocus(null)

      this.hover = null
    }
  }
}
</script>

<style>

@import "../../node_modules/leaflet/dist/leaflet.css";
/*@import 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';*/

#hybrid-map-chart.leaflet-container{
    z-index: 1;
    background-color:rgba(0, 0, 0, 0);
}

#hybrid-map-chart.leaflet-container path {
  transition: fill 0.5s;
}

</style>
