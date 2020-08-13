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
  computed: {
    brushDomain () {
      return this.periodRange.map(p => p.periodId)
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
        .fnFill(d => '#ccc')
        .fnStrokeWidth(d => this.periods.includes(d.periodId) ? 2 : 0)
        .fnStroke(d => '#000')
        // .fnBefore(s => s.classed('period-selector__bars', true))
      this.brush = bxBrush()
        .minStep(0)
        .maxStep(1)
        .fnOn('brushDomain', this.fillBars)
        .fnOn('endDomain', d => d
          ? this.setPeriodIdRange(d)
          : console.log('error no domain, d3nic')
        )
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
      // function to check if inside
      const isInside = d =>
        d.periodId >= brushDomain[0] && d.periodId <= brushDomain[1]
      // join on bars
      this.bars.join()
        .style('fill', d => isInside(d) ? '#2877b8' : null)
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

</style>
