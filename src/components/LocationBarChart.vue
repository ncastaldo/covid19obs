<template>
  <ChartsContainer
    :charts="[chart]"
    :height="height"
  >
    <svg id="location-bar-chart" />
  </ChartsContainer>
</template>

<script>
import { byChart, byAxisX, byAxisY, byBars } from 'd3nic'
import { format } from 'd3-format'
import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

export default {
  props: {
    locationDict: Object,
    locationInfo: Object,
    height: Number
  },
  data () {
    return {
      chart: null,
      byAxisX: null,
      byBars: null
    }
  },
  computed: {
    chartData () {
      return Object.values(this.locationInfo || {})
        .sort((a, b) => b.value - a.value)
        .slice(0, 30)
    },
    fnContScale (value) {
      return d3Scale[this.locationDict.scaleType]()
    }
  },
  watch: {
    chartData (value) {
      this.chart.data(value).draw({ duration: 500 })
    },
    locationDict (mDict) {
      this.fnContScale = d3Scale[mDict.scaleType]()
        .interpolator(d3ScaleChromatic[mDict.interpolator])
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()
  },
  methods: {
    createComponents () {
      this.byAxisX = byAxisX()
        .position('top')
        .tickFormat(format(this.locationDict.format))
        .ticks(this.locationDict.ticks)
      this.byAxisY = byAxisY().tickFormat(d => d).ticks(250)
      this.byBars = byBars()
        .fnLowValue(d => this.locationDict.bounds[0])
        .fnHighValue(d => d.value)
        .fnDefined(d => d.value !== null)
        .fnFill(d => d.color)
    },
    createChart () {
      this.chart = byChart()
        .selector('#location-bar-chart')
        .fnKey(d => d.locationId)
        .fnBandValue(d => d.locationId)
        .contScaleType(this.locationDict.scaleType)
        .padding({ left: 50, right: 50, top: 30, bottom: 10 })
        .components([this.byBars, this.byAxisX, this.byAxisY])
    }
  }
}

</script>
