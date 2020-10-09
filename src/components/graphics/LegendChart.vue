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

export default {
  props: {
    variableInfo: Object,
    domain: Array,
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
    ticks () {
      return 5 // this.variableInfo.ticks
    },
    fnInterpolator () {
      return this.variableInfo.fnColorInterpolator
    }
  },
  watch: {
    domain (value) {
      this.chart.data([this.domain])

      this.update()
      this.drawChart()
    },
    width (value) {
      this.chart.size({ width: value })

      this.drawChart()
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()

    this.compose()
    this.update()

    this.chart.data([this.domain])

    this.drawChart()
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
        .size({ width: this.width, height: 45 })
    },
    compose () {
      this.chart.components([this.byBars, this.byAxisX])
        .fnContScale(this.fnContScale)
    },
    update () {
      this.byAxisX
        .tickFormat(this.variableInfo.fnFormat)
        .ticks(this.ticks) // TODO
      this.chart
        .contScaleType(this.variableInfo.scaleType)
    },
    drawChart () {
      console.log('Drawingf')
      this.$nextTick(() =>
        this.chart.draw({ duration: 500 }))
    }
  }
}

</script>
