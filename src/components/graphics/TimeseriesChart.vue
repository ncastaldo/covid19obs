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
      this.createChart()

      this.chart
        .data(this.timeseries)
        .size(chartSize)

      this.drawChart()
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()

    this.chart.data(this.timeseries)

    this.drawChart()
  },
  methods: {
    createComponents () {
      this.createAxes()
      this.createMouseBars()

      this.components = [this.xAxis, this.yAxis]
        .concat(this.config.fnComponents())
        .concat([this.mouseBars])
    },
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
      // .tickFormat(format(this.chartConfig.yFormat))
        .fnBefore(s => s.classed('axis', true))
    },
    createMouseBars () {
      this.mouseBars = bxMouseBars()

      if (!this.$isMobile()) {
        this.mouseBars
          .fnOn('mouseover', this.onMouseover)
          .fnOn('mouseout', this.$isMobile() || this.onMouseout)
      }
    },
    createChart () {
      this.chart = bxChart()
        .selector(`#${this.id}`)
        .fnKey(d => new Date(d.datetime))
        .fnBandValue(d => d.datetime)
        // .contScaleType(this.chartConfig.scaleType)
        .components(this.components)
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(function () {
        this.chart.draw({ duration: 500 })
      })
    },
    clear () {
      this.chart.group().remove()
    }
  }

}
</script>

<style>

</style>
