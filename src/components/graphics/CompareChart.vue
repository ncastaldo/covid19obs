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
      <CompareHover
        :hover="hover"
        :fnTooltips="config.fnTooltips || null"
      />
    </Tooltip>
  </div>
</template>

<script>
import CompareHover from './CompareHover'

import {
  byChart,
  byAxisX, byAxisY,
  byMouseBars
} from 'd3nic'

export default {
  components: {
    CompareHover
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
      // recreating the chart, save the size
      const chartSize = this.chart.size()

      this.clear()

      this.createComponents()
      this.createMouseBars() // update them too

      this.update()

      this.chart.data(this.compare)

      this.chart.size(chartSize)

      this.drawChart()
    }
  },
  mounted () {
    this.createAxes()
    this.createMouseBars()
    this.createComponents()

    this.createChart()

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
    },
    update () {
      // this.yAxis.tickFormat(format(this.chartConfig.yFormat))
      this.chart.components([this.yAxis, this.xAxis]
        .concat(this.components)
        .concat([this.mouseBars]))
        .contScaleType('scaleSymlog')
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
        .map(c => c.join().filter(f => f.locationId === d.locationId)
          .dispatch('mouseover', { detail: { d, i, nodes } }))
    },
    onMouseout (d, i, nodes) {
      this.hover = null
      this.components
        .map(c => c.join().filter(f => f.locationId === d.locationId)
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
