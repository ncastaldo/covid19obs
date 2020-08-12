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
      :id="config.id"
      :key="config.id"
      :height="200"
      :timeseries="modifiedTimeseries"
      :config="config"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { bxBars } from 'd3nic'
import { stack } from 'd3-shape'

import {
  barsMouseover,
  barsMouseout
} from '../../plugins/graphics'

const config = {
  id: 'tweets',
  fnComponents: () => [
    bxBars()
      .fnDefined(d => d.info_tweets_T != null)
      .fnLowValue(d => d.stack_info_tweets_T[0])
      .fnHighValue(d => d.stack_info_tweets_T[1])
      .fnFill(d => '#045a8d')
      .fnOn('mouseover', barsMouseover)
      .fnOn('mouseout', barsMouseout),
    bxBars()
      .fnDefined(d => d.info_tweets_RT != null)
      .fnLowValue(d => d.stack_info_tweets_RT[0])
      .fnHighValue(d => d.stack_info_tweets_RT[1])
      .fnFill(d => '#2b8cbe')
      .fnOn('mouseover', barsMouseover)
      .fnOn('mouseout', barsMouseout),
    bxBars()
      .fnDefined(d => d.info_tweets_RE != null)
      .fnLowValue(d => d.stack_info_tweets_RE[0])
      .fnHighValue(d => d.stack_info_tweets_RE[1])
      .fnFill(d => '#74a9cf')
      .fnOn('mouseover', barsMouseover)
      .fnOn('mouseout', barsMouseout)
  ],
  fnTooltips: d => [
    { name: 'T', value: d.info_tweets_T, color: '#045a8d' },
    { name: 'RT', value: d.info_tweets_RT, color: '#2b8cbe' },
    { name: 'RE', value: d.info_tweets_RE, color: '#74a9cf' }
  ].reverse()
}

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      config
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries'
    }),
    modifiedTimeseries () {
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
    }
  }
}
</script>

<style>

</style>
