<template>
  <div>
    <div class="text-justify py-2">
      <div class="headline py-1">
        Tweets
      </div>
      <div class="py-1">
        Collected tweets divided by Tweets, Retweets and Replies and their distribution based on the language
      </div>
    </div>
    <TimeseriesChart
      :id="typeConfig.id"
      :key="typeConfig.id"
      :height="200"
      :timeseries="typeTimeseries"
      :config="typeConfig"
      :getComponents="getTypeComponents"
    />
    <TimeseriesChart
      :id="localConfig.id"
      :key="localConfig.id"
      :height="200"
      :timeseries="localTimeseries"
      :config="localConfig"
      :getComponents="getLocalComponents"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { bxBars, bxLine, bxArea, bxLines, bxCircles } from 'd3nic'
import { stack } from 'd3-shape'

import {
  fillOpacityMouseover,
  fillOpacityMouseout,
  opacityMouseover,
  opacityMouseout
} from '../../plugins/graphics'

const typeConfig = {
  id: 'type-tweets',
  formatType: '~s',
  fnTooltips: d => [
    { name: 'Tweets', value: d.info_tweets_T, color: '#045a8d', formatType: '.3s' },
    { name: 'Retweets', value: d.info_tweets_RT, color: '#2b8cbe', formatType: '.3s' },
    { name: 'Replies', value: d.info_tweets_RE, color: '#74a9cf', formatType: '.3s' }
  ].reverse()
}

const getTypeComponents = () => [
  bxBars()
    .fnDefined(d => d.info_tweets_T != null)
    .fnLowValue(d => d.stack_info_tweets_T[0])
    .fnHighValue(d => d.stack_info_tweets_T[1])
    .fnFill('#045a8d')
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),
  bxBars()
    .fnDefined(d => d.info_tweets_RT != null)
    .fnLowValue(d => d.stack_info_tweets_RT[0])
    .fnHighValue(d => d.stack_info_tweets_RT[1])
    .fnFill('#2b8cbe')
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),
  bxBars()
    .fnDefined(d => d.info_tweets_RE != null)
    .fnLowValue(d => d.stack_info_tweets_RE[0])
    .fnHighValue(d => d.stack_info_tweets_RE[1])
    .fnFill('#74a9cf')
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout)
]

const localConfig = {
  id: 'local-tweets',
  bandPaddingInner: 1,
  formatType: '.0%',
  fnTooltips: d => [
    { name: 'Local', value: d.info_tweets_local, color: '#1C8571', formatType: '.3s' },
    { name: 'Foreign', value: d.info_tweets_foreign, color: '#74c476', formatType: '.3s' }
  ].reverse()
}

const getLocalComponents = () => [
  bxArea()
    .fnDefined(d => d.info_tweets_local_pct != null)
    .fnLowValue(d => d.info_tweets_local_pct)
    .fnHighValue(0)
    .fnFill('#238b45')
    .fnFillOpacity(0.5),
  bxArea()
    .fnDefined(d => d.info_tweets_local != null)
    .fnLowValue(d => d.info_tweets_local_pct)
    .fnHighValue(1)
    .fnFill('#74c476')
    .fnFillOpacity(0.5),
  bxLine()
    .fnValue(0.5)
    .fnFillOpacity(0)
    .fnStrokeWidth(2)
    .fnStroke('#878787')
    .fnStrokeDasharray([6, 2]),
  bxLines()
    .fnDefined(d => d.info_tweets_local_pct != null)
    .fnLowValue(d => 0.5)
    .fnHighValue(d => d.info_tweets_local_pct)
    .fnFillOpacity(d => 0)
    .fnStrokeWidth(d => 2)
    .fnStroke(d => '#878787')
    .fnStrokeDasharray(d => [2, 2])
    .fnOpacity(d => 0)
    .fnOn('mouseover', opacityMouseover)
    .fnOn('mouseout', opacityMouseout),
  bxLine()
    .fnDefined(d => d.info_tweets_local_pct != null)
    .fnValue(d => d.info_tweets_local_pct)
    .fnStroke('#111')
    .fnStrokeWidth(2)
    .fnFillOpacity(0),

  bxCircles()
    .fnDefined(d => d.info_tweets_local_pct != null)
    .fnValue(d => d.info_tweets_local_pct)
    .fnFill('#111')
    .fnRadius(d => 5)
    .fnStrokeWidth(d => 0)
    .fnOpacity(d => 0)
    .fnOn('mouseover', opacityMouseover)
    .fnOn('mouseout', opacityMouseout)
]

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      typeConfig,
      getTypeComponents,
      localConfig,
      getLocalComponents
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries'
    }),
    typeTimeseries () {
      const keys = ['info_tweets_T', 'info_tweets_RT', 'info_tweets_RE']
      const fnStack = stack().keys(keys)
      const stackedData = fnStack(this.timeseries)
      return this.timeseries.map((d, i) => ({
        ...d,
        ...keys.reduce((acc, k, j) => ({
          ...acc,
          [`stack_${k}`]: this.timeseries.length // considering []
            ? stackedData[j][i].filter((_, i) => i <= 1)
            : 0
        }), {})
      }))
    },
    localTimeseries () {
      return this.timeseries.map((d, i) => ({
        ...d,
        info_tweets_foreign: +d.info_tweets - +d.info_tweets_local,
        info_tweets_local_pct: d.info_tweets !== null && d.info_tweets > 0
          ? d.info_tweets_local / (+d.info_tweets)
          : null
      }))
    }
  }
}
</script>

<style>

</style>
