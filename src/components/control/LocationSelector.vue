<template>
  <div>
    <l-map
      id="location-selector-map"
      ref="locationSelectorMap"
      :style="{ height: `${height}px`}"
      :min-zoom="mapMinZoom"
      :max-zoom="mapMaxZoom"
      :max-bounds="mapMaxBounds"
      :options="mapOptions"
      :zoom="mapZoom"
      :center="mapCenter"
      @click="restore()"
      @ready="mapReady()"
      @mousemove="moveHover()"
    >
      <l-geo-json
        :geojson="features"
        :options="geoJsonOptions"
        :optionsStyle="geoJsonStyle"
      />

      <l-control
        position="topright"
        class="pa-2"
        style="background-color: rgba(255,255,255, 0.9)"
      >
        <MapLayerSelector />
      </l-control>
    </l-map>
    <Tooltip>
      <LocationHover
        :hover="hover"
      />
    </Tooltip>
  </div>
</template>

<script>
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { latLng, latLngBounds, DomEvent } from 'leaflet'
import { LMap, LGeoJson, LControl } from 'vue2-leaflet'
import { mapGetters, mapActions } from 'vuex'

import Tooltip from '../base/Tooltip'
import MapLayerSelector from './MapLayerSelector'
import LocationHover from './LocationHover'

const BASE_STROKE = { color: '#ddd', weight: 0.5 }
const SELECTED_STROKE = { color: '#000', weight: 2 }

const INVALID_FILL_COLOR = '#999'

const generalMapDictUrl = '/assets/map_dicts/general.json'

export default {
  components: {
    LMap,
    LGeoJson,
    LControl,
    Tooltip,
    MapLayerSelector,
    LocationHover
  },
  props: {
    height: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      generalMapDict: null,

      map: null,

      mapMinZoom: 2,
      mapMaxZoom: 7,
      mapMaxBounds: latLngBounds([[-65, -180], [90, 180]]),

      mapOptions: { scrollWheelZoom: false },

      mapZoom: 3,
      mapCenter: latLng(41.90, 12.49),

      geoJsonOptions: {
        onEachFeature: (feature, layer) =>
          layer.on({
            click: this.fnOnClick,
            mouseover: this.fnOnMouseover,
            mouseout: this.fnOnMouseout
          })
      },
      geoJsonStyle: {
        fillColor: INVALID_FILL_COLOR, // https://webkid.io/blog/fancy-map-effects-with-css/
        fillOpacity: 1,
        ...BASE_STROKE
      },

      hover: null
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation',
      features: 'getFeatures',
      mapLayer: 'mapLayer/getMapLayer'
    }),
    colors () {
      if (!this.generalMapDict) { return null }

      const values = Object.values(this.generalMapDict)
        .map(d => d[this.mapLayer.mapLayerId])
        .filter(d => d !== null && d > 0)

      // creating the color scale
      const fnScale = this.mapLayer.mapLayerColorScale
        .domain([1, max(values)])

      return Object.entries(this.generalMapDict)
        .map(([k, d]) => [k, d[this.mapLayer.mapLayerId]])
        .reduce((colors, [k, v]) => ({
          ...colors,
          [k]: v !== null && v > 0 ? fnScale(v) : INVALID_FILL_COLOR
        }), {})
    }
  },
  watch: {
    colors () {
      this.repaint()
    }
  },
  created () {
    fetch(generalMapDictUrl)
      .then(res => res.json())
      .then(data => { this.generalMapDict = data })
  },
  methods: {
    ...mapActions({
      setLocationId: 'setLocationId'
    }),
    mapReady () {
      this.repaint()
    },
    repaint () {
      this.geoJsonStyle = (feature) => {
        const locationId = feature.properties.locationId
        const fillColor = this.colors ? this.colors[locationId] : INVALID_FILL_COLOR

        // stroke
        const stroke = locationId === this.location.locationId && this.location.locationId !== '_WORLD'
          ? SELECTED_STROKE : BASE_STROKE
        return { fillColor, ...stroke }
      }
    },
    restore () {
      this.setLocationId('_WORLD')
      this.repaint()
    },
    moveHover () {

    },
    fnOnClick (e) {
      DomEvent.stop(e) // https://github.com/Leaflet/Leaflet/issues/3756
      const newId = e.target.feature.properties.locationId
      const oldId = this.location.locationId
      if (newId !== oldId) {
        select(e.originalEvent.target).raise()
        this.setLocationId(newId)
        this.repaint()
        // this.lMap.fitBounds(e.target.getBounds())
      } else if (this.location.locationId !== '_WORLD') {
        this.restore()
      }
    },
    fnOnMouseover (e) {
      e.target.setStyle({ fillOpacity: 0.7 })
      const location = e.target.feature.properties
      const dict = this.generalMapDict
        ? this.generalMapDict[location.locationId]
        : {}
      this.hover = {
        ...location,
        ...dict
      }
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

#location-selector-map.leaflet-container{
    z-index: 1;
    background-color:#ddd;
}

#location-selector-map.leaflet-container path{
  transition: fill .5s;
}

</style>
