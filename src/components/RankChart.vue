<template>
  <svg id="rank-chart" />
</template>

<script>
import * as d3nic from 'd3nic'
import { format } from 'd3-format'
import * as d3scale from 'd3-scale'
import * as d3scaleChromatic from 'd3-scale-chromatic'

export default {
  props: {
    mapVariable: Object,
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
    fnInterpolator () {
      return d3scaleChromatic[this.mapVariable.interpolator]
    },
    ticks () {
      return this.mapVariable.ticks
    },
    fnFormat () {
      const f = 'legendFormat' in this.mapVariable
        ? this.mapVariable.legendFormat
        : this.mapVariable.format
      return format(f)
    },
    fnContScale (value) {
      return d3scale[this.mapVariable.scaleType]()
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
      this.byAxisX = d3nic.byAxisX()
        .tickSizeInner(-15)
        .tickSizeOuter(-15)
        .ticks(this.ticks)
        .tickFormat(this.fnFormat)
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
