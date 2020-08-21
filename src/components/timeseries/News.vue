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
    <PackChart
      :id="bubbleConfig.id"
      :key="bubbleConfig.id"
      :height="300"
      :chartData="newsData"
      :config="bubbleConfig"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import PackChart from './../graphics/PackChart'

import { mapGetters } from 'vuex'

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

const bubbleConfig = {
  id: 'bubble-news',
  fnComponents: () => [
    circles()
      .fnCenterX(d => d.pack.x)
      .fnCenterY(d => d.pack.y)
      .fnRadius(d => d.pack.r)
      .fnFill(d => d.color)
    /* texts()
      .fnTransform(d => `translate(${d.pack.x},${d.pack.y})`)
      .fnText(d => d.name)
      .fnFill(d => '#000') */
  ],
  fnTooltips: d => [
  ]
}

const newsTypes = [
  ['info_fact_clickbait', 'Clickbait', '#8856A7'],
  ['info_fact_conspiracy', 'Conspiracy', '#8856A7'],
  ['info_fact_fake', 'Fake', '#8856A7'],
  ['info_fact_msm', 'MSM', '#018571'],
  ['info_fact_political', 'Political', '#8856A7'],
  ['info_fact_satire', 'Satire', '#8856A7'],
  ['info_fact_science', 'Science', '#018571']
]

export default {
  components: {
    TimeseriesChart,
    PackChart
  },
  data () {
    return {
      config,
      bubbleConfig
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries'
    }),
    newsData () {
      const news = newsTypes
        .map(([key, name, color]) => ({
          key,
          name,
          value: sum(this.timeseries, ts => Math.sqrt(ts[key])),
          color
        }))

      return news
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
