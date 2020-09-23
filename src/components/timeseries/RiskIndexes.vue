<template>
  <div>
    <div class="text-justify py-2">
      <div class="headline py-1">
        Risk Indexes
      </div>
      <div class="py-1">
        Evolution over time of the Dynamic Infodemic Risk Index (DynIRI) and the Infodemic Risk Index (IRI)
      </div>
    </div>
    <div class="py-3">
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
      v-for="config in configs"
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

import { scaleSequential } from 'd3-scale'
import { interpolateRdBu } from 'd3-scale-chromatic'
import { bxLine, bxBars } from 'd3nic'

import { fillOpacityMouseout, fillOpacityMouseover } from '../../plugins/graphics'

const fnColor = scaleSequential(['#2b8cbe', '#e34a33'])

console.log(fnColor(0))

const iriConfigs = [
  {
    id: 'mainIri',
    formatType: '.2f',
    baseDomain: [0.4, 0.6],
    fnComponents: () => [
      bxLine()
        .fnValue(0.5)
        .fnFillOpacity(0)
        .fnStrokeWidth(2)
        .fnStroke('#878787')
        .fnStrokeDasharray([6, 2]),
      bxBars()
        .fnDefined(d => d.info_risk_index !== null)
        .fnLowValue(0)
        .fnHighValue(d => d.info_risk_index)
        .fnStrokeWidth(0)
        .fnFill(d => fnColor(d.info_risk_index))
        .fnOn('mouseover', fillOpacityMouseover)
        .fnOn('mouseout', fillOpacityMouseout)
    ],
    fnTooltips: d => [
      { name: 'IRI', value: d.info_risk_index, color: fnColor(d.info_risk_index), formatType: '.3f' }
    ]
  }
]

const dynIriConfigs = [
  {
    id: 'mainIri',
    formatType: '.2f',
    baseDomain: [0.4, 0.6],
    fnComponents: () => [
      bxLine()
        .fnValue(0.5)
        .fnFillOpacity(0)
        .fnStrokeWidth(2)
        .fnStroke('#878787')
        .fnStrokeDasharray([6, 2])
        .fnOn('mouseover', fillOpacityMouseover)
        .fnOn('mouseout', fillOpacityMouseout),
      bxBars()
        .fnDefined(d => d.info_dyn_iri !== null)
        .fnLowValue(0)
        .fnHighValue(d => d.info_dyn_iri)
        .fnStrokeWidth(0)
        .fnFill(d => fnColor(d.info_dyn_iri))
        .fnOn('mouseover', fillOpacityMouseover)
        .fnOn('mouseout', fillOpacityMouseout)
    ],
    fnTooltips: d => [
      { name: 'DynIRI', value: d.info_dyn_iri, color: fnColor(d.info_dyn_iri), formatType: '.2f' }
    ]
  },
  {
    id: 'dynIriRT',
    formatType: '.2f',
    baseDomain: [0.4, 0.6],
    fnComponents: () => [
      bxLine()
        .fnValue(0.5)
        .fnFillOpacity(0)
        .fnStrokeWidth(2)
        .fnStroke('#878787')
        .fnStrokeDasharray([6, 2]),
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
        .fnOn('mouseout', fillOpacityMouseout)
    ],
    fnTooltips: d => [
      { name: 'DynIRI Retweets', value: d.info_dyn_iri_RT, color: '#24A122', formatType: '.2f' },
      { name: 'DynIRI Replies', value: d.info_dyn_iri_RE, color: '#FB7F00', formatType: '.2f' }
    ]
  }
]

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      configList: [
        dynIriConfigs,
        iriConfigs
      ],
      toggle: 0
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries'
    }),
    configs () {
      return this.configList[this.toggle]
    }
  }
}
</script>

<style>

</style>
