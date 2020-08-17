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
      <CompareDoubleHover
        :hover="hover"
        :fnTooltips="config.fnTooltips || null"
      />
    </Tooltip>
  </div>
</template>

<script>
import CompareDoubleHover from './CompareDoubleHover'

import {
  xyChart,
  xyAxisX, xyAxisY
} from 'd3nic'

export default {
  components: {
    CompareDoubleHover
  },
  props: {
    id: String,
    height: Number,
    compareDouble: Array,
    config: Object
  },
  data () {
    return {
      chart: null,

      yAxis: null,
      xAxis: null,

      components: [],

      hover: null
    }
  },
  watch: {
    compareDouble (value) {
      this.chart.data(value)

      this.drawChart()
    },
    config () {
      this.update()
    }
  },
  mounted () {
    this.createAxes()
    this.createComponents()

    this.createChart()

    this.compose()
    this.update()

    this.chart.data(this.compareDouble)

    this.drawChart()
  },
  methods: {
    createAxes () {
      this.yAxis = xyAxisY()
        .ticks(5)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat(t => t)
        .fnBefore(s => s.classed('axis', true))
      this.xAxis = xyAxisX()
        .tickSizeInner(4)
        .tickSizeOuter(0)
        .ticks(5)
        .fnBefore(s => s.classed('axis', true))
    },
    createComponents () {
      this.components = this.config.fnComponents()
    },
    createChart () {
      this.chart = xyChart()
        .selector(`#${this.id}`)
        .fnKey(d => d.locationId)
    },
    compose () {
      // this.yAxis.tickFormat(format(this.chartConfig.yFormat))
      this.chart.components([this.yAxis, this.xAxis]
        .concat(this.components))
      // .contScaleType(this.chartConfig.scaleType)
    },
    update () {
      // this.yAxis.tickFormat(format(this.config.yFormat))
      // this.chart.doubleContScaleType(this.config.scaleType)
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(() =>
        this.chart.draw({ duration: 750 }))
    },
    onMouseover (d, i, nodes) {
      this.hover = d
    },
    onMouseout (d, i, nodes) {
      this.hover = null
    }
  }

}
</script>

<style>

</style>
