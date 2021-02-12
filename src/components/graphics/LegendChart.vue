<template>
  <ChartsContainer
    :charts="[chart]"
    :height="height"
    :maxWidth="maxWidth"
    @size="hanldeSize"
  >
    <svg :id="id">
      <Gradient
        :id="gradientId"
        :fnInterpolator="fnInterpolator"
      />
    </svg>
  </ChartsContainer>
</template>

<script>
import { byAxisX, byBars, byChart } from 'd3nic'

export default {
  props: {
    id: {
      type: String,
      default: 'legend-chart'
    },
    variableInfo: Object,
    domain: Array,
    height: Number,
    maxWidth: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      chart: null,
      xAxis: null,
      bars: null,

      legendTicks: 4
    }
  },
  computed: {
    fnInterpolator () {
      return this.variableInfo.fnColorInterpolator
    },
    gradientId () {
      return this.id + '-gradient'
    }
  },
  watch: {
    domain (value) {
      this.chart.data([this.domain])

      this.update()
      this.drawChart()
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()

    this.compose()

    this.update()

    this.chart.data([this.domain])

    this.drawChart()
  },
  methods: {
    createComponents () {
      this.xAxis = byAxisX()
        .ticks(5)
        .tickSizeInner(-15)
        .tickSizeOuter(-15)
        .fnBefore((s) =>
          s.classed('axis', true).select('.domain').style('opacity', 0)
        )
      this.bars = byBars()
        .fnLowValue((d) => d[0])
        .fnHighValue((d) => d[1])
        .fnFill(`url(#${this.gradientId})`)
    },
    createChart () {
      this.chart = byChart()
        .selector(`#${this.id}`)
        .padding({ top: 7, right: 30, bottom: 23, left: 30 })
        .size({ width: this.width, height: 45 })
    },
    compose () {
      this.chart.components([this.bars, this.xAxis])
    },
    update () {
      this.xAxis.tickFormat(this.variableInfo.fnFormat || '~s')
      this.chart.contScaleType(this.variableInfo.scaleType || 'scaleLinear')
    },
    hanldeSize ({ width }) {
      this.xAxis.ticks(width > 600 ? 8 : width > 300 ? 5 : 3)
    },
    drawChart () {
      this.$nextTick(() => this.chart.draw({ duration: 500 }))
    }
  }
}
</script>

<style scoped>
stop {
  transition: all 0.5s;
}
</style>
