<template>
  <ChartsContainer
    :charts="[chart]"
    :height="35"
    :maxWidth="600"
  >
    <svg
      id="location-legend-chart"
      height="35"
    >
      <defs>
        <linearGradient
          id="legend-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            v-for="(d, i) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            :key="i"
            :style="`stop-color:${fnInterpolator(i/10)}`"
            :offset="`${d*10}%`"
          />
        </linearGradient>
      </defs>
    </svg>
  </ChartsContainer>
</template>

<script>
import { byChart, byAxisX, byBars } from 'd3nic'
import { extent } from 'd3-array'
import { format } from 'd3-format'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

export default {
  props: {
    locationDict: {
      type: Object,
      default: () => {}
    },
    locationInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      chart: null,
      byAxisX: null,
      byBars: null
    }
  },
  computed: {
    fnInterpolator () {
      return d3ScaleChromatic[this.locationDict.interpolator]
    },
    domain () {
      const values = Object.values(this.locationInfo || {})
        .map(d => d.value)
        .filter(v => v !== null)
      return extent(values)
    },
    fnFormat () {
      const f = 'legendFormat' in this.locationDict
        ? this.locationDict.legendFormat
        : this.locationDict.format
      return format(f)
    }
  },
  watch: {
    domain (value) {
      this.byAxisX.tickFormat(this.fnFormat).ticks(this.ticks)
      this.chart
        .contScaleType(this.locationDict.scaleType)
        .data([this.domain])
        .draw({ duration: 500 })
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()
  },
  methods: {
    createComponents () {
      this.byAxisX = byAxisX()
        .tickSizeInner(-15)
        .tickSizeOuter(-15)
        .ticks(this.locationDict.ticks)
        .tickFormat(this.fnFormat)
        .fnBefore(s => s.classed('axis', true).select('.domain').style('opacity', 0))
      this.byBars = byBars()
        .fnLowValue(d => d[0])
        .fnHighValue(d => d[1])
        .fnFill(d => 'url(#legend-gradient)')
    },
    createChart () {
      this.chart = byChart()
        .selector('#location-legend-chart')
        .padding({ top: 0, right: 30, bottom: 20, left: 30 })
        .components([this.byBars, this.byAxisX])
        .contScaleType(this.locationDict.scaleType)
    }
  }
}

</script>
