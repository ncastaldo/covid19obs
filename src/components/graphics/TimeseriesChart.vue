<template>
  <div
    class="pa-0 ma-0"
  >
    <Legend
      v-if="legend"
      :fnTooltips="config.fnTooltips || null"
    />
    <ChartsContainer
      :charts="[chart]"
      :height="height"
      @size="hanldeSize"
    >
      <svg
        :id="id"
        @touchstart="onTouchstart"
        @touchend="onTouchend"
        @touchmove="event => {onTouchend(event); onTouchstart(event)}"
      >
        <slot />
      </svg>
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

import { isMobile } from 'mobile-device-detect'

import { select } from 'd3-selection'

import { timeFormat } from 'd3-time-format'

import {
  bxChart,
  bxAxisX, bxAxisY,
  labelAxisY,
  bxMouseBars
} from 'd3nic'

const fnTimeFormat = timeFormat('%d/%m/%y')

export default {
  components: {
    TimeseriesHover
  },
  props: {
    id: String,
    height: Number,
    timeseries: Array,
    config: Object,
    legend: {
      type: Boolean,
      default: true
    },
    getComponents: Function
  },
  data () {
    return {
      chart: null,

      xAxis: null,
      yAxis: null,

      yLabel: null,

      mouseBars: null,

      components: [],

      hover: null
    }
  },
  watch: {
    timeseries (value) {
      this.chart.data(value)

      // auto update
      // this.update()

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

    this.chart.data(this.timeseries)

    this.drawChart()
  },
  methods: {
    createAxes () {
      this.xAxis = bxAxisX()
        .ticks(3)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(10)
        .tickFormat(t => fnTimeFormat(new Date(t)))
        .fnBefore(s => s.classed('axis', true))
      this.yAxis = bxAxisY()
        .tickSizeInner(4)
        .tickSizeOuter(0)
        .ticks(2)
        .fnBefore(s => s.classed('axis', true))

      this.yLabel = labelAxisY().fnFontSize(16).textPadding({ right: 60 })
    },
    createMouseBars () {
      this.mouseBars = bxMouseBars()
        .fnBefore(s => s.classed('mouse-bars', true))

      if (!isMobile) {
        this.mouseBars
          .fnOn('mouseover', this.onMouseover)
          .fnOn('mouseout', this.onMouseout)
      }
    },
    createComponents () {
      this.components = this.getComponents(this.config)
    },
    createChart () {
      this.chart = bxChart()
        .selector(`#${this.id}`)
        .padding({ left: 80, top: 10, bottom: 40, right: 30 })
        .fnKey(d => +d.date)
        .fnBandValue(d => +d.date)
    },
    compose () {
      // nothing

      this.chart.components([this.xAxis, this.yAxis]
        .concat([this.yLabel])
        .concat(this.components)
        .concat([this.mouseBars]))
    },
    update () {
      // this.yAxis.tickFormat(format(this.chartConfig.yFormat))
      this.yAxis.tickFormatType(this.config.formatType)
      this.chart
        .padding(this.config.padding || {}) // updating the padding
        .bandPaddingInner(this.config.bandPaddingInner || 0)
        .contScaleType(this.config.scaleType)
        .contBaseDomain(this.config.baseDomain)
        .contFixedDomain(this.config.fixedDomain)
      // .contScaleType(this.chartConfig.scaleType)
      this.yLabel.fnText(this.config.yLabel || '')
    },
    hanldeSize ({ width }) {
      this.xAxis.ticks(width > 600 ? 8 : width > 300 ? 5 : 3)
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(() =>
        this.chart.draw({ duration: 750 }))
    },
    onMouseover (event, d) {
      this.hover = d
      this.components
        .map(c => c.join().filter(f => f.dateISO === d.dateISO)
          .dispatch('mouseover', event, d))
    },
    onMouseout (event) {
      this.components
        .map(c => c.join().filter(f => f.dateISO === this.hover.dateISO)
          .dispatch('mouseout', event, this.hover))
      this.hover = null
    },
    onTouchstart (event) {
      event.preventDefault()
      const point = [event.touches[0].clientX, event.touches[0].clientY]
      const d = select(document.elementFromPoint(...point)).datum()
      if (d && typeof d === 'object' && 'dateISO' in d && d !== this.hover) {
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
