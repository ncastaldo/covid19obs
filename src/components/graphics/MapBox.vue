<template>
  <div :style="style">
    <MglMap
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :center="mapCenter"
      :maxBounds="mapMaxBounds"
      :scrollZoom="false"
      @load="onMapLoaded"
      @click="fnOnClick"
    >
      <MglNavigationControl position="top-left" />
      <MglVectorLayer
        sourceId="background"
        :layerId="backgroundLayer.id"
        :layer="backgroundLayer"
      />
      <MglGeojsonLayer
        sourceId="locations"
        :source="locationsSource"
        :layerId="locationsFillLayer.id"
        :layer="locationsFillLayer"
        @mousemove="fnOnMousemove"
        @mouseleave="fnOnMouseleave"
        @click="fnOnClick"
      />
      <MglGeojsonLayer
        sourceId="locations"
        :source="locationsSource"
        :layerId="locationsLineLayer.id"
        :layer="locationsLineLayer"
      />
      <MglGeojsonLayer
        sourceId="maskpoly"
        :source="maskpolySource"
        :layerId="maskpolyFillLayer.id"
        :layer="maskpolyFillLayer"
        @mousemove="fnOnMouseleave"
      />
      <MglGeojsonLayer
        sourceId="maskpoly"
        :source="maskpolySource"
        :layerId="maskpolyLineLayer.id"
        :layer="maskpolyLineLayer"
      />
      <MglGeojsonLayer
        sourceId="maskline"
        :source="masklineSource"
        :layerId="masklineLineLayer.id"
        :layer="masklineLineLayer"
      />
    </MglMap>

    <MapControl position="top-right">
      <slot name="top-right" />
    </MapControl>
    <MapControl position="bottom-right">
      <slot name="bottom-right" />
    </MapControl>

    <MapTooltip :event="event">
      <MapHover
        :hover="hover"
        :fnTooltips="fnTooltips || undefined"
      />
    </MapTooltip>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap, MglVectorLayer, MglNavigationControl, MglGeojsonLayer } from 'vue-mapbox'

import MapTooltip from './MapTooltip'
import MapHover from './MapHover'
import MapControl from './MapControl'

import { masklineMap, maskpolyMap } from '../../plugins/maps'

import { mapGetters } from 'vuex'

const BACKGROUND_COLOR = '#ddd'
const INVALID_COLOR = '#bbb'

const LINE_COLOR = '#444'
const LINE_WIDTH = 0.5

// BACKGROUND
const backgroundLayer = {
  id: 'background',
  type: 'background',
  paint: { 'background-color': BACKGROUND_COLOR }
}

// MASKLINE
const masklineSource = {
  type: 'geojson',
  data: masklineMap
}

const masklineLineLayer = {
  id: 'maskline-line',
  type: 'line',
  paint: {
    // over
    'line-color': [
      'match',
      ['get', 'NAME'],
      'Bline_Kosovo', '#fff',
      LINE_COLOR
    ],
    'line-width': LINE_WIDTH,
    'line-dasharray': [2, 4]
  }
}
// MASKPOLY
const maskpolySource = {
  type: 'geojson',
  data: maskpolyMap
}
const regionColors = [
  'Jammu and Kashmir', INVALID_COLOR,
  'Lakes', BACKGROUND_COLOR,
  'Aksai Chin', INVALID_COLOR,
  'Abyei', INVALID_COLOR
]
const maskpolyFillLayer = {
  id: 'maskpoly-fill',
  type: 'fill',
  paint: {
    'fill-color': [
      'match',
      ['string', ['get', 'NAME']],
      ...regionColors,
      INVALID_COLOR

    ]
  }
}
const maskpolyLineLayer = {
  id: 'maskpoly-line',
  type: 'line',
  paint: {
    'line-color': LINE_COLOR,
    'line-width': LINE_WIDTH
  }
}

