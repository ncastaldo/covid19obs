<template>
  <MapBox
    id="location-selector-map"
    :height="height"
    :styleMapping="styleMapping"
    :bounds="bounds"
    :fnTooltips="fnTooltips"
    :onClick="onClick"
  >
    <template v-slot:top-right>
      <v-card class="pa-1 layer-container">
        <div class="d-flex align-center flex-column">
          <LayerSelector />
          <LegendChart
            v-if="true"
            :height="45"
            :variableInfo="layerVariableInfo"
            :domain="layerDomain"
          />
        </div>
      </v-card>
    </template>
    <template v-slot:bottom-right>
      <v-card
        class="pa-2"
        flat
        style="background-color: rgba(255,255,255, 0.6)"
      >
        Date: <b>{{ layerDateString }}</b>
      </v-card>
    </template>
  </MapBox>
</template>

<script>

import { geoBounds } from 'd3-geo'

import MapBox from '../graphics/MapBox'

import LayerSelector from './LayerSelector'
import LegendChart from '../graphics/LegendChart'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    MapBox,
    LayerSelector,
    LegendChart
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations',
      allLocations: 'location/getAllLocations',
      location: 'location/getLocation',
      layerVariableInfo: 'layer/getLayerVariableInfo',
      layerDomain: 'layer/getLayerDomain',
      layerDict: 'layer/getLayerDict',
      layerDateString: 'layer/getLayerDateString',

      getLocationGeometry: 'location/getLocationGeometry'
    }),
    height () {
      return Math.min(450, window.innerHeight * 2 / 3)
    },
    bounds () {
      return this.location.locationId === '_WORLD'
        ? null
        : geoBounds(this.getLocationGeometry(this.location.locationId))
    },
    styleMapping () {
      return this.allLocations.reduce((acc, { locationId }) => ({
        ...acc,
        [locationId]: {
          fillColor: this.layerDict && locationId in this.layerDict
            ? this.layerDict[locationId].color
            : '#bbb',
          ...(this.location.locationId === '_WORLD' ||
          this.location.locationId !== locationId
            ? { lineColor: '#444', lineWidth: 0.5, toFront: false }
            : { lineColor: '#111', lineWidth: 2, toFront: true })
          // color: '#444',
          // weight: 0.5
        }
      }), {})
    },
    fnTooltips () {
      if (!this.layerVariableInfo) return () => []
      return d => d.locationId in this.layerDict
        ? [{
          name: this.layerVariableInfo.name,
          value: this.layerDict[d.locationId].value,
          color: this.styleMapping[d.locationId].fillColor,
          formatType: this.layerVariableInfo.formatType
        }]
        : []
    }
  },
  watch: {
    layerDict () {
      // console.log(this.layerDict)
    }
  },
  methods: {
    ...mapActions({
      setLocationId: 'location/setLocationId'
    }),
    onClick (locationId) {
      if (locationId !== this.location.locationId) {
        if (locationId === '_WORLD' || locationId in this.layerDict) {
          this.setLocationId(locationId)
        }
      }
    }
  }
}
</script>

<style scoped>

.layer-container {
  width: 320px;
}

@media (max-width: 400px) {
  .layer-container {
    width: 200px;
  }
}

</style>
