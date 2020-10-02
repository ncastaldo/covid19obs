<template>
  <ChartsContainer
    :charts="[chart]"
    :height="height"
  >
    <svg
      :id="id"
      class="period-brush-chart"
    />
  </ChartsContainer>
</template>

<script>
import { timeFormat } from 'd3-time-format'

import {
  bxChart,
  bxAxisX,
  bxAxiY,
  bxBars,
  bxBrush
} from 'd3nic'

const fnDateFormat = timeFormat('%b %y')

// function to check if inside
const isInside = (bandDomain, d) =>
  d.periodId >= bandDomain[0] && d.periodId <= bandDomain[1]

export default {
  props: {
    id: String,
    height: {
      type: Number,
      default: 300
    },
    padding: {
      type: Object,
      default: () => ({ top: 1, left: 25, right: 25, bottom: 25 })
    },
    bandDomain: Array,
    periodData: Array,
    config: Object
  },
  data () {
    return {
      chart: null,

      xAxis: null,
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
    periodData () {
      this.chart.data(this.periodData)

      this.drawChart()
        .then(() => this.fillBars(this.bandDomain))
        .catch(() => {})
    },
    bandDomain (bandDomain) {
      this.brush.bandDomain(bandDomain).snap()

      this.fillBars(bandDomain)
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.update()

    this.chart.data(this.periodData)
    this.brush.bandDomain(this.bandDomain)

    this.drawChart()
      .then(() => this.fillBars(this.bandDomain))
      .catch(() => {})
  },
  methods: {
    createComponents () {
      this.xAxis = bxAxisX()
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .ticks(100)
        .tickFormat(t => fnDateFormat(new Date(t)))
        .fnBefore(s =>
          s.classed('axis', true)
            .select('.domain')
            .style('opacity', 0))
      this.bars = bxBars()
        .fnLowValue(d => 0)
        .fnHighValue(d => d.value)
        .fnFill(d => '#aeaeae')
        // .fnBefore(s => s.classed('period-selector__bars', true))
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
        .padding(this.padding)
        .fnKey(d => d.periodId)
        .fnBandValue(d => d.periodId)
    },
    update () {
      this.chart.components([this.xAxis, this.bars, this.brush])
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

.period-brush-chart rect.selection {
  fill-opacity: 0.3;
  fill: rgb(222, 222, 222);
  stroke: #444;
  stroke-width:1;
}

.period-brush-chart rect.handle {
  fill-opacity: 0;
  fill: rgb(31, 121, 179)
}

.period-brush-chart rect{
  transition: fill .0s ;
}

</style>
