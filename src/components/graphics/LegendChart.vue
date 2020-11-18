<template>
  <svg id="legend-chart">
    <Gradient
      id="legend-chart-gradient"
      :fnInterpolator="fnInterpolator"
    />
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

    console.log(this.domain)

    this.chart.data([this.domain])

    this.drawChart()
  },
  methods: {
    createComponents () {
      this.byAxisX = byAxisX()
        .tickSizeInner(-15)
        .tickSizeOuter(-15)
        .fnBefore(s => s.classed('axis', true).select('.domain').style('opacity', 0))
      this.byBars = byBars()
        .fnLowValue(d => d[0])
        .fnHighValue(d => d[1])
        .fnFill('url(#legend-chart-gradient)')
    },
    createChart () {
      this.chart = byChart()
        .selector('#legend-chart')
        .padding({ top: 7, right: 30, bottom: 23, left: 30 })
        .size({ width: this.width, height: 45 })
    },
    compose () {
      this.chart.components([this.byBars, this.byAxisX])
    },
    update () {
      this.byAxisX
        .tickFormat(this.variableInfo.fnFormat || '~s')
        .ticks(this.variableInfo.legendTicks || 4) // TODO
      this.chart
        .contScaleType(this.variableInfo.scaleType || 'scaleLinear')
    },
    drawChart () {
      this.$nextTick(() =>
        this.chart.draw({ duration: 500 }))
    }
  }
}

</script>

<style scoped>

stop {
  transition: all .5s;
}

</style>
