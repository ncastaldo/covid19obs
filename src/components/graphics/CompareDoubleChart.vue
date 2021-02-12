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
        @touchstart="onTouchstart"
        @touchend="onTouchend"
        @touchmove="event => {onTouchend(event); onTouchstart(event)}"
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

import { select } from 'd3-selection'

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
    compareData: Array,
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
    compareData (value) {
      this.chart.data(value)

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

    this.chart.data(this.compareData)

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
      this.yLabel = labelAxisY().fnFontSize(20).textPadding({ right: 70 })
    },
    createCrossLines () {
      this.crossLines = [xyLinesH(), xyLinesV()]
        .map(c => c.fnValue(d => d.value)
          .fnStroke('#000')
          .fnStrokeWidth(1)
          .fnStrokeDasharray([2, 2])
          .fnOpacity(0))
    },
    createComponents () {
      this.components = this.config.fnComponents()
    },
    createChart () {
      this.chart = xyChart()
        .selector(`#${this.id}`)
        .padding({ left: 90, right: 50, top: 50, bottom: 80 })
        .fnKey(d => d.locationId)
    },
    compose () {
      this.chart.components([this.yAxis, this.xAxis]
        .concat([this.xLabel, this.yLabel])
        .concat(this.crossLines)
        .concat(this.components))
    },
    update () {
      this.chart.padding(this.config.padding || {}) // updating the padding
      this.xAxis.tickFormatType(this.config.formatTypes[0])
      this.yAxis.tickFormatType(this.config.formatTypes[1])
      this.xLabel.fnText(this.config.xLabel)
      this.yLabel.fnText(this.config.yLabel)
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
    onMouseout (event) {
      this.crossLines
        .map(cl => cl.join()
          .filter(f => this.hover && f.locationId === this.hover.locationId)
          .transition('opacity').duration(50)
          .style('opacity', null))
      this.hover = null
    },
    onTouchstart (event) {
      event.preventDefault()
      const point = [event.touches[0].clientX, event.touches[0].clientY]
      const d = select(document.elementFromPoint(...point)).datum()
      if (d && typeof d === 'object' && 'locationId' in d && d !== this.hover) {
        this.onMouseover(event, d)
      }
    },
    onTouchend (event) {
      this.onMouseout(event)
    }
  }

}
</script>

<style>

</style>
