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
      id="base-iri"
      :height="200"
      :timeseries="iriTimereries"
      :config="baseConfig"
      :getComponents="getBaseComponents"
    />
    <TimeseriesChart
      id="type-iri"
      :height="200"
      :timeseries="iriTimereries"
      :config="typeConfig"
      :getComponents="getTypeComponents"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { scaleSequential } from 'd3-scale'
import { bxLine, bxBars, bxArea, bxCircles } from 'd3nic'

import { fillOpacityMouseout, fillOpacityMouseover, opacityMouseover, opacityMouseout } from '../../plugins/graphics'

const fnColor = scaleSequential(['#2b8cbe', '#e34a33'])

const typeColors = {
  T: '#045a8d',
  RT: '#2b8cbe',
  RE: '#74a9cf'
}

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

const typeConfigs = [
  {
    id: 'dyn_iri_type',
    formatType: '.2f',
    baseDomain: [0.4, 0.6],
    fnTooltips: d => [
      { name: 'DynIRI Retweets', value: d.info_dyn_iri_RT, color: typeColors.RT, formatType: '.2f' },
      { name: 'DynIRI Replies', value: d.info_dyn_iri_RE, color: typeColors.RE, formatType: '.2f' }
    ]
  },
  {
    id: 'iri_type',
    formatType: '.2f',
    baseDomain: [0.4, 0.6],
    fnTooltips: d => [
      { name: 'IRI Tweets', value: d.info_risk_index_T, color: typeColors.T, formatType: '.2f' },
      { name: 'IRI Retweets', value: d.info_risk_index_RT, color: typeColors.RT, formatType: '.2f' },
      { name: 'IRI Replies', value: d.info_risk_index_RE, color: typeColors.RE, formatType: '.2f' }
    ]
  }
]

const getBarsComponent = () => bxBars()
  .fnDefined(d => d.base_value !== null)
  .fnLowValue(0)
  .fnHighValue(d => d.base_value)
  .fnStrokeWidth(0)
  .fnFill(d => fnColor(d.base_value))
  .fnOn('mouseover', fillOpacityMouseover)
  .fnOn('mouseout', fillOpacityMouseout)

const getAreaComponent = (key, color) =>
  bxArea()
    .fnDefined(d => key in d && d[key] !== null)
    .fnLowValue(0)
    .fnHighValue(d => d[key])
    .fnFillOpacity(0.1)
    .fnFill(color)
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout)

const getLineComponent = (key, color) =>
  bxLine()
    .fnDefined(d => key in d && d[key] !== null)
    .fnValue(d => d[key])
    .fnFillOpacity(0)
    .fnStroke(color)
    .fnStrokeWidth(3)
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout)

const getCircleComponent = (key, color) => bxCircles()
  .fnDefined(d => key in d && d[key] !== null)
  .fnValue(d => d[key])
  .fnFill(color)
  .fnRadius(d => 5)
  .fnStrokeWidth(d => 0)
  .fnOpacity(d => 0)
  .fnOn('mouseover', opacityMouseover)
  .fnOn('mouseout', opacityMouseout)

const getMiddleLineComponent = () =>
  bxLine()
    .fnValue(0.5)
    .fnFillOpacity(0)
    .fnStrokeWidth(2)
    .fnStroke('#878787')
    .fnStrokeDasharray([6, 2])

// retweets: # 2b8cbe ( before #24A122 )
// tweets: # 045a8d
// replies: # 74a9cf ( before #FB7F00 )

const getBaseComponents = () => [
  getBarsComponent(),
  getMiddleLineComponent()
]

const getTypeComponents = () => [
  getAreaComponent('type_T_value', typeColors.T),
  getAreaComponent('type_RT_value', typeColors.RT),
  getAreaComponent('type_RE_value', typeColors.RE),
  getMiddleLineComponent(),
  getLineComponent('type_T_value', typeColors.T),
  getLineComponent('type_RT_value', typeColors.RT),
  getLineComponent('type_RE_value', typeColors.RE),
  getCircleComponent('type_T_value', typeColors.T),
  getCircleComponent('type_RT_value', typeColors.RT),
  getCircleComponent('type_RE_value', typeColors.RE)
]

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      baseConfigs,
      typeConfigs,
      getBaseComponents,
      getTypeComponents,
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
          base_value: d[['info_dyn_iri', 'info_risk_index'][this.toggle]],
          type_T_value: this.toggle === 0 ? null : d.info_risk_index_T,
          type_RT_value: d[['info_dyn_iri_RT', 'info_risk_index_RT'][this.toggle]],
          type_RE_value: d[['info_dyn_iri_RE', 'info_risk_index_RE'][this.toggle]]
        }))
    },
    baseConfig () {
      return this.baseConfigs[this.toggle]
    },
    typeConfig () {
      return this.typeConfigs[this.toggle]
    }
  }
}
</script>

<style>

</style>
