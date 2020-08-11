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
  </div>
</template>

<script>

import {
  bxChart,
  bxAxisX, bxAxisY,
  bxMouseBars
} from 'd3nic'

export default {
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

      components: []
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
        .tickFormat(t => t)
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
        .fnKey(d => new Date(d.datetime))
        .fnBandValue(d => d.datetime)
    },
    update () {
      // this.yAxis.tickFormat(format(this.chartConfig.yFormat))
      this.chart.components([this.xAxis, this.yAxis]
        .concat(this.components)
        .concat([this.mouseBars]))
      // .contScaleType(this.chartConfig.scaleType)
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(() =>
        this.chart.draw({ duration: 750 }))
    },
    clear () {
      this.components.map(c =>
        c.join()
          .transition()
          .duration(500)
          .style('opacity', 0)
          .remove())
    }
  }

}
</script>

<style>

</style>
