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

import { bxBars, bxLine, bxCircles } from 'd3nic'

import {
  barsMouseover,
  barsMouseout,
  circlesMouseover,
  circlesMouseout
} from '../../plugins/graphics'

const config = {
  id: 'news',
  fnComponents: () => [
    bxBars()
      .fnDefined(d => d.info_fact_reliable != null)
      .fnHighValue(d => d.info_fact_reliable)
      .fnLowValue(d => 0)
      .fnFill(d => '#018571')
      .fnOn('mouseover', barsMouseover)
      .fnOn('mouseout', barsMouseout),
    bxBars()
      .fnDefined(d => d.info_fact_unreliable != null)
      .fnHighValue(d => -d.info_fact_unreliable)
      .fnLowValue(d => 0)
      .fnFill(d => '#8856A7')
      .fnOn('mouseover', barsMouseover)
      .fnOn('mouseout', barsMouseout),
    bxLine()
      .fnDefined(d => d.info_fact_reliable != null)
      .fnValue(d => d.info_fact_reliable - d.info_fact_unreliable)
      .fnFillOpacity(d => 0)
      .fnStroke(d => '#111')
      .fnStrokeWidth(d => 2)
      .fnStrokeDasharray(d => [2, 2]),
    bxCircles()
      .fnDefined(d => d.info_fact_reliable != null)
      .fnValue(d => d.info_fact_reliable - d.info_fact_unreliable)
      .fnFill(d => '#111')
      .fnRadius(d => 4)
      .fnStrokeWidth(d => 0)
      .fnOpacity(d => 0)
      .fnOn('mouseover', circlesMouseover)
      .fnOn('mouseout', circlesMouseout)
  ],
  fnTooltips: d => [
    { name: 'Rel', value: d.info_fact_reliable, color: '#018571' },
    { name: 'Unrel', value: d.info_fact_unreliable, color: '#8856A7' },
    { name: 'Diff', value: d.info_fact_reliable - d.info_fact_unreliable, color: '#111' }
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
