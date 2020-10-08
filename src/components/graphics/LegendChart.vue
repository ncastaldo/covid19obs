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
import { byAxisX, byBars, byChart } from 'd3nic'
import { format } from 'd3-format'
import * as scales from 'd3-scale'

import { getColorScale } from '../../plugins/util'

export default {
  props: {
    variableInfo: Object,
    domain: Array,
    size: Object,
    width: Number
  },
  data () {
    return {
      chart: null,
      byAxisX: null,
      byBars: null
    }
  },
  computed: {
    fnColorScale () {
      return getColorScale(this.variableInfo)
    },
    ticks () {
      return 5 // this.mapVariable.ticks
    },
    fnFormat () {
      return format(this.variableInfo.formatType)
    },
    fnContScale (value) {
      return scales[this.variableInfo.scaleType]()
    }
  },
  watch: {
    domain (value) {
      this.byAxisX.tickFormat(this.fnFormat).ticks(this.ticks)
      this.chart
        .fnContScale(this.fnContScale)
        .data([this.domain])
        .draw({ duration: 0 })
    },
    width (value) {
      this.chart.size({ width: value }).draw()
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()

    this.$nextTick(() => {
      this.chart
        .size({ width: this.width, height: 45 })
        .data([this.domain])
        .draw({ duration: 0 })
    })
  },
  methods: {
    createComponents () {
      this.byAxisX = byAxisX()
        .tickSizeInner(-15)
        .tickSizeOuter(-15)
        .ticks(this.ticks)
        .tickFormat(this.fnFormat)
        .fnBefore(s => s.classed('axis', true).select('.domain').style('opacity', 0))
      this.byBars = byBars()
        .fnLowValue(d => d[0])
        .fnHighValue(d => d[1])
        .fnFill(d => 'url(#legend-gradient)')
    },
    createChart () {
      this.chart = byChart()
        .selector('#legend-chart')
        .padding({ top: 0, right: 30, bottom: 30, left: 30 })
        .components([this.byBars, this.byAxisX])
        .fnContScale(this.fnContScale)
    }
  }
}

</script>