export default {
  components: {
    MglMap,
    MglVectorLayer,
    MglNavigationControl,
    MglGeojsonLayer,
    MapControl,
    MapTooltip,
    MapHover
  },
  props: {
    id: String,
    styleMapping: Object,
    height: Number,
    bounds: Array,
    // passing the function in order to reduce overhead
    onClick: {
      type: Function,
      default: () => { console.log('click map') }
    },
    fnTooltips: Function
  },
  data () {
    return {

      // MAP
      accessToken: 'pk.eyJ1IjoibmNhc3RhbGRvIiwiYSI6ImNraXAzZDBlejAwMTQydGwzdDFzdnVmYnoifQ.GMltHO_4k9SrYfnPNJegrA', // your access token. Needed if you using Mapbox maps
      mapStyle: {
        version: 8,
        layers: [],
        sources: {}
      }, // '', // 'mapbox://styles/ncastaldo/ckip49xm43su717mu8gh6ov1l',
      mapCenter: [18, 12.49],
      mapMaxBounds: [[-180, -65], [180, 80]],

      // SOURCES AND LAYERS
      backgroundLayer,
      masklineSource,
      masklineLineLayer,
      maskpolySource,
      maskpolyFillLayer,
      maskpolyLineLayer,

      hoverFeatureId: null,
      clickFeatureId: null,

      hover: null,

      event: null,

      clickLocationId: null
    }
  },
  computed: {
    ...mapGetters({
      allLocations: 'location/getAllLocations',
      getLocationGeometry: 'location/getLocationGeometry'
    }),
    features () {
      return this.allLocations.map((properties) => ({
        type: 'Feature',
        geometry: this.getLocationGeometry(properties.locationId),
        properties
      }))
    },
    // LOCATIONS
    locationsSource () {
      return {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.features
        },
        generateId: true // very important
      }
    },
    locationsFillLayer () {
      return {
        id: 'locations-fill',
        type: 'fill',
        paint: this.locationsFillLayerPaint // inactivePaint
      }
    },
    locationsFillLayerPaint () {
      return {
        'fill-color': [
          'get', 'fillColor',
          [
            'get', ['get', 'locationId'],
            ['literal', this.styleMapping]]
        ],
        'fill-color-transition': {
          duration: 250,
          delay: 0
        },
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.5, 1
        ]
      }
    },
    locationsLineLayer () {
      return {
        id: 'locations-line',
        type: 'line',
        paint: {
          'line-color': [
            'get', 'lineColor',
            [
              'get', ['get', 'locationId'],
              ['literal', this.styleMapping]]
          ],
          'line-width': ['get', 'lineWidth',
            [
              'get', ['get', 'locationId'],
              ['literal', this.styleMapping]
            ]
          ]
        }
      }
    },
    style () {
      return {
        position: 'relative',
        height: this.height ? `${this.height}px` : '100%'
      }
    }
  },
  watch: {
    bounds (bounds) {
      if (this.map) {
        let b = bounds
        if (b === null) {
          b = this.mapMaxBounds
        }
        this.map.fitBounds(b, {
          padding: 40,
          duration: 0
        })
      }
    }
  },
  created () {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox
  },
  methods: {
    onMapLoaded (event) {
      // in component
      this.map = event.map
    },
    fnOnMousemove (e) {
      if (e.mapboxEvent.features.length) {
        const oldId = this.hoverFeatureId
        const newId = e.mapboxEvent.features[0].id
        if (oldId !== newId) {
          this.map.setFeatureState({ id: oldId, source: 'locations' }, { hover: false })
          this.map.setFeatureState({ id: newId, source: 'locations' }, { hover: true })
          // hovers
          this.hoverFeatureId = newId
          this.hover = e.mapboxEvent.features[0].properties
          // event
          this.event = e.mapboxEvent.originalEvent
        }
      }
    },
    fnOnMouseleave (e) {
      if (this.hoverFeatureId !== null) {
        const oldId = this.hoverFeatureId
        this.map.setFeatureState({ id: oldId, source: 'locations' }, { hover: false })
        // hovers
        this.hoverFeatureId = null
        this.hover = null
        // event
        this.event = null
      }
    },
    fnOnClick (e) {
      // trick to avoid multiple calls
      if (!this.clickLocationId) {
        this.$nextTick(() => {
          this.onClick(this.clickLocationId)
          this.clickLocationId = null
        })
      }
      this.clickLocationId = e.mapboxEvent.features
        ? e.mapboxEvent.features[0].properties.locationId
        : '_WORLD'
    }
  }
}
</script>

<style scoped>

@import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";

</style>

<!--template>
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
</template-->

<!--script>
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
</script-->

<!--style>

@import "../../../node_modules/leaflet/dist/leaflet.css";

.leaflet-map.leaflet-container {
    z-index: 1;
    background-color:#ddd;
}

.leaflet-map.leaflet-container path {
  transition: fill .25s;
}

</style-->
