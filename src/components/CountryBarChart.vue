<template>
  <ChartsContainer
    :charts="[chart]"
    :ratio="1/4"
  >
    <svg id="country-bar-chart" />
  </ChartsContainer>
</template>

<script>
import { byChart, byAxisX, byAxisY, byBars } from 'd3nic'
import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

export default {
  props: {
    countryDict: {
      type: Object,
      default: () => {}
    },
    countryInfo: {
      type: Object,
      default: () => {}
    }
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
      return Object.values(this.countryInfo || {})
        .sort((a, b) => b.value - a.value)
        .slice(0, 20)
    },
    fnContScale (value) {
      return d3Scale[this.countryDict.scaleType]()
    }
  },
  watch: {
    chartData (value) {
      this.chart.data(value).draw({ duration: 500 })
    },
    countryDict (mDict) {
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
      this.byAxisY = byAxisY().tickFormat(d => d).ticks(250)
      this.byBars = byBars()
        .fnLowValue(d => 0)
        .fnHighValue(d => d.value)
        .fnFill(d => d.color)
    },
    createChart () {
      this.chart = byChart()
        .selector('#country-bar-chart')
        .fnKey(d => d.locationId)
        .fnBandValue(d => d.locationId)
        .contScaleType(this.countryDict.scaleType)
        .padding({ left: 50, right: 50 })
        .components([this.byBars, this.byAxisX, this.byAxisY])
    }
  }
}

</script>
