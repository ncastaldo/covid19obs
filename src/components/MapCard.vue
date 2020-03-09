<template>
  <v-card
    v-resize:debounce.250="updateChartSize"
    class="fill-height"
  >
    <v-card-title ref="title">
      <span>{{ location.locationName }}</span>
      <v-spacer />
      <span class="font-italic font-weight-light px-2"><i>COVID19 cases:</i></span>
      <span>{{
        mapConfirmed[location.locationId]
          ? mapConfirmed[location.locationId][dateIndex]
          : '-'
      }}</span>
    </v-card-title>
    <div>
      <span
        v-for="lc in legendColors"
        :key="lc.color"
        style="display: inline-block"
      >
        {{ lc.id }}
        <v-icon
          :color="lc.color"
          small
          class="pb-1 my-1 ml-0 mr-2"
        >
          mdi-square
        </v-icon>
      </span>
    </div>
    <v-card-actions class="pa-0">
      <MapChart
        :data="chartData"
        :size="chartSize"
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

import { format } from 'd3-format'

import { mapGetters } from 'vuex'

import resize from 'vue-resize-directive'

const fnFormat = format('.0s')

const GREY = '#666'
const LEGEND = 6

export default {
  name: 'MapCard',
  directives: {
    resize
  },
  components: {
    MapChart
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
        { color: GREY, label: '0 or No data', id: 0 },
        ...quantize(interpolate, LEGEND)
          .map((c, i) => ({
            color: c,
            min: Math.round(fnScaleLog.invert(i / LEGEND)),
            max: Math.round(fnScaleLog.invert((i + 1) / LEGEND))
          }))
          .map(lc => ({ color: lc.color, label: `${fnFormat(lc.min)} - ${fnFormat(lc.max)}`, id: fnFormat(lc.max) }))
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
              : GREY
            : GREY
        }), {}))
    },
    colorMapping () {
      return this.dateIndex !== null
        ? this.colorMappings[this.dateIndex]
        : null
    },
    chartHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 330
        case 'sm': return 330
        case 'md': return 440
        case 'lg': return 440
        case 'xl': return 440
        default: return 300
      }
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
    updateChartSize (v) {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.chartHeight
      }
    }
  }
}

</script>
