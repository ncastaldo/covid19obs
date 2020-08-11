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
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { bxBars, bxLine } from 'd3nic'

const config = {
  id: 'news',
  fnComponents: () => [
    bxBars()
      .fnDefined(d => d.info_fact_reliable != null)
      .fnHighValue(d => d.info_fact_reliable)
      .fnLowValue(d => 0)
      .fnFill(d => '#018571'),
    bxBars()
      .fnDefined(d => d.info_fact_unreliable != null)
      .fnHighValue(d => -d.info_fact_unreliable)
      .fnLowValue(d => 0)
      .fnFill(d => '#8856A7'),
    bxLine()
      .fnDefined(d => d.info_fact_reliable != null)
      .fnValue(d => d.info_fact_reliable - d.info_fact_unreliable)
      .fnFillOpacity(d => 0)
      .fnStroke(d => '#111')
      .fnStrokeWidth(d => 2)
      .fnStrokeDasharray(d => [2, 2])
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
    })
  }
}
</script>

<style>

</style>
