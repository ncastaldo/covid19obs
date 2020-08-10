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
    })
  },
  watch: {
    periods (value) {
      this.drawChart()
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.update()

    this.chart.data(this.periods)
    this.brush.brushDomain(this.periodRange.map(p => p.periodId))

    this.drawChart()
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
        .fnFill(d => '#bbb')
        .fnStrokeWidth(d => this.periods.includes(d.periodId) ? 2 : 0)
        .fnStroke(d => '#000')
        // .fnBefore(s => s.classed('period-selector__bars', true))
      this.brush = bxBrush()
        .minStep(0)
        .maxStep(1)
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
    reset () {

    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(function () {
        this.chart.draw({ duration: 500 })
      })
    }
  }

}
</script>

<style>

.periods-range-selector__bars:hover {
  fill-opacity: 0.6;
}

</style>
