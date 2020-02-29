<template>
  <v-card
    class="ma-4 ml-2"
  >
    <v-btn-toggle
      v-model="toggleDimensions"
      dense
      multiple
    >
      <v-tooltip
        v-for="(d, i) in dimensions"
        :key="d"
        bottom
      >
        <template
          v-slot:activator="{ on }"
        >
          <v-btn
            icon
            class="mt-2"
            v-on="on"
          >
            <v-icon>
              mdi-circle
            </v-icon>
          </v-btn>
        </template>
        <span>{{ dimensions[i] }}</span>
      </v-tooltip>
    </v-btn-toggle>
    <v-card-actions
      ref="container"
      :style="{ 'background-color': backgroundColor }"
    >
      <svg id="time-chart" />
    </v-card-actions>
  </v-card>
</template>

<script>

import { format } from 'd3-format'
import { schemeReds, schemeBlues, schemeGreens } from 'd3-scale-chromatic'

import * as d3nic from 'd3nic'
import { mapGetters } from 'vuex'

import config from '../../config'

const dimensions = [
  {
    id: 'EPI_confirmed_cum',
    name: 'Confirmed',
    color: schemeReds[9][7]
  },
  {
    id: 'EPI_dead_cum',
    name: 'Dead',
    color: schemeBlues[9][7]
  },
  {
    id: 'EPI_recovered_cum',
    name: 'Recovered',
    color: schemeGreens[9][7]
  }
]

const getBxBars = (fnLowValue, fnHighValue) => d3nic.bxBars()
  .fnLowValue(fnLowValue)
  .fnHighValue(fnHighValue)
  .fnFillOpacity(1)

export default {
  name: 'TimeChart',
  data () {
    return {
      timeseries: null,

      chart: null,
      bxBarsComponents: [],

      chartData: null,

      dimensions,
      toggleDimensions: null,

      backgroundColor: config.colors.background,

      hover: null
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  },
  watch: {
    dimensions (value) {
      this.computeChartData()
    },
    location (value) {
      this.computeChartData()
    },
    chartData (value) {
      this.chart
        .data(value)
        .draw({ duration: 500 })
    }
  },
  created () {
    this.toggleDimensions = this.dimensions.map((_, i) => i)
    this.createComponents()
    this.createChart()
  },
  mounted () {
    const size = {
      width: this.$refs.container.offsetWidth,
      height: 300
    }
    console.log(this.$refs.container.offsetWidth)
    this.chart.size(size)
  },
  methods: {
    computeChartData () {

    },
    createComponents () {
      this.bxBarsComponents = this.dimensions.map((dim, i) =>
        getBxBars(d => 0, d => d[dim])
          .fnFill([schemeReds[9][7], schemeBlues[9][7], schemeGreens[9][7]][i])
      )
    },
    createChart () {
      this.chart = d3nic.bxChart()
        .selector('#time-chart')
        .fnKey(d => d.date)
        .padding({ top: 10 })
        .fnBandValue(d => new Date(d.date).toLocaleDateString())
        .components([
          d3nic.bxAxisX()
            .tickFormat((d, i) => i % 10 === 0 ? d : '')
            .tickSizeInner(0)
            .tickSizeOuter(0)
            .fnBefore(s => s.classed('axis', true)),
          d3nic.bxAxisY()
            .tickFormat(format('~s'))
            .ticks(2)
            .tickSizeOuter(0)
            .fnBefore(s => s.classed('axis', true)),
          ...this.bxBarsComponents
        ])
      this.chart.fnBandScale().paddingInner(0.2)
    }
  }
}
</script>

<style>
.axis {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
}
</style>
