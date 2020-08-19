<template>
  <div>
    <div class="text-justify">
      <div class="headline">
        Risk Indexes
      </div>
      <div class="">
        IRI, DynIRI, Rt
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

import { bxLine, bxCircles, bxLines } from 'd3nic'

import {
  opacityMouseover,
  opacityMouseout
} from '../../plugins/graphics'

const config = {
  id: 'iri',
  formatType: '.2f',
  baseDomain: [0.4, 0.6],
  fnComponents: () => [
    bxLine()
      .fnValue(d => 0.5)
      .fnFillOpacity(d => 0)
      .fnStrokeWidth(d => 2)
      .fnStroke(d => '#878787')
      .fnStrokeDasharray(d => [6, 2]),
    bxLine()
      .fnDefined(d => d.info_risk_index != null)
      .fnValue(d => d.info_risk_index)
      .fnFillOpacity(d => 0)
      .fnStrokeWidth(d => 3)
      .fnStroke(d => '#2b8cbe'),
    bxLines()
      .fnDefined(d => d.info_risk_index != null)
      .fnLowValue(d => 0.5)
      .fnHighValue(d => d.info_risk_index)
      .fnFillOpacity(d => 0)
      .fnStrokeWidth(d => 2)
      .fnStroke(d => '#878787')
      .fnStrokeDasharray(d => [2, 2])
      .fnOpacity(d => 0)
      .fnOn('mouseover', opacityMouseover)
      .fnOn('mouseout', opacityMouseout),
    bxCircles()
      .fnDefined(d => d.info_risk_index != null)
      .fnValue(d => d.info_risk_index)
      .fnFill(d => '#2b8cbe')
      .fnRadius(d => 5)
      .fnStrokeWidth(d => 0)
      .fnOpacity(d => 0)
      .fnOn('mouseover', opacityMouseover)
      .fnOn('mouseout', opacityMouseout)
  ],
  fnTooltips: d => [
    { name: 'IRI', value: d.info_risk_index, color: '#2b8cbe', formatType: '.2f' }
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
