<template>
  <ChartsContainer
    :charts="[chart]"
    :height="height"
  >
    <svg
      :id="id"
      class="month-bars-chart"
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
    monthId: Number,
    monthData: Array,
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
      this.fillBars(this.monthId)
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.update()

    this.chart.data(this.monthData)

    this.drawChart()
      .then(() => this.fillBars(this.monthId))
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
          this.fillBars(d.monthId)
          this.$emit('click', d.monthId)
        })
    },
    createChart () {
      this.chart = bxChart()
        .selector(`#${this.id}`)
        .padding(this.padding)
        .fnKey(d => d.monthId)
        .fnBandValue(d => d.monthId)
    },
    update () {
      this.chart.components([this.xAxis, this.bars])
    },
    fillBars (monthId) {
      // join on bars
      this.bars.join()
        .style('fill', d => d.monthId === monthId
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

.month-bars-chart rect:hover {
  cursor: pointer;
  fill-opacity: 0.8;
}

.month-bars-chart rect {
  transition: fill .25s ;
}

</style>
