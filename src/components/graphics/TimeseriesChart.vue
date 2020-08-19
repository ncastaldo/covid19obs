<template>
  <div
    class="pa-0 ma-0"
  >
    <ChartsContainer
      :charts="[chart]"
      :height="height"
    >
      <svg
        :id="id"
      />
    </ChartsContainer>
    <Tooltip>
      <TimeseriesHover
        :hover="hover"
        :fnTooltips="config.fnTooltips || null"
      />
    </Tooltip>
  </div>
</template>

<script>
import TimeseriesHover from './TimeseriesHover'

import { timeFormat } from 'd3-time-format'

import {
  bxChart,
  bxAxisX, bxAxisY,
  bxMouseBars
} from 'd3nic'

const fnTimeFormat = timeFormat('%b %d, %y')

export default {
  components: {
    TimeseriesHover
  },
  props: {
    id: String,
    height: Number,
    timeseries: Array,
    config: Object
  },
  data () {
    return {
      chart: null,

      xAxis: null,
      yAxis: null,

      mouseBars: null,

      components: [],

      hover: null
    }
  },
  watch: {
    timeseries (value) {
      this.chart.data(value)

      this.drawChart()
    },
    config () {
      // recreating the chart, save the size
      const chartSize = this.chart.size()

      this.clear()

      this.createComponents()
      this.createMouseBars() // update them too

      this.update()

      this.chart.data(this.timeseries)

      this.chart.size(chartSize)

      this.drawChart()
    }
  },
  mounted () {
    this.createAxes()
    this.createMouseBars()
    this.createComponents()

    this.createChart()

    this.compose()
    this.update()

    this.chart.data(this.timeseries)

    this.drawChart()
  },
  methods: {
    createAxes () {
      this.xAxis = bxAxisX()
        .ticks(3)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat(t => fnTimeFormat(new Date(t)))
        .fnBefore(s => s.classed('axis', true))
      this.yAxis = bxAxisY()
        .tickSizeInner(4)
        .tickSizeOuter(0)
        .ticks(2)
        .fnBefore(s => s.classed('axis', true))
    },
    createMouseBars () {
      this.mouseBars = bxMouseBars()
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
      this.chart = bxChart()
        .selector(`#${this.id}`)
        .padding({ left: 50 })
        .fnKey(d => new Date(d.datetime))
        .fnBandValue(d => d.datetime)
    },
    compose () {
      this.chart.components([this.xAxis, this.yAxis]
        .concat(this.components)
        .concat([this.mouseBars]))
    },
    update () {
      // this.yAxis.tickFormat(format(this.chartConfig.yFormat))
      this.yAxis.tickFormatType(this.config.formatType)
      this.chart
        .contScaleType(this.config.scaleType)
        .contBaseDomain(this.config.baseDomain)
        .contFixedDomain(this.config.fixedDomain)
      // .contScaleType(this.chartConfig.scaleType)
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(() =>
        this.chart.draw({ duration: 750 }))
    },
    onMouseover (d, i, nodes) {
      this.hover = d
      this.components
        .map(c => c.join().filter(f => f.datetime === d.datetime)
          .dispatch('mouseover', { detail: { d, i, nodes } }))
    },
    onMouseout (d, i, nodes) {
      this.hover = null
      this.components
        .map(c => c.join().filter(f => f.datetime === d.datetime)
          .dispatch('mouseout', { detail: { d, i, nodes } }))
    },
    clear () {
      this.components.map(c =>
        c.join()
          .transition()
          .duration(500)
          .style('opacity', 0)
          .remove())
      this.mouseBars.join().remove()
    }
  }

}
</script>

<style>

</style>
