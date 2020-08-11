<template>
  <ChartsContainer
    :charts="[chart]"
    :height="height"
  >
    <svg
      :id="id"
    />
  </ChartsContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { select } from 'd3-selection'

import {
  bxChart,
  bxAxisX,
  bxBars,
  bxBrush
} from 'd3nic'

export default {
  data () {
    return {
      id: 'period-range-selector',
      height: 100,

      chart: null,

      xAxis: null,
      bars: null,
      brush: null
    }
  },
  computed: {
    ...mapGetters({
      periods: 'getPeriods',
      periodRange: 'getPeriodRange'
    }),
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
    ...mapActions({
      setPeriodIdRange: 'setPeriodIdRange'
    }),
    createComponents () {
      this.xAxis = bxAxisX()
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickFormat(t => t)
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
        .minStep(2)
        .maxStep(2)
        .fnOn('brushDomain', this.fillBars)
        .fnOn('endDomain', d => d
          ? this.setPeriodIdRange(d)
          : console.log('error no domain, d3nic')
        )
    },
    createChart () {
      this.chart = bxChart()
        .selector(`#${this.id}`)
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

#period-range-selector rect.selection {
  fill-opacity: 0;
}

</style>
