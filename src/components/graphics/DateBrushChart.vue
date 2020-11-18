<template>
  <ChartsContainer
    :charts="[chart]"
    :height="height"
  >
    <svg
      :id="id"
      class="date-brush-chart"
    />
  </ChartsContainer>
</template>

<script>
import { timeFormat } from 'd3-time-format'

import {
  bxChart,
  bxAxisX,
  bxAxisY,
  bxBars,
  bxBrush
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
      brush: null
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
      const full = this.bandDomain[0] <= this.dateData[0].dateId &&
        this.bandDomain[1] >= this.dateData[this.dateData.length - 1].dateId

      if (!full) {
        this.brush.bandDomain(bandDomain).snap()
      } else {
        this.brush.bandDomain(null).snap()
      }

      this.fillBars(bandDomain)
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.update()

    this.chart.data(this.dateData)
    // this.brush.bandDomain(this.bandDomain)

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
        .ticks(2)
        .fnBefore(s => s.classed('axis', true))
      this.bars = bxBars()
        .fnLowValue(d => 0)
        .fnHighValue(d => d.value)
        .fnFill(d => '#aeaeae')
        // .fnBefore(s => s.classed('date-selector__bars', true))
      this.brush = bxBrush()
        .bandMinStep(this.config.bandMinStep)
        .bandMaxStep(this.config.bandMaxStep)
        .fnOn('brushBandDomain', (event, bd) => {
          this.fillBars(bd)
          this.$emit('brushBandDomain', bd)
        })
        .fnOn('endBandDomain', (event, bd) => this.$emit('endBandDomain', bd))
    },
    createChart () {
      this.chart = bxChart()
        .selector(`#${this.id}`)
        .padding({ left: 50, top: 10, bottom: 40, right: 30 })
        .fnKey(d => d.dateId)
        .fnBandValue(d => d.dateId)
    },
    update () {
      this.yAxis.tickFormatType(this.config.formatType || '~s')
      this.chart
        .padding(this.config.padding || {}) // updating the padding
        .components([this.xAxis, this.yAxis, this.bars, this.brush])
    },
    fillBars (bandDomain) {
      // join on bars
      this.bars.join()
        .style('fill', d => isInside(bandDomain, d)
          ? this.config.color : null)
    },
    drawChart () {
      // wait for ChartsContainer
      return this.$nextTick()
        .then(() => this.chart.draw({ duration: 500 })
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
