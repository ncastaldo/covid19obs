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

import { bxLine } from 'd3nic'

const config = {
  id: 'iri',
  fnComponents: () => [
    bxLine()
      .fnValue(d => 0.5)
      .fnFillOpacity(d => 0)
      .fnStrokeWidth(d => 2)
      .fnStroke(d => '#878787')
      .fnStrokeDasharray(d => [4, 2]),
    bxLine()
      .fnDefined(d => d.info_risk_index != null)
      .fnValue(d => d.info_risk_index)
      .fnFillOpacity(d => 0)
      .fnStrokeWidth(d => 3)
      .fnStroke(d => '#2b8cbe')
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
