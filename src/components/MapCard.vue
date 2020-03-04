<template>
  <v-card class="fill-height">
    <v-card-title ref="title">
      {{ location !== null ? location.locationName : '- - -' }}
    </v-card-title>
    <v-card-subtitle ref="subtitle">
      {{ 'sub' }}
    </v-card-subtitle>
    <v-card-actions class="pa-0">
      <MapChart
        :size="chartSize"
        :data="chartData"
        :colorMapping="colorMapping"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import MapChart from './MapChart'

import { scaleSequentialLog } from 'd3-scale'
import { interpolateInferno } from 'd3-scale-chromatic'

import { mapGetters } from 'vuex'

export default {
  name: 'MapCard',
  components: {
    MapChart
  },
  props: {
    size: Object
  },
  data () {
    return {
      chartSize: null
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation',
      locations: 'getLocations',
      dateIndex: 'getDateIndex'
    }),
    epiConfirmedMax () {
      return this.locations
        .filter(l => l.timeseries)
        .map(l => +l.timeseries[this.dateIndex].EPI_confirmed_cum)
        .reduce((max, value) => Math.max(max, value), 1)
    },
    chartData () { // computed just once
      return this.locations.map(l => ({
        locationId: l.locationId,
        locationName: l.locationName,
        geometry: l.geometry
      }))
    },
    colorMapping () {
      const fnColor = scaleSequentialLog()
        .domain([1, this.epiConfirmedMax])
        .interpolator(interpolateInferno)

      return this.locations.reduce((mapping, l) => ({
        ...mapping,
        [l.locationId]: l.timeseries && +l.timeseries[this.dateIndex].EPI_confirmed_cum > 0
          ? fnColor(+l.timeseries[this.dateIndex].EPI_confirmed_cum)
          : 'grey'
      }), {})
    }
  },
  mounted () {
    this.updateChartSize() // since refs are not reactive
  },
  methods: {
    updateChartSize () {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight -
          0// (this.$refs.title.clientHeight + this.$refs.subtitle.clientHeight)
      } // height computed without considering the others
    }
  }
}

</script>
