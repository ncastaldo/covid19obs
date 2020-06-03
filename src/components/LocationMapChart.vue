<template>
  <div
    id="location-map-chart"
    :style="{ height: `${height}px`}"
  />
</template>

<script>
import { select } from 'd3-selection'
import { map, tileLayer, geoJSON, Browser } from 'leaflet'
import { mapGetters, mapActions, mapMutations } from 'vuex'

const tileLayerLink = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

const baseView = [[41.90, 12.49], 2]

const INVALID_COLOR = '#aaa'

export default {
  props: {
    height: Number
  },
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
      features: 'getFeatures',
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
    this.lMap = map('location-map-chart', {
      minZoom: 2,
      maxZoom: 7,
      maxBounds: [[-65, -180], [90, 180]], // antartica is out
      scrollWheelZoom: false
    })
      .setView(...baseView)
      .on('click', e => Browser.touch && this.fnRestyleLayer())

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
        click: e => Browser.touch && this.fnOnMouseover(e),
        mouseover: this.fnOnMouseover,
        mouseout: this.fnOnMouseout
      })
    },
    /* fnOnClick (e) {
      DomEvent.stop(e) // https://github.com/Leaflet/Leaflet/issues/3756
      const newId = e.target.feature.properties.locationId
      const oldId = this.location.locationId
      if (newId !== oldId) {
        this.setLocationId(newId)
        this.lMap.fitBounds(e.target.getBounds())
      } else {
        this.fnRestoreView()
      }
    },
    fnRestoreView () {
      if (this.location.locationId !== '_WORLD') {
        this.setLocationId('_WORLD')
        this.lMap.setView(...baseView)
      }
    }, */
    fnOnMouseover (e) {
      e.target.setStyle({ weight: 2, fillOpacity: 0.7 })
      select(e.originalEvent.target).raise()
      this.setLocationFocus(e.target.feature.properties)
    },
    fnOnMouseout (e) {
      e.target.setStyle({ weight: 0.5, fillOpacity: 1 })
      this.setLocationFocus(null)
    },
    fnRestyleLayer () {
      this.lLocationsLayer.eachLayer(layer => {
        layer.setStyle({ weight: 0.5, fillOpacity: 1 })
      })
    }
  }
}
</script>

<style>

@import "../../node_modules/leaflet/dist/leaflet.css";
/*@import 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';*/

#location-map-chart.leaflet-container {
    z-index: 1;
    background-color:rgba(0,0,0,0.0);
}

#location-map-chart.leaflet-container path {
  transition: fill 0.5s;
}

</style>
