<template>
  <div class="pt-5">
    <div class="pb-3 text-center">
      <v-btn-toggle
        v-model="toggle"
        rounded
        mandatory
        dense
      >
        <v-btn>IRI</v-btn>
        <v-btn>Dynamic IRI</v-btn>
      </v-btn-toggle>
    </div>
    <div class="d-flex align-center justify-center">
      <h4 class="pb-4 thin-font">
        Lowest Risk
      </h4>
      <LegendChart
        id="iri-legend-chart"
        :width="300"
        :variableInfo="variableInfo"
        :domain="[0, 1]"
      />
      <h4 class="pb-4 thin-font">
        Highest Risk
      </h4>
    </div>
    <TimeseriesChart
      id="base-iri"
      :height="280"
      :timeseries="iriTimereries"
      :config="baseConfig"
      :legend="false"
      :getComponents="getBaseComponents"
    >
      <Gradient
        v-if="false"
        id="base-iri-gradient"
        direction="y"
        :fnInterpolator="variableInfo.fnColorInterpolator"
      />
    </TimeseriesChart>
    <TimeseriesChart
      v-if="false"
      id="type-iri"
      :height="130"
      :timeseries="iriTimereries"
      :config="typeConfig"
      :getComponents="getTypeComponents"
    />
    <Article>
      <div>
        <div class="text-justify py-1">
          Infodemic risk indices estimate the change that a user in a social media platform is pointed to potentially unreliable sources of misinformation or disinformation about COVID-19. There are two type of indices:
          <ul>
            <li><strong>Infodemic Risk Index (IRI)</strong>: likelihood that a user <i>receives messages</i> pointing to potentially misleading sources. This index quantifies if and how user are exposed to circulating information.</li>
            <li><strong>Dynamic Infodemic Risk Index (Dynamic IRI)</strong>: likelihood that a user <strong>endorses or engages with online messages</strong> pointing to potentially misleading sources. This index quantifies if and how user interact with circulating information.</li>
          </ul>
          <br>
          The indices range from 0 (Lowest Risk) to 1 (Highest Risk), with intermediate cases:
          <ul>
            <li>
              <font color="#2E7Cb7">
                <strong>Low Risk</strong>
              </font>: values between 0 and 0.25
            </li>
            <li>
              <font color="82B8D3">
                <strong>Low/Medium Risk</strong>
              </font>: values between 0.26 and 0.5
            </li>
            <li>
              <font color="#F28b56">
                <strong>Medium/High Risk</strong>
              </font>: values between 0.51 and 0.75
            </li>
            <li>
              <font color="#d7191c">
                <strong>High Risk</strong>
              </font>: values between 0.76 and 1
            </li>
          </ul>
          For instance, users living in a region with high IRI and low/medium Dynamic IRI have a <font color="d7191c">
            <strong>chance larger than 75% of reading an online post linking to a Web site with potentially misleading information about COVID-19</strong>
          </font>, as well as <font color="F28b56">
            <strong>a chance between 26% and 50% of re-sharing or commenting about that information</strong>
          </font>
          <PolicyText>
            The two indices provide two opposite perspectives on the spreading of the infodemics. The IRI focuses on the production of misinformation while the Dynamic IRI on the engagement associated with it. A high value of IRI means that potential misinformation is being transmitted by a number of highly relevant accounts, and the infodemics can be potentially reduced by targeting those influencers (infodemic equivalent to quarantine). A high value of Dynamic IRI means that a large number of users are interacting and retransmitting the potential misinformative content, and the infodemic can be potentially reduced by increasing awareness of all users on the importance of carefully checking the sources and selective reposting behavior (infodemic equivalent of wearing a mask).
          </PolicyText>
        </div>
      </div>
    </Article>
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import LegendChart from './../graphics/LegendChart'

import { mapGetters } from 'vuex'

import { variables } from '../../plugins/util'

import { scaleSequential } from 'd3-scale'
import { bxLine, bxBars, bxArea, bxCircles, bxLines } from 'd3nic'
import { interpolateRgbBasis } from 'd3-interpolate'

import { fillOpacityMouseout, fillOpacityMouseover, opacityMouseover, opacityMouseout } from '../../plugins/graphics'

const variableInfo = variables.info_iri

const fnColor = scaleSequential()
// ["#0571b0", "#92c5de", "#f7f7f7", "#f4a582", "#ca0020"],
  .interpolator(interpolateRgbBasis(['#2c7bb6', '#abd9e9', '#ffffbf', '#fdae61', '#d7191c']))

/* const typeColors = {
  T: '#045a8d',
  RT: '#2b8cbe',
  RE: '#74a9cf'
} */

const typeColors = {
  T: '#045a8d', // '#045a8d',
  RT: '#3690c0', // '#2b8cbe',
  RE: '#a6bddb' // '#74a9cf'
}

const baseConfigs = [
  {
    id: 'iri',
    formatType: '.2f',
    baseDomain: [0, 1], // [0.4, 0.6],
    fnTooltips: d => [
      { name: 'IRI', value: d.info_iri, color: fnColor(d.info_iri), formatType: '.3f' }
    ]
  },
  {
    id: 'dyn_iri',
    formatType: '.2f',
    baseDomain: [0, 1], // [0.4, 0.6],
    fnTooltips: d => [
      { name: 'DynIRI', value: d.info_dyn_iri, color: fnColor(d.info_dyn_iri), formatType: '.2f' }
    ]
  }
]

