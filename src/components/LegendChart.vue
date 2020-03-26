<template>
  <svg id="legend-chart">
    <defs>
      <linearGradient
        id="legend-gradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop
          v-for="(d, i) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          :key="i"
          :style="`stop-color:${fnInterpolator(i/10)}`"
          :offset="`${d*10}%`"
        />
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
import * as d3nic from 'd3nic'

import { interpolate } from 'd3-interpolate'
import { format } from 'd3-format'
import * as d3scale from 'd3-scale'
import * as d3scaleChromatic from 'd3-scale-chromatic'

export default {
  props: {
    mapVariable: Object,
    domain: Array,
    size: Object
  },
  data () {
    return {
      chart: null,
      byAxisX: null,
      byBars: null
    }
  },
  computed: {
    fnInterpolator () {
      console.log(this.mapVariable)
      return d3scaleChromatic[this.mapVariable.interpolator]
    },
    fnFormat () {
      return format(this.mapVariable.format)
    }
  },
  watch: {
    domain (value) {
      this.chart
        .data([this.domain])
        .draw({ duration: 500 })
    },
    fnInterpolator (value) {
      // recolor but not redraw
    },
    fnContScale (value) {
      return d3scale[this.mapVariable.scaleType]()
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()
    this.chart
      .size({ width: 600, height: 45 })
      .data([this.domain])
      .draw({ duration: 0 })
  },
  methods: {
    createComponents () {
      this.byAxisX = d3nic.byAxisX()
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .ticks(4)
        .fnBefore(s => s.classed('axis', true).select('.domain').style('opacity', 0))
      this.byBars = d3nic.byBars()
        .fnLowValue(d => d[0])
        .fnHighValue(d => d[1])
        .fnFill(d => 'url(#legend-gradient)')
    },
    createChart () {
      this.chart = d3nic.byChart()
        .selector('#legend-chart')
        .padding({ top: 0, right: 30, bottom: 30, left: 30 })
        .components([this.byBars, this.byAxisX])
        .fnContScale(this.fnContScale)
    }
  }
}

</script>
