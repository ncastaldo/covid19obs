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

const config = {
  id: 'tweets',
  fnComponents: () => [
    bxBars()
      .fnDefined(d => d.info_tweets != null)
      .fnLowValue(d => d.stack_info_tweets[0])
      .fnHighValue(d => d.stack_info_tweets[1])
      .fnFill(d => '#045a8d'),
    bxBars()
      .fnDefined(d => d.info_tweets_local != null)
      .fnLowValue(d => d.stack_info_tweets_local[0])
      .fnHighValue(d => d.stack_info_tweets_local[1])
      .fnFill(d => '#2b8cbe') // #74a9cf
  ]
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
      const keys = ['info_tweets', 'info_tweets_local']
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
