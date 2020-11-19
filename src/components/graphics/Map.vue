<template>
  <div :style="style">
    <l-map
      :id="id"
      class="leaflet-map"
      :style="style"
      :min-zoom="mapMinZoom"
      :max-zoom="mapMaxZoom"
      :max-bounds="mapMaxBounds"
      :options="mapOptions"
      :zoom="mapZoom"
      :center="mapCenter"
      :noBlockingAnimations="true"
      @click="onClick('_WORLD')"
      @ready="mapReady()"
    >
      <l-tile-layer
        v-if="false"
        :url="url"
        :crossOrigin="'*'"
      />
      <l-geo-json
        :geojson="features"
        :options="geoJsonOptions"
        :optionsStyle="geoJsonStyle"
      />
      <l-control
        position="topright"
      >
        <slot name="topright" />
      </l-control>
      <l-control
        position="bottomright"
      >
        <slot name="bottomright" />
      </l-control>
    </l-map>

    <MapTooltip :mapEvent="mapEvent">
      <MapHover
        :hover="hover"
        :fnTooltips="fnTooltips || undefined"
      />
    </MapTooltip>
  </div>
</template>

<script>
import MapTooltip from './MapTooltip'
import MapHover from './MapHover'

import { latLng, latLngBounds, DomEvent } from 'leaflet'
import { LMap, LGeoJson, LControl, LTileLayer } from 'vue2-leaflet'
import { mapGetters } from 'vuex'

const inactiveStyle = {
  fillOpacity: 1,
  fillColor: '#999',
  color: '#ddd',
  weight: 0.5
}

export default {
  components: {
    MapTooltip,
    MapHover,
    LMap,
    LGeoJson,
    LControl,
    LTileLayer
  },
  props: {
    id: String,
    styleMapping: Object,
    height: Number,
    mapZoom: {
      type: Number,
      default: 1
    },
    mapCenter: {
      type: Object,
      default: () => latLng(18, 12.49)
    },
    // passing the function in order to reduce overhead
    onClick: {
      type: Function,
      default: () => { console.log('click map') }
    },
    fnTooltips: Function
  },
  data () {
    return {
      map: null,

      mapMinZoom: 2,
      mapMaxZoom: 7,
      mapMaxBounds: latLngBounds([[-65, -180], [90, 180]]),

      geoJsonOptions: {},
      geoJsonStyle: {},

      url: 'http://localhost:8123/geojson-WHO-final/{z}/{x}/{y}.geojson',

      mapEvent: null,
      hover: null
    }
  },
  computed: {
    ...mapGetters({
      allLocations: 'location/getAllLocations',
      getLocationGeometry: 'location/getLocationGeometry'
    }),
    style () {
      return {
        height: this.height ? `${this.height}px` : '100%'
      }
    },
    mapOptions () {
      return { scrollWheelZoom: !this.height }
    },
    features () {
      return this.allLocations.map((properties) => ({
        type: 'Feature',
        geometry: this.getLocationGeometry(properties.locationId),
        properties
      }))
    }
  },
  watch: {
    styleMapping () {
      this.repaint()
    }
  },
  methods: {
    mapReady () {
      this.repaint()
    },
    repaint () {
      this.geoJsonStyle = (feature, layer) => {
        const locationId = feature.properties.locationId
        return locationId in this.styleMapping
          ? this.styleMapping[locationId]
          : inactiveStyle
      }
      this.geoJsonOptions = {
        onEachFeature: (feature, layer) => {
          const locationId = feature.properties.locationId
          if (locationId in this.styleMapping) {
            layer.on({
              click: this.fnOnClick,
              mouseover: this.fnOnMouseover,
              mouseout: this.fnOnMouseout
            })
            if (this.styleMapping[locationId].toFront) {
              this.$nextTick(() => layer.bringToFront())
            }
          }
        }
      }
    },
    fnOnClick (e) {
      DomEvent.stop(e) // https://github.com/Leaflet/Leaflet/issues/3756
      this.onClick(e.target.feature.properties.locationId)
    },
    fnOnMouseover (e) {
      e.target.setStyle({ fillOpacity: 0.7 })
      this.mapEvent = e
      this.hover = e.target.feature.properties
      // this.setLocationFocus(e.target.feature.properties)
    },
    fnOnMouseout (e) {
      e.target.setStyle({ fillOpacity: 1 })
      this.mapEvent = null
      this.hover = null
      // this.setLocationFocus(null)
    }
  }
}
</script>

<style>

@import "../../../node_modules/leaflet/dist/leaflet.css";

.leaflet-map.leaflet-container {
    z-index: 1;
    background-color:#ddd;
}

.leaflet-map.leaflet-container path {
  transition: fill .25s;
}

</style>
