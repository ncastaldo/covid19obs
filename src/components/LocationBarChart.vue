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
import { select } from 'd3-selection'
import { mapGetters, mapMutations } from 'vuex'

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
        .filter(d => d.value !== null)
        .sort((a, b) => b.value - a.value)
        .slice(0, 20)
    }
  },
  watch: {
    chartData (value) {
      // using next tick to avoid problems b/w locationInfo and locationMapping
      this.$nextTick(() => {
        console.log(value)
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
    ...mapMutations({
      setLocationFocus: 'location/setLocationFocus'
    }),
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
        .fnOn('mouseover', this.onMouseover)
        .fnOn('mouseout', this.onMouseout)
    },
    createChart () {
      this.chart = byChart()
        .selector('#location-bar-chart')
        .fnKey(d => d.locationId)
        .fnBandValue(d => d.locationId)
        .paddingInner(0.1)
        .paddingOuter(0.1)
        .padding({ left: 50, right: 50, top: 30, bottom: 10 })
        .components([this.byBars, this.byAxisX, this.byAxisY])
    },
    updateProperties () {
      this.byAxisX
        .tickFormat(format(this.locationInfo.format))
        .ticks(this.locationInfo.ticks)
      this.byBars
        .fnLowValue(d => this.locationInfo.fixedDomain
          ? this.locationInfo.fixedDomain[0]
          : this.locationInfo.bounds[0]
        )
      this.chart
        .contBaseDomain(this.locationInfo.baseDomain)
        .contFixedDomain(this.locationInfo.fixedDomain || null)
        .contScaleType(this.locationInfo.scaleType)
    },
    onMouseover (d, i, nodes) {
      select(nodes[i]).style('fill-opacity', 0.7)
      this.setLocationFocus(d)
    },
    onMouseout (d, i, nodes) {
      select(nodes[i]).style('fill-opacity', null)
      this.setLocationFocus(null)
    }
  }
}

</script>
