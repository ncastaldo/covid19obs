<template>
  <div>
    <div class="text-justify">
      <div class="headline">
        Tweets
      </div>
      <div class="">
        Collected tweets divided by Tweets, Retweets and Replies (todo)
      </div>
    </div>
    <TimeseriesChart
      :id="typeConfig.id"
      :key="typeConfig.id"
      :height="200"
      :timeseries="typeTimeseries"
      :config="typeConfig"
    />
    <TimeseriesChart
      :id="localConfig.id"
      :key="localConfig.id"
      :height="200"
      :timeseries="localTimeseries"
      :config="localConfig"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { bxBars } from 'd3nic'
import { stack } from 'd3-shape'

import {
  fillOpacityMouseover,
  fillOpacityMouseout
} from '../../plugins/graphics'

const typeConfig = {
  id: 'type-tweets',
  formatType: '~s',
  fnComponents: () => [
    bxBars()
      .fnDefined(d => d.info_tweets_T != null)
      .fnLowValue(d => d.stack_info_tweets_T[0])
      .fnHighValue(d => d.stack_info_tweets_T[1])
      .fnFill(d => '#045a8d')
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout),
    bxBars()
      .fnDefined(d => d.info_tweets_RT != null)
      .fnLowValue(d => d.stack_info_tweets_RT[0])
      .fnHighValue(d => d.stack_info_tweets_RT[1])
      .fnFill(d => '#2b8cbe')
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout),
    bxBars()
      .fnDefined(d => d.info_tweets_RE != null)
      .fnLowValue(d => d.stack_info_tweets_RE[0])
      .fnHighValue(d => d.stack_info_tweets_RE[1])
      .fnFill(d => '#74a9cf')
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout)
  ],
  fnTooltips: d => [
    { name: 'T', value: d.info_tweets_T, color: '#045a8d', formatType: '.3s' },
    { name: 'RT', value: d.info_tweets_RT, color: '#2b8cbe', formatType: '.3s' },
    { name: 'RE', value: d.info_tweets_RE, color: '#74a9cf', formatType: '.3s' }
  ].reverse()
}

const localConfig = {
  id: 'local-tweets',
  formatType: '~s',
  fnComponents: () => [
    bxBars()
      .fnDefined(d => d.info_tweets_local != null)
      .fnLowValue(d => d.stack_info_tweets_local[0])
      .fnHighValue(d => d.stack_info_tweets_local[1])
      .fnFill(d => '#238b45')
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout),
    bxBars()
      .fnDefined(d => d.info_tweets_foreign != null)
      .fnLowValue(d => d.stack_info_tweets_foreign[0])
      .fnHighValue(d => d.stack_info_tweets_foreign[1])
      .fnFill(d => '#74c476')
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout)
  ],
  fnTooltips: d => [
    { name: 'Local', value: d.info_tweets_local, color: '#238b45', formatType: '.3s' },
    { name: 'Foreign', value: d.info_tweets_foreign, color: '#74c476', formatType: '.3s' }
  ].reverse()
}

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      typeConfig,
      localConfig
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
      const ts = this.timeseries.map((d, i) => ({
        ...d,
        info_tweets_foreign: d.info_tweets_local !== null
          ? d.info_tweets - d.info_tweets_local
          : d.info_tweets
      }))
      const keys = ['info_tweets_local', 'info_tweets_foreign']
      const fnStack = stack().keys(keys)
      const stackedData = fnStack(ts)
      return ts.map((d, i) => ({
        ...d,
        ...keys.reduce((acc, k, j) => ({
          ...acc,
          [`stack_${k}`]: ts.length // considering []
            ? stackedData[j][i].filter((_, i) => i <= 1)
            : 0
        }), {})
      }))
    }
  }
}
</script>

<style>

</style>
