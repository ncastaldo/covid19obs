<template>
  <v-card class="fill-height">
    <v-card-title ref="title">
      <span>{{ location.locationName }}</span>
      <v-spacer />
      <span class="px-2"><i>cases:</i></span>
      <span>{{
        mapConfirmed[location.locationId]
          ? mapConfirmed[location.locationId][dateIndex]
          : '-'
      }}</span>
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

const GREY = '#666'

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
      chartSize: null,
      mapConfirmed: {}
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
      return Object.values(this.mapConfirmed)
        .filter(v => Array.isArray(v))
        .reduce((final, array) =>
          final.map((f, i) => f < array[i] ? array[i] : f)
        , this.dates.map(() => 0))
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
        { color: GREY, label: 'No data' },
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
          [l.locationId]: Array.isArray(this.mapConfirmed[l.locationId])
            ? this.mapConfirmed[l.locationId][i] > 0
              ? fnColor(this.mapConfirmed[l.locationId][i])
              : interpolate(0)
            : GREY
        }), {}))
    },
    colorMapping () {
      return this.dateIndex !== null
        ? this.colorMappings[this.dateIndex]
        : null
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    this.updateChartSize() // since refs are not reactive
  },
  methods: {
    fetchData () {
      fetch('/assets/dict_confirmed.json')
        .then(res => res.json())
        .then(data => { this.mapConfirmed = data })
    },
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
