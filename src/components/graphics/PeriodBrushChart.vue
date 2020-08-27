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
  bxBars,
  bxBrush
} from 'd3nic'

const fnDateFormat = timeFormat('%b %y')

// function to check if inside
const isInside = (brushDomain, d) =>
  d.periodId >= brushDomain[0] && d.periodId <= brushDomain[1]

export default {
  props: {
    id: String,
    height: {
      type: Number,
      default: 60
    },
    padding: {
      type: Object,
      default: () => ({ top: 0, left: 25, right: 25, bottom: 25 })
    },
    brushDomain: Array,
    periods: Array,
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
      this.fillBars(this.brushDomain)
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.update()

    this.chart.data(this.periods)
    this.brush.brushDomain(this.brushDomain)

    this.drawChart()
      .then(() => this.fillBars(this.brushDomain))
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
        .fnHighValue(d => 1)
        .fnFill(d => '#aeaeae')
        // .fnBefore(s => s.classed('period-selector__bars', true))
      this.brush = bxBrush()
        .minStep(this.config.minStep)
        .maxStep(this.config.maxStep)
        .fnOn('brushDomain', (event, bd) => {
          this.fillBars(bd)
          this.$emit('brushDomain', bd)
        })
        .fnOn('endDomain', (event, bd) => this.$emit('endDomain', bd))
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
    fillBars (brushDomain) {
      // join on bars
      this.bars.join()
        .style('fill', d => isInside(brushDomain, d)
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
  fill-opacity: 0;
}

.period-brush-chart rect{
  transition: fill .0s ;
}

</style>
