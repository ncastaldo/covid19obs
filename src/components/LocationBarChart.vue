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
import { mapGetters } from 'vuex'

export default {
  props: {
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
    ...mapGetters({
      locationInfo: 'location/getLocationInfo',
      locationMapping: 'location/getLocationMapping'
    }),
    chartData () {
      return Object.values(this.locationMapping || {})
        .sort((a, b) => b.value - a.value)
        .slice(0, 30)
    }
  },
  watch: {
    chartData (value) {
      // using next tick to avoid problems b/w locationInfo and locationMapping
      this.$nextTick(() => {
        this.chart.data(value).draw({ duration: 500 })
      })
    },
    locationInfo () { this.updateProperties() }
  },
  mounted () {
    this.createComponents()
    this.createChart()
    this.updateProperties()
  },
  methods: {
    createComponents () {
      this.byAxisX = byAxisX()
        .position('top')
        .tickSizeOuter(0)
      this.byAxisY = byAxisY()
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat(d => d)
        .ticks(250)
      this.byBars = byBars()
        .fnHighValue(d => d.value)
        .fnDefined(d => d.value !== null)
        .fnFill(d => d.color)
    },
    createChart () {
      this.chart = byChart()
        .selector('#location-bar-chart')
        .fnKey(d => d.locationId)
        .fnBandValue(d => d.locationId)
        .padding({ left: 50, right: 50, top: 30, bottom: 10 })
        .components([this.byBars, this.byAxisX, this.byAxisY])
    },
    updateProperties () {
      this.byAxisX
        .tickFormat(format(this.locationInfo.format))
        .ticks(this.locationInfo.ticks)
      this.byBars
        .fnLowValue(d => this.locationInfo.bounds[0])
      this.chart
        .contBaseDomain(this.locationInfo.bounds)
        .contFixedDomain(this.locationInfo.fixedDomain || null)
        .contScaleType(this.locationInfo.scaleType)
    }
  }
}

</script>
