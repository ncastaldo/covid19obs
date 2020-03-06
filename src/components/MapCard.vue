<template>
  <v-card class="fill-height">
    <v-card-title ref="title">
      <span>{{ location ? location.locationName : '- - -' }}</span>
      <v-spacer />
      <span class="px-2"><i>cases:</i></span>
      <span>{{ location && location.timeseries ? location.timeseries[dateIndex].EPI_confirmed_cum : '-' }}</span>
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
import { interpolateYlGnBu as interpolate } from 'd3-scale-chromatic'

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
      dates: 'getDates',
      dateIndex: 'getDateIndex'
    }),
    epiConfirmedMaxs () {
      return this.dates.map((d, i) => this.locations
        .filter(l => l.timeseries)
        .map(l => +l.timeseries[i].EPI_confirmed_cum)
        .reduce((max, value) => Math.max(max, value), 1)
      )
    },
    chartData () { // computed just once
      return this.locations.map(l => ({
        locationId: l.locationId,
        locationName: l.locationName,
        geometry: l.geometry
      }))
    },
    fnsScaleLog () {
      return this.epiConfirmedMaxs.map(epiConfirmedMax => scaleLog().domain([1, epiConfirmedMax]))
    },
    legendsColors () {
      return this.fnsScaleLog.map(fnScaleLog => [
        { color: '#444', label: 'No data' },
        ...quantize(interpolate, 10)
          .map((c, i) => ({
            color: c,
            min: i > 0 ? Math.round(fnScaleLog.invert(i / 8)) : 0,
            max: Math.round(fnScaleLog.invert((i + 1) / 8))
          }))
          .map(lc => ({ color: lc.color, label: `${lc.min} - ${lc.max}` }))
      ])
    },
    legendColors () {
      return this.dateIndex !== null
        ? this.legendsColors[this.dateIndex]
        : []
    },
    fnsColor () {
      return this.fnsScaleLog.map(fnScaleLog => scaleSequential(d => interpolate(fnScaleLog(d))))
    },
    colorMappings () {
      return this.fnsColor.map((fnColor, i) =>
        this.locations.reduce((mapping, l) => ({
          ...mapping,
          [l.locationId]: l.timeseries
            ? +l.timeseries[i].EPI_confirmed_cum > 0
              ? fnColor(+l.timeseries[i].EPI_confirmed_cum)
              : interpolate(0)
            : '#444'
        }), {}))
    },
    colorMapping () {
      return this.dateIndex !== null
        ? this.colorMappings[this.dateIndex]
        : null
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