const typeConfigs = [
  {
    id: 'iri_type',
    formatType: '~s',
    bandPaddingInner: 1,
    // baseDomain: [0.4, 0.6],
    fnTooltips: d => [
      { name: 'IRI Tweets', value: d.info_iri_T, color: typeColors.T, formatType: '.2f' },
      { name: 'IRI Retweets', value: d.info_iri_RT, color: typeColors.RT, formatType: '.2f' },
      { name: 'IRI Replies', value: d.info_iri_RE, color: typeColors.RE, formatType: '.2f' }
    ]
  },
  {
    id: 'dyn_iri_type',
    formatType: '~s',
    bandPaddingInner: 1,
    padding: { top: 30 },
    // baseDomain: [0.4, 2],
    fnTooltips: d => [
      { name: 'DynIRI Retweets', value: d.info_dyn_iri_RT, color: typeColors.RT, formatType: '.2f' },
      { name: 'DynIRI Replies', value: d.info_dyn_iri_RE, color: typeColors.RE, formatType: '.2f' }
    ]
  }
]

const getBarsComponent = () => bxBars()
  .fnDefined(d => d.base_value !== null)
  .fnLowValue(0)
  .fnHighValue(d => d.base_value)
  .fnStrokeWidth(0)
  .fnFill(d => fnColor(d.base_value))// 'url(#base-iri-gradient)')
  .fnOn('mouseover', fillOpacityMouseover)
  .fnOn('mouseout', fillOpacityMouseout)

const getAreaComponent = (fn, color) =>
  bxArea()
    .fnDefined(d => ![null, undefined].includes(fn(d)))
    .fnLowValue(0)
    .fnHighValue(fn)
    .fnFillOpacity(0)
    .fnFill(color)

const getLineComponent = (fn, color) =>
  bxLine()
    .fnDefined(d => ![null, undefined].includes(fn(d)))
    .fnValue(fn)
    .fnFillOpacity(0)
    .fnStroke(color)
    .fnStrokeWidth(3)

const getCirclesComponent = (fn, color) => bxCircles()
  .fnDefined(d => ![null, undefined].includes(fn(d)))
  .fnValue(fn)
  .fnFill(color)
  .fnRadius(d => 5)
  .fnStrokeWidth(d => 0)
  .fnOpacity(d => 0)
  .fnFillOpacity(d => 1)
  .fnOn('mouseover', opacityMouseover)
  .fnOn('mouseout', opacityMouseout)

const getLinesComponent = (fn, color) =>
  bxLines()
    .fnDefined(d => fn(d) != null)
    .fnLowValue(d => 0)
    .fnHighValue(fn)
    .fnFillOpacity(d => 0)
    .fnStrokeWidth(d => 1)
    .fnStroke(d => color)
    .fnOpacity(d => 0)
    .fnOn('mouseover', opacityMouseover)
    .fnOn('mouseout', opacityMouseout)

const getLevelLineComponent = (level) =>
  bxLine()
    .fnValue(level)
    .fnFillOpacity(0)
    .fnStrokeWidth(2)
    .fnStroke('#878787')
    .fnStrokeDasharray([2, 4])

// retweets: # 2b8cbe ( before #24A122 )
// tweets: # 045a8d
// replies: # 74a9cf ( before #FB7F00 )

const getBaseComponents = () => [
  getBarsComponent(),
  getLevelLineComponent(0.25),
  getLevelLineComponent(0.5),
  getLevelLineComponent(0.75)
]

const getTypeComponents = () => [
  getAreaComponent(d => d.type_T_rank, typeColors.T),
  getAreaComponent(d => d.type_RT_rank, typeColors.RT),
  getAreaComponent(d => d.type_RE_rank, typeColors.RE),
  getLineComponent(d => d.type_T_rank, typeColors.T),
  getLineComponent(d => d.type_RT_rank, typeColors.RT),
  getLineComponent(d => d.type_RE_rank, typeColors.RE),
  getLinesComponent(d => d.type_T_rank !== null ? 2 : 1, '#878787'),
  getCirclesComponent(d => d.type_T_rank, typeColors.T),
  getCirclesComponent(d => d.type_RT_rank, typeColors.RT),
  getCirclesComponent(d => d.type_RE_rank, typeColors.RE)
]

export default {
  components: {
    TimeseriesChart,
    LegendChart
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
    variableInfo () {
      return variableInfo
    },
    iriTimereries () {
      return this.timeseries
        .map(d => ({
          ...d,
          base_value: d[['info_iri', 'info_dyn_iri'][this.toggle]],
          type_T_value: this.toggle === 0 ? null : d.info_iri_T,
          type_RT_value: d[['info_iri_RT', 'info_dyn_iri_RT'][this.toggle]],
          type_RE_value: d[['info_iri_RE', 'info_dyn_iri_RE'][this.toggle]]
        }))
        .map(d => ({
          ...d,
          ranks: (d.type_T_value
            ? ['type_T_value', 'type_RT_value', 'type_RE_value'].sort((a, b) => d[a] - d[b])
            : ['type_RT_value', 'type_RE_value'].sort((a, b) => d[a] - d[b]))
            .reduce((acc, cur, i) => ({ ...acc, [cur]: i }), {})
        }))
        .map(d => ({
          ...d,
          type_T_rank: d.type_T_value !== null ? d.ranks.type_T_value : null,
          type_RT_rank: d.ranks.type_RT_value,
          type_RE_rank: d.ranks.type_RE_value
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
