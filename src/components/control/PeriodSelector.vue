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
      id: 'period-selector',
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
      period: 'getPeriod'
    })
  },
  watch: {
    period (value) {
      this.drawChart()
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.update()

    this.chart.data(this.periods)

    this.drawChart()
  },
  methods: {
    ...mapActions({
      setPeriodId: 'setPeriodId'
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
        .fnStrokeWidth(d => this.period.periodId === d.periodId ? 2 : 0)
        .fnStroke(d => '#000')
        .fnOn('click', this.fnOnClick)
        .fnBefore(s => s.classed('period-selector__bars', true))
      this.brush = bxBrush()
        .maxStep(1)
    },
    createChart () {
      this.chart = bxChart()
        .selector(`#${this.id}`)
        .fnKey(d => d.periodId)
        .fnBandValue(d => d.periodName)
    },
    update () {
      this.chart.components([this.xAxis, this.bars])//, this.brush])
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(function () {
        this.chart.draw({ duration: 500 })
      })
    },
    fnOnClick (d, i, nodes) {
      if (d.periodId !== this.period.periodId) {
        this.setPeriodId(d.periodId)
      }
    }
  }

}
</script>

<style>

.period-selector__bars:hover {
  fill-opacity: 0.6;
}

</style>
