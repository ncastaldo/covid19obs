<template>
  <ChartsContainer
    :charts="[chart]"
    :height="height"

    @size="hanldeSize"
  >
    <svg
      :id="id"
      class="date-brush-chart"
    />
  </ChartsContainer>
</template>

<script>
import { timeFormat } from 'd3-time-format'

import { isMobile } from 'mobile-device-detect'

import {
  bxChart,
  bxAxisX,
  bxAxisY,
  bxBars,
  bxBrush,
  labelAxisY
} from 'd3nic'

const fnDateFormat = timeFormat('%d/%m/%y')

// function to check if inside
const isInside = (bandDomain, d) =>
  bandDomain && d.dateId >= bandDomain[0] && d.dateId <= bandDomain[1]

export default {
  props: {
    id: String,
    height: {
      type: Number,
      default: 300
    },
    bandDomain: Array,
    dateData: Array,
    config: Object
  },
  data () {
    return {
      chart: null,

      xAxis: null,
      yAxis: null,

      bars: null,
      brush: null,

      yLabel: null
    }
  },
  computed: {
    fullSelection () {
      return !this.dateData.length || (this.bandDomain[0] <= this.dateData[0].dateId &&
        this.bandDomain[1] >= this.dateData[this.dateData.length - 1].dateId)
    }
  },
  watch: {
    config () {
      // should update also min and max, for the moment ok this way

      // do not fill bars, wait for change in data
      // this.fillBars(this.bandDomain)
    },
    dateData () {
      this.chart.data(this.dateData)

      this.drawChart()
        .then(() => this.fillBars(this.bandDomain))
        .catch(() => {})
    },
    bandDomain (bandDomain) {
      if (!isMobile) {
        this.brush.bandDomain(this.fullSelection ? null : bandDomain).snap()
      }

      this.fillBars(bandDomain)
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.compose()
    this.update()

    this.chart.data(this.dateData)

    if (!isMobile) {
      this.fullSelection || this.brush.bandDomain(this.bandDomain)
    }

    this.drawChart()
      .then(() => {
        this.fillBars(this.bandDomain)
      })
      .catch(() => {})
  },
  methods: {
    createComponents () {
      this.xAxis = bxAxisX()
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat(t => fnDateFormat(new Date(t)))
        .fnBefore(s =>
          s.classed('axis', true)
            .select('.domain')
            .style('opacity', 0))

      this.yAxis = bxAxisY()
        .tickSizeInner(4)
        .tickSizeOuter(0)
        .ticks(4)
        .fnBefore(s => s.classed('axis', true))
      this.bars = bxBars()
        .fnLowValue(d => 0)
        .fnHighValue(d => d.value)// d.value)
        .fnFill(d => '#aeaeae')
        // .fnBefore(s => s.classed('date-selector__bars', true))
      this.brush = bxBrush()
        .bandMinStep(this.config.bandMinStep)
        .bandMaxStep(this.config.bandMaxStep)
        .fnOn('brushBandDomain', (event, bd) => {
          this.fillBars(bd)
          this.$emit('brushBandDomain', bd)
        })
        .fnOn('endBandDomain', (event, bd) => {
          this.$emit('endBandDomain', bd)
          if (!bd) { this.fillBars(this.bandDomain) }
        })

      this.yLabel = labelAxisY().fnFontSize(16).textPadding({ right: 40 })
    },
    createChart () {
      this.chart = bxChart()
        .selector(`#${this.id}`)
        .padding({ left: 50, top: 15, bottom: 40, right: 30 })
        .fnKey(d => d.dateId)
        .fnBandValue(d => d.dateId)
    },
    compose () {
      this.chart.components([this.xAxis, this.yAxis]
        .concat([this.bars])
        .concat(!isMobile ? [this.brush] : [])
        .concat([this.yLabel]))
    },
    update () {
      this.yAxis.tickFormatType(this.config.formatType || '~s')
      this.yLabel.fnText(this.config.yLabel || '')
      this.chart
        .padding(this.config.padding || {}) // updating the padding
        .contFixedDomain(this.config.fixedDomain)
    },
    fillBars (bandDomain) {
      // join on bars
      this.bars.join()
        .style('fill', d => isInside(bandDomain, d)
          ? this.config.color : null)
    },
    hanldeSize ({ width }) {
      this.xAxis.ticks(width > 600 ? 8 : width > 300 ? 5 : 3)
    },
    drawChart () {
      // wait for ChartsContainer
      return this.$nextTick()
        .then(() => this.chart.draw({ duration: 0 })
          .transition().end())
    }
  }

}
</script>

<style>

.date-brush-chart rect.selection {
  fill-opacity: 0.3;
  fill: rgb(222, 222, 222);
  stroke: #444;
  stroke-width:1;
}

.date-brush-chart rect.handle {
  fill-opacity: 0;
  fill: rgb(31, 121, 179)
}

.date-brush-chart rect{
  transition: fill .0s ;
}

</style>
