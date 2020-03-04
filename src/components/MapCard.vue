<template>
  <v-card class="fill-height">
    <v-card-title ref="title">
      <span><i>Epidemic map</i></span>
      <v-spacer />
      <span>{{ location !== null ? location.locationName : '- - -' }}</span>
    </v-card-title>
    <v-tooltip
      v-for="lc in legendColors"
      :key="lc.color"
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-icon
          :color="lc.color"
          small
          class="pb-2"
          v-on="on"
        >
          mdi-square
        </v-icon>
      </template>
      <span>{{ lc.label }}</span>
    </v-tooltip>
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

import { scaleSequential, scaleLog } from 'd3-scale'
import { quantize } from 'd3-interpolate'
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
    fnColor () {
      const fnScaleLog = scaleLog().domain([1, this.epiConfirmedMax])
      return scaleSequential(d => interpolateInferno(fnScaleLog(d)))
    },
    legendColors () {
      const fnScaleLog = scaleLog().domain([1, this.epiConfirmedMax])
      return [
        { color: '#444', label: 'No data' },
        ...quantize(interpolateInferno, 10)
          .map((c, i) => ({
            color: c,
            min: i > 0 ? Math.round(fnScaleLog.invert(i / 8)) : 0,
            max: Math.round(fnScaleLog.invert((i + 1) / 8))
          }))
          .map(lc => ({ color: lc.color, label: `${lc.min} - ${lc.max}` }))
      ]
    },
    colorMapping () {
      return this.locations.reduce((mapping, l) => ({
        ...mapping,
        [l.locationId]: l.timeseries
          ? +l.timeseries[this.dateIndex].EPI_confirmed_cum > 0
            ? this.fnColor(+l.timeseries[this.dateIndex].EPI_confirmed_cum)
            : '#000'
          : '#444'
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
