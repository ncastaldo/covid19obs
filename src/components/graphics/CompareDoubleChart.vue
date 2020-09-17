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
  xyAxisX, xyAxisY,
  labelAxisX, labelAxisY,
  xyLinesH, xyLinesV
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

      xLabel: null,
      yLabel: null,

      crossLines: null,

      components: [],

      hover: null
    }
  },
  watch: {
    compareDouble (value) {
      this.chart.data(value)

      this.update()

      this.drawChart()
    },
    config () {
      this.update()
    }
  },
  mounted () {
    this.createAxes()
    this.createCrossLines()
    this.createComponents()

    this.createChart()

    this.compose()
    this.update()

    this.chart.data(this.compareDouble)

    this.drawChart()
  },
  methods: {
    createAxes () {
      this.xAxis = xyAxisX()
        .tickSizeInner(4)
        .tickSizeOuter(0)
        .ticks(2)
        .fnBefore(s => s.classed('axis', true))

      this.yAxis = xyAxisY()
        .ticks(2)
        .tickSizeInner(4)
        .tickSizeOuter(0)
        .tickFormat(t => t)
        .fnBefore(s => s.classed('axis', true))

      this.xLabel = labelAxisX().fnFontSize(20).textPadding({ top: 50 })
      this.yLabel = labelAxisY().fnFontSize(20).textPadding({ right: 60 })
    },
    createCrossLines () {
      this.crossLines = [xyLinesH(), xyLinesV()]
        .map(c => c.fnValue(d => d.value)
          .fnStrokeWidth(d => 1)
          .fnStrokeDasharray(d => [2, 2])
          .fnOpacity(d => 0.1))
    },
    createComponents () {
      this.components = this.config.fnComponents()
    },
    createChart () {
      this.chart = xyChart()
        .selector(`#${this.id}`)
        .padding({ left: 80, right: 50, top: 50, bottom: 80 })
        .fnKey(d => d.locationId)
    },
    compose () {
      this.chart.components([this.yAxis, this.xAxis]
        .concat([this.xLabel, this.yLabel])
        .concat(this.crossLines)
        .concat(this.components))
    },
    update () {
      this.xAxis.tickFormatType(this.config.formatTypes[0])
      this.yAxis.tickFormatType(this.config.formatTypes[1])
      this.xLabel.fnText(this.config.axisLabels[0])
      this.yLabel.fnText(this.config.axisLabels[1])
      this.crossLines.map(c => c.fnDefined(this.config.fnDefined))
      this.chart.doubleContScaleType(this.config.scaleTypes)
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(() =>
        this.chart.draw({ duration: 750 }))
    },
    onMouseover (event, d) {
      this.hover = d
      this.crossLines
        .map(cl => cl.join()
          .filter(f => f.locationId === d.locationId)
          .transition('opacity').duration(50)
          .style('opacity', 1))
    },
    onMouseout (event, d) {
      this.hover = null
      this.crossLines
        .map(cl => cl.join()
          .filter(f => f.locationId === d.locationId)
          .transition('opacity').duration(50)
          .style('opacity', null))
    }
  }

}
</script>

<style>

</style>
