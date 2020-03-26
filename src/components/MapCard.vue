<template>
  <v-card
    v-resize:debounce.250="updateChartSize"
    class="fill-height"
  >
    <div class="mx-3 px-2">
      <v-row align="center">
        <v-col class="flex-grow-1 pt-0">
          <v-select
            v-model="mapVariableId"
            :items="mapDicts"
            item-text="name"
            item-value="id"
            hide-details
          />
        </v-col>
        <v-col class="flex-grow-0 mt-3">
          <div
            class="title"
            style="min-width: 80px"
          >
            {{ mapVariableCurrentValue }}
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="py-1 mx-3">
      <DateSlider />
    </div>
    <div class="py-1">
      <v-card-actions class="pa-0">
        <LegendChart
          :mapVariable="mapVariable"
          :domain="mapVariableDomains[dateIndex]"
        />
      </v-card-actions>

      <!--span
        v-for="lc in legendColors"
        :key="lc.color"
        style="display: inline-block"
      >
        <v-icon
          :color="lc.color"
          small
          class="pb-1 my-1 ml-2 mr-0"
        >
          mdi-square
        </v-icon>
        {{ lc.label }}
      </span-->
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
import DateSlider from './DateSlider'

import LegendChart from './LegendChart'
import MapChart from './MapChart'

import * as d3scale from 'd3-scale'
import * as d3scaleChromatic from 'd3-scale-chromatic'

import { format } from 'd3-format'
import { mapGetters } from 'vuex'

import resize from 'vue-resize-directive'

import mapDicts from '../assets/mapDicts'

const GREY = '#666'
// const LEGEND = 4

export default {
  name: 'MapCard',
  directives: {
    resize
  },
  components: {
    LegendChart,
    MapChart,
    DateSlider
  },
  data () {
    return {
      chartSize: null,

      mapDicts,

      mapVariableId: mapDicts[0].id, // just initial
      mapVariable: mapDicts[0], // just initial

      mapData: {}
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation',
      locations: 'getLocations',
      dates: 'getDates',
      dateIndex: 'getDateIndex'
    }),
    fnFormat () {
      return format(this.mapVariable.format)
    },
    mapVariableCurrentValue () {
      return this.mapData[this.location.locationId] &&
        this.mapData[this.location.locationId][this.dateIndex] !== null
        ? this.fnFormat(this.mapData[this.location.locationId][this.dateIndex])
        : '-'
    },
    mapVariableDomains () {
      const variableDomains = []
      for (const i in this.dates) {
        const domain = 'fixedDomain' in this.mapVariable
          ? [...this.mapVariable.fixedDomain]
          : Object.keys(this.mapData)
            .filter(k => k !== '_WORLD')
            .map(k => this.mapData[k])
            .filter(v => Array.isArray(v))
            .map(v => v[i])
            .reduce((domain, cur) => [
              Math.min(domain[0], cur),
              Math.max(domain[1], cur)
            ], [...this.mapVariable.baseDomain]) // spread otherwise unchanged
        variableDomains.push(domain)
      }
      return variableDomains
    },
    chartData () { // computed just once
      return this.locations.map(l => ({
        locationId: l.locationId,
        locationName: l.locationName,
        geometry: l.geometry
      }))
    },
    fnsScale () {
      return this.mapVariableDomains
        .map(domain => d3scale[this.mapVariable.scaleType]().domain(domain))
    },
    interpolator () {
      return d3scaleChromatic[this.mapVariable.interpolator]
    },
    /*
    legendsColors () {
      return this.fnsScale.map(fnScale => [
        { color: GREY, label: 'No data' },
        ...[...Array(LEGEND + 1).keys()]
          .map((_, i) => i / LEGEND)
          .map((d, i, array) => {
            const a = i === 0 || (i === array.length - 1 && this.mapVariable.lastPlus) ? '' : '≤'
            const b = this.fnFormat(fnScale.invert(d))
            const c = i === array.length - 1 && this.mapVariable.lastPlus ? '+' : ''
            return {
              color: interpolate(d),
              label: `${a}${b}${c}`
            }
          })
      ])
    },
    legendColors () {
      return this.dateIndex !== null
        ? this.legendsColors[this.dateIndex]
        : []
    }, */
    fnsColor () {
      return this.mapVariableDomains.map(domain =>
        d3scale[this.mapVariable.scaleColorType]()
          .domain(domain)
          .interpolator(this.interpolator)
      )
    },
    colorMappings () {
      return this.fnsColor.map((fnColor, i) =>
        this.locations.reduce((mapping, l) => ({
          ...mapping,
          [l.locationId]: Array.isArray(this.mapData[l.locationId])
            ? fnColor(this.mapData[l.locationId][i])
            : GREY
        }), {}))
    },
    colorMapping () {
      return this.dateIndex !== null
        ? this.colorMappings[this.dateIndex]
        : null
    }
  },
  watch: {
    mapVariableId (value) {
      this.fetchData()
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
      console.log(this.mapVariableId)
      fetch(`/assets/map_dicts/${this.mapVariableId}.json`)
        .then(res => res.json())
        .then(data => {
          this.mapData = data
          this.mapVariable = this.mapDicts
            .find(md => md.id === this.mapVariableId)
        })
    },
    getChartHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 330
        case 'sm': return 330
        case 'md': return 450
        case 'lg': return 450
        case 'xl': return 450
        default: return 300
      }
    },
    updateChartSize (v) {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.getChartHeight()
      }
    }
  }
}

</script>
