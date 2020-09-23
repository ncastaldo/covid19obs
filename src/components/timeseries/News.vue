<template>
  <div>
    <div class="text-justify py-2">
      <div class="headline py-1">
        News reliability
      </div>
      <div class="py-1">
        Reliable and Unreliable news distribution over time
      </div>
    </div>
    <TimeseriesChart
      :id="config.id"
      :key="config.id"
      :height="200"
      :timeseries="timeseries"
      :config="config"
    />
    <ArcChart
      :id="arcConfig.id"
      :key="arcConfig.id"
      ref="arcChart"
      :height="300"
      :arcData="arcData"
      :config="arcConfig"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import ArcChart from './../graphics/ArcChart'

import { mapGetters } from 'vuex'

import { sum } from 'd3-array'
import { stack } from 'd3-shape'
import { bxBars, bxLine, bxCircles, brStackBars } from 'd3nic'

import {
  fillOpacityMouseover,
  fillOpacityMouseout,
  opacityMouseover,
  opacityMouseout
} from '../../plugins/graphics'

const config = {
  id: 'news',
  formatType: '~s',
  fnComponents: () => [
    bxBars()
      .fnDefined(d => d.info_fact_reliable != null)
      .fnHighValue(d => +d.info_fact_reliable)
      .fnLowValue(d => 0)
      .fnFill(d => '#018571')
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout),
    bxBars()
      .fnDefined(d => +d.info_fact_unreliable != null)
      .fnHighValue(d => -d.info_fact_unreliable)
      .fnLowValue(d => 0)
      .fnFill(d => '#8856A7')
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout),
    bxLine()
      .fnDefined(d => +d.info_fact_reliable != null)
      .fnValue(d => +d.info_fact_reliable - +d.info_fact_unreliable)
      .fnFillOpacity(d => 0)
      .fnStroke(d => '#111')
      .fnStrokeWidth(d => 2)
      .fnStrokeDasharray(d => [2, 2]),
    bxCircles()
      .fnDefined(d => +d.info_fact_reliable != null)
      .fnValue(d => +d.info_fact_reliable - +d.info_fact_unreliable)
      .fnFill(d => '#111')
      .fnRadius(d => 4)
      .fnStrokeWidth(d => 0)
      .fnOpacity(d => 0)
      .fnOn('mouseover', opacityMouseover)
      .fnOn('mouseout', opacityMouseout)
  ],
  fnTooltips: d => [
    { name: 'Reliable', value: +d.info_fact_reliable, color: '#018571', formatType: '.3s' },
    { name: 'Unreliable', value: +d.info_fact_unreliable, color: '#8856A7', formatType: '.3s' },
    { name: 'Difference', value: +d.info_fact_reliable - +d.info_fact_unreliable, color: '#111', formatType: '.3s' }
  ]
}

const news = [
  { key: 'info_fact_msm', name: 'MSM', color: '#5aae61' },
  { key: 'info_fact_science', name: 'Science', color: '#1b7837' },
  { key: 'info_fact_conspiracy', name: 'Conspiracy', color: '#40004b' },
  { key: 'info_fact_fake', name: 'Fake', color: '#762a83' },
  { key: 'info_fact_clickbait', name: 'Clickbait', color: '#9970ab' },
  { key: 'info_fact_political', name: 'Political', color: '#c2a5cf' },
  { key: 'info_fact_satire', name: 'Satire', color: '#e7d4e8' }
]

export default {
  components: {
    TimeseriesChart,
    ArcChart
  },
  data () {
    return {
      config,
      arcConfig: {
        id: 'arc-news',
        bandPaddingInner: 0.5,
        bandPaddingOuter: 0,
        fnComponents: () => [
          brStackBars()
            .fnFill(d => d.color)// d.color)
            .fnLowValue(d => d.stack[0])
            .fnHighValue(d => d.stack[1])
            .fnStroke(d => '#000')
            .fnStrokeWidth(d => 0)
            .fnOn('mouseover', this.$refs.arcChart.onMouseover)
            .fnOn('mouseout', this.$refs.arcChart.onMouseout)
            .fnOn('mouseover.fill-opacity', fillOpacityMouseover)
            .fnOn('mouseout.fill-opacity', fillOpacityMouseout)
            .phi(0)
        ],
        fnTooltips: d => [
          { name: 'Pct.', value: d.pct, formatType: '.2%' },
          { name: 'Tot.', value: d.value, formatType: '.3s' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries',
      periodRange: 'period/getPeriodRange'
    }),
    period () {
      return this.periodRange
        .map(pr => pr.periodName)
        .join(' - ')
    },
    arcData () {
      const arcValues = news.map(d => ({
        ...d,
        value: sum(this.timeseries, ts => ts[d.key])
        // period: this.period
      }))

      const tot = sum(arcValues, d => d.value) || 1

      arcValues.forEach(d => { d.pct = d.value / tot })

      // function to stack
      const fnStack = stack()
        .keys(news.map(a => a.key))

      // tricks here
      const stackObject = fnStack([arcValues
        .reduce((acc, a) => ({ ...acc, [a.key]: a.value }), {})])
        .reduce((acc, s) => ({ ...acc, [s.key]: [s[0][0], s[0][1]] }), {})

      return arcValues.map(d => ({
        ...d,
        stack: stackObject[d.key]
      }))
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
