<template>
  <div>
    <Article>
      <div class="text-center py-2">
        <div class="headline py-1">
          Risk Indexes
        </div>
        <div class="py-1">
          Evolution over time of the Dynamic Infodemic Risk Index (DynIRI) and the Infodemic Risk Index (IRI)
        </div>
      </div>
    </Article>
    <div class="py-3 text-center">
      <v-btn-toggle
        v-model="toggle"
        rounded
        mandatory
        dense
      >
        <v-btn>DYNAMIC IRI</v-btn>
        <v-btn>IRI</v-btn>
      </v-btn-toggle>
    </div>
    <TimeseriesChart
      id="base_iri"
      :height="200"
      :timeseries="iriTimereries"
      :config="baseConfig"
      :getComponents="getBaseComponents"
    />
    <TimeseriesChart
      v-if="toggle === 0"
      :id="dynIriTypeConfig.id"
      :height="200"
      :timeseries="iriTimereries"
      :config="dynIriTypeConfig"
      :getComponents="getDynIriTypeComponents"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { scaleSequential } from 'd3-scale'
import { bxLine, bxBars } from 'd3nic'

import { fillOpacityMouseout, fillOpacityMouseover } from '../../plugins/graphics'

const fnColor = scaleSequential(['#2b8cbe', '#e34a33'])

const baseConfigs = [
  {
    id: 'dyn_iri',
    formatType: '.2f',
    baseDomain: [0.4, 0.6],
    fnTooltips: d => [
      { name: 'DynIRI', value: d.info_dyn_iri, color: fnColor(d.info_dyn_iri), formatType: '.2f' }
    ]
  },
  {
    id: 'iri',
    formatType: '.2f',
    baseDomain: [0.4, 0.6],
    fnTooltips: d => [
      { name: 'IRI', value: d.info_risk_index, color: fnColor(d.info_risk_index), formatType: '.3f' }
    ]
  }
]

const getBaseComponents = () => [
  bxBars()
    .fnDefined(d => d.base_iri_value !== null)
    .fnLowValue(0)
    .fnHighValue(d => d.base_iri_value)
    .fnStrokeWidth(0)
    .fnFill(d => fnColor(d.base_iri_value))
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),
  bxLine()
    .fnValue(0.5)
    .fnFillOpacity(0)
    .fnStrokeWidth(2)
    .fnStroke('#878787')
    .fnStrokeDasharray([6, 2])
]

const dynIriTypeConfig = {
  id: 'dyn_iri_type',
  formatType: '.2f',
  baseDomain: [0.4, 0.6],
  fnTooltips: d => [
    { name: 'DynIRI Retweets', value: d.info_dyn_iri_RT, color: '#24A122', formatType: '.2f' },
    { name: 'DynIRI Replies', value: d.info_dyn_iri_RE, color: '#FB7F00', formatType: '.2f' }
  ]
}

const getDynIriTypeComponents = () => [
  bxBars()
    .fnDefined(d => d.info_dyn_iri_RT !== null)
    .fnLowValue(0)
    .fnHighValue(d => d.info_dyn_iri_RT)
    .fnFillOpacity(0.5)
    .fnFill('#24A122')
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),
  bxBars()
    .fnDefined(d => d.info_dyn_iri_RE !== null)
    .fnLowValue(0)
    .fnHighValue(d => d.info_dyn_iri_RE)
    .fnFillOpacity(0.5)
    .fnFill('#FB7F00')
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),

  bxLine()
    .fnValue(0.5)
    .fnFillOpacity(0)
    .fnStrokeWidth(2)
    .fnStroke('#878787')
    .fnStrokeDasharray([6, 2])
]

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      baseConfigs,
      dynIriTypeConfig,
      getBaseComponents,
      getDynIriTypeComponents,
      toggle: 0
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries'
    }),
    iriTimereries () {
      return this.timeseries
        .map(d => ({
          ...d,
          base_iri_value: d[['info_dyn_iri', 'info_risk_index'][this.toggle]]
        }))
    },
    baseConfig () {
      return this.baseConfigs[this.toggle]
    }
  }
}
</script>

<style>

</style>
