<template>
  <Map
    id="choropleth-map"
    :height="500"
    :styleMapping="styleMapping"
    :fnTooltips="fnTooltips"
  >
    <template v-slot:topright>
      <v-card class="pa-1">
        <div class="d-flex align-center">
          <LayerSelector />
          <LegendChart
            v-if="true"
            :width="300"
            :variableInfo="layerVariableInfo"
            :domain="layerDomain"
          /></div>
      </v-card>
    </template>
    <template v-slot:bottomright>
      <v-card class="pa-2">
        <PeriodSelector />
      </v-card>
    </template>
  </Map>
</template>

<script>
import { mapGetters } from 'vuex'
import Map from '../components/graphics/Map'

import LayerSelector from '../components/control/LayerSelector'
// import PeriodBars from '../components/control/PeriodBars'
import PeriodSelector from '../components/control/PeriodSelector'

import LegendChart from '../components/graphics/LegendChart'

export default {
  components: {
    Map,
    LayerSelector,
    // PeriodBars
    PeriodSelector,
    LegendChart
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations',
      location: 'location/getLocation',
      layerVariableInfo: 'layer/getLayerVariableInfo',
      layerDomain: 'layer/getLayerDomain',
      layerDict: 'layer/getLayerDict'
    }),
    styleMapping () {
      return this.locations.reduce((acc, { locationId }) => ({
        ...acc,
        [locationId]: {
          fillColor: this.layerDict && locationId in this.layerDict
            ? this.layerDict[locationId].color
            : '#aeaeae',
          fillOpacity: 1,
          /* ...(this.location.locationId === '_WORLD' ||
          this.location.locationId !== locationId
            ? { color: '#444', weight: 0.5, toFront: false }
            : { color: '#111', weight: 2, toFront: true }) */
          color: '#444',
          weight: 0.5
        }
      }), {})
    },
    fnTooltips () {
      if (!this.layerVariableInfo) return () => []
      return d => [{
        name: this.layerVariableInfo.name,
        value: this.layerDict[d.locationId].value,
        color: this.styleMapping[d.locationId].fillColor,
        formatType: this.layerVariableInfo.formatType
      }]
    }
  }

}
</script>

<style>

</style>
