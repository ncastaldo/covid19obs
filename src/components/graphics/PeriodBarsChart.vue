<template>
  <ChartsContainer
    :charts="[chart]"
    :height="height"
  >
    <svg
      :id="id"
      class="period-bars-chart"
    />
  </ChartsContainer>
</template>

<script>
import { timeFormat } from 'd3-time-format'

import {
  bxChart,
  bxAxisX,
  bxBars
} from 'd3nic'

const fnDateFormat = timeFormat('%b %y')

export default {
  props: {
    id: String,
    height: {
      type: Number,
      default: 300
    },
    padding: {
      type: Object,
      default: () => ({ top: 0, left: 25, right: 25, bottom: 25 })
    },
    periodId: Number,
    periodData: Array,
    config: Object
  },
  data () {
    return {
      chart: null,

      xAxis: null,

      bars: null
    }
  },
  watch: {
    config () {
      // should update also min and max, for the moment ok this way
      this.fillBars(this.periodId)
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.update()

    this.chart.data(this.periodData)

    this.drawChart()
      .then(() => this.fillBars(this.periodId))
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
        .fnHighValue(d => 1)
        .fnFill(d => '#aeaeae')
        .fnOn('click', (event, d) => {
          this.fillBars(d.periodId)
          this.$emit('click', d.periodId)
        })
    },
    createChart () {
      this.chart = bxChart()
        .selector(`#${this.id}`)
        .padding(this.padding)
        .fnKey(d => d.periodId)
        .fnBandValue(d => d.periodId)
    },
    update () {
      this.chart.components([this.xAxis, this.bars])
    },
    fillBars (periodId) {
      // join on bars
      this.bars.join()
        .style('fill', d => d.periodId === periodId
          ? this.config.color
          : null)
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

.period-bars-chart rect:hover {
  cursor: pointer;
  fill-opacity: 0.8;
}

.period-bars-chart rect {
  transition: fill .25s ;
}

</style>
