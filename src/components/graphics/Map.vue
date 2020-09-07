<template>
  <div>
    <l-map
      :id="id"
      class="leaflet-map"
      :style="{ height: `${height}px`}"
      :min-zoom="mapMinZoom"
      :max-zoom="mapMaxZoom"
      :max-bounds="mapMaxBounds"
      :options="mapOptions"
      :zoom="mapZoom"
      :center="mapCenter"
      @click="onClick('_WORLD')"
      @ready="mapReady()"
    >
      <l-geo-json
        :geojson="features"
        :options="geoJsonOptions"
        :optionsStyle="geoJsonStyle"
      />
      <l-control
        position="topright"
        class="pa-2"
      >
        <slot />
      </l-control>
    </l-map>
    <Tooltip>
      <div
        v-if="hover"
        class="py-2 px-3 text-left"
        style="background-color: rgba(255,255, 255, 0.9)"
      >
        <h3>{{ hover.locationName }}</h3>
      </div>
    </Tooltip>
  </div>
</template>

<script>
import { latLng, latLngBounds, DomEvent } from 'leaflet'
import { LMap, LGeoJson, LControl } from 'vue2-leaflet'
import { mapGetters } from 'vuex'

const BASE_STROKE = { color: '#ddd', weight: 0.5 }
const INVALID_FILL_COLOR = '#999'

export default {
  components: {
    LMap,
    LGeoJson,
    LControl
  },
  props: {
    id: String,
    styleMapping: Object,
    height: {
      type: Number,
      default: 300
    },
    // passing the function in order to reduce overhead
    onClick: {
      type: Function,
      default: () => { console.log('click map') }
    }
  },
  data () {
    return {
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
      locations: 'location/getLocations'
    }),
    features () {
      return this.locations.map(({ geometry, ...properties }) => ({
        type: 'Feature',
        geometry,
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
      this.geoJsonStyle = (feature) => {
        const locationId = feature.properties.locationId
        return this.styleMapping[locationId] // hope no error
      }
    },
    fnOnClick (e) {
      DomEvent.stop(e) // https://github.com/Leaflet/Leaflet/issues/3756
      this.onClick(e.target.feature.properties.locationId)
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

.leaflet-map.leaflet-container {
    z-index: 1;
    background-color:#ddd;
}

.leaflet-map.leaflet-container path {
  transition: fill .5s;
}

</style>
