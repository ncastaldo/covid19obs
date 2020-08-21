<template>
  <div>
    <div class="text-justify">
      <div class="headline">
        News reliability
      </div>
      <div class="">
        Reliable, unreliable
      </div>
    </div>
    <TimeseriesChart
      :id="config.id"
      :key="config.id"
      :height="200"
      :timeseries="timeseries"
      :config="config"
    />
    <BubbleChart
      :id="bubbleConfig.id"
      :key="bubbleConfig.id"
      ref="BubbleChart"
      :height="300"
      :root="newsRoot"
      :config="bubbleConfig"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import BubbleChart from './../graphics/BubbleChart'

import { mapGetters } from 'vuex'

import { hierarchy } from 'd3-hierarchy'
import { sum } from 'd3-array'
import { circles, texts, bxBars, bxLine, bxCircles } from 'd3nic'

import {
  barsMouseover,
  barsMouseout,
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
      .fnOn('mouseover', barsMouseover)
      .fnOn('mouseout', barsMouseout),
    bxBars()
      .fnDefined(d => +d.info_fact_unreliable != null)
      .fnHighValue(d => -d.info_fact_unreliable)
      .fnLowValue(d => 0)
      .fnFill(d => '#8856A7')
      .fnOn('mouseover', barsMouseover)
      .fnOn('mouseout', barsMouseout),
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

const newsObject = {
  key: 'root',
  color: '#eee',
  children: [
    {
      key: 'reliable',
      name: 'Reliable',
      color: '#d9f0d3',
      values: [
        { key: 'info_fact_msm', name: 'MSM', color: '#5aae61' },
        { key: 'info_fact_science', name: 'Science', color: '#1b7837' }
      ]
    },
    {
      key: 'unreliable',
      name: 'Unreliable',
      color: '#e7d4e8',
      values: [
        { key: 'info_fact_conspiracy', name: 'Conspiracy', color: '#40004b' },
        { key: 'info_fact_fake', name: 'Fake', color: '#762a83' },
        { key: 'info_fact_clickbait', name: 'Clickbait', color: '#9970ab' },
        { key: 'info_fact_political', name: 'Political', color: '#c2a5cf' },
        { key: 'info_fact_satire', name: 'Satire', color: '#e7d4e8' }
      ]
    }
  ]
}

export default {
  components: {
    TimeseriesChart,
    BubbleChart
  },
  data () {
    return {
      config,
      bubbleConfig: {
        id: 'bubble-news',
        fnComponents: () => [
          circles()
            .fnCenterX(d => d.pack.x)
            .fnCenterY(d => d.pack.y)
            .fnRadius(d => d.pack.r)
            .fnFill(d => d.pack.depth !== 1 ? d.color : '#fff')
            .fnStroke(d => d.color)
            .fnStrokeWidth(d => d.pack.depth === 2 ? 0 : 2)
            .fnOn('mouseover.opacity', barsMouseover)
            .fnOn('mouseout.opacity', barsMouseout)
            .fnOn('mouseover', this.$refs.BubbleChart.onMouseover)
            .fnOn('mouseout', this.$isMobile() || this.$refs.BubbleChart.onMouseout)
          /* texts()
      .fnTransform(d => `translate(${d.pack.x},${d.pack.y})`)
      .fnText(d => d.name)
      .fnFill(d => '#000') */
        ],
        fnTooltips: d => [
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries',
      periodRange: 'periodRange/getPeriodRange'
    }),
    period () {
      return this.periodRange
        .map(pr => pr.periodName)
        .join(' - ')
    },
    newsRoot () {
      const children = newsObject.children
        .map(nt => ({
          ...nt,
          children: nt.values
            .map(d => ({
              ...d,
              value: sum(this.timeseries, ts => ts[d.key]),
              period: this.period
            }))
            .map(d => ({
              ...d,
              packValue: Math.sqrt(d.value)
            }))
        }))

      // pack
      const root = hierarchy({ ...newsObject, children })
        .sum(d => d.packValue) // accessor function

      console.log(root)

      return root
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
