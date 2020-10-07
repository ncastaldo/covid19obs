<template>
  <div
    class="pa-0 ma-0"
  >
    <ChartsContainer
      :charts="[chart]"
      :height="height"

      :minWidth="400"
    >
      <svg
        :id="id"
      />
    </ChartsContainer>
    <Tooltip>
      <CompareSingleHover
        :hover="hover"
        :fnTooltips="config.fnTooltips || null"
      />
    </Tooltip>
  </div>
</template>

<script>
import CompareSingleHover from './CompareSingleHover'

import {
  byChart,
  byAxisX, byAxisY,
  byMouseBars
} from 'd3nic'

export default {
  components: {
    CompareSingleHover
  },
  props: {
    id: String,
    height: Number,
    compare: Array,
    config: Object
  },
  data () {
    return {
      chart: null,

      padding: { left: 200 },

      yAxis: null,
      xAxis: null,

      mouseBars: null,

      components: [],

      hover: null
    }
  },
  watch: {
    compare (value) {
      this.chart.data(value)

      this.drawChart()
    },
    config () {
      this.update()
    }
  },
  mounted () {
    this.createAxes()
    this.createMouseBars()
    this.createComponents()

    this.createChart()

    this.compose()
    this.update()

    this.chart.data(this.compare)

    this.drawChart()
  },
  methods: {
    createAxes () {
      this.yAxis = byAxisY()
        .ticks(100)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat(t => t)
        .fnBefore(s => s.classed('axis', true))
      this.xAxis = byAxisX()
        .position('top')
        .tickSizeInner(4)
        .tickSizeOuter(0)
        .ticks(2)
        .fnBefore(s => s.classed('axis', true))
    },
    createMouseBars () {
      this.mouseBars = byMouseBars()
        .fnBefore(s => s.classed('mouse-bars', true))

      if (!this.$isMobile()) {
        this.mouseBars
          .fnOn('mouseover', this.onMouseover)
          .fnOn('mouseout', this.$isMobile() || this.onMouseout)
      }
    },
    createComponents () {
      this.components = this.config.fnComponents()
    },
    createChart () {
      this.chart = byChart()
        .selector(`#${this.id}`)
        .padding(this.padding)
        .fnKey(d => d.locationId)
        .fnBandValue(d => d.locationName)
        .bandPaddingInner(0.1)
        .bandPaddingOuter(0.1)
    },
    compose () {
      // this.yAxis.tickFormat(format(this.chartConfig.yFormat))
      this.chart.components([this.yAxis, this.xAxis]
        .concat(this.components)
        .concat([this.mouseBars]))
      // .contScaleType(this.chartConfig.scaleType)
    },
    update () {
      this.xAxis.tickFormatType(this.config.formatType)
      this.chart
        .contScaleType(this.config.scaleType)
        .contBaseDomain(this.config.baseDomain)
        .contFixedDomain(this.config.fixedDomain)
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(() =>
        this.chart.draw({ duration: 750 }))
    },
    onMouseover (event, d) {
      this.hover = d
      this.components
        .map(c => c.join().filter(f => f.locationId === d.locationId)
          .dispatch('mouseover', event, d))
    },
    onMouseout (event, d) {
      this.hover = null
      this.components
        .map(c => c.join().filter(f => f.locationId === d.locationId)
          .dispatch('mouseout', event, d))
    }
  }

}
</script>

<style>

</style>
