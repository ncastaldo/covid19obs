<template>
  <div>
    <Article>
      <div class="py-2">
        <div class="headline text-center py-1 ">
          Epidemic Indices
        </div>
        <div class="text-justify py-1">
          Researchers have found a correlation between the evolution of the COVID-19 epidemic and the evolution of the corresponding infodemic in a region. Here, we report official daily and cumulative number of cases and deaths due to COVID-19.
          <br>
          Source: <a href="https://ourworldindata.org/coronavirus-source-data">Our World in Data</a>
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
        <v-btn>Daily</v-btn>
        <v-btn>Cumulative</v-btn>
      </v-btn-toggle>
    </div>
    <TimeseriesChart
      id="cases"
      :height="200"
      :timeseries="epiTimeseries"
      :config="casesConfig"
      :getComponents="getCasesBarsComponents"
    />
    <TimeseriesChart
      id="deaths"
      :height="200"
      :timeseries="epiTimeseries"
      :config="deathsConfig"
      :getComponents="getDeathsBarsComponents"
    />
    <TimeseriesChart
      v-if="false"
      id="rt"
      :height="200"
      :timeseries="epiTimeseries"
      :config="rtConfig"
      :getComponents="getRtComponents"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { bxBars, bxLine, bxArea } from 'd3nic'

import {
  fillOpacityMouseover,
  fillOpacityMouseout
} from '../../plugins/graphics'

const casesConfigs = [
  {
    id: 'epi_cases_new',
    color: '#e34a33',
    formatType: '~s',
    scaleType: 'scaleLinear',
    padding: { top: 30 },
    fnTooltips: d => [
      { name: 'Daily Cases', value: d.cases_value, color: '#e34a33', formatType: '~s' }
    ]
  },
  {
    id: 'epi_cases',
    color: '#e34a33',
    formatType: '~s',
    scaleType: 'scaleLinear',
    padding: { top: 30 },
    fnTooltips: d => [
      { name: 'Cumulative Cases', value: d.cases_value, color: '#e34a33', formatType: '~s' }
    ]
  }
]

const deathsConfigs = [
  {
    id: 'epi_deaths_new',
    formatType: '~s',
    scaleType: 'scaleLinear',
    padding: { top: 30 },
    fnTooltips: d => [
      { name: 'Daily Deaths', value: d.deaths_value, color: '#8856a7', formatType: '~s' }
    ]
  },
  {
    id: 'epi_deaths',
    formatType: '~s',
    scaleType: 'scaleLinear',
    padding: { top: 30 },
    fnTooltips: d => [
      { name: 'Cumulative Deaths', value: d.deaths_value, color: '#8856a7', formatType: '~s' }
    ]
  }
]

const rtConfig = {
  id: 'rt',
  formatType: '.2f',
  baseDomain: [0, 2],
  scaleType: 'scaleLinear',
  padding: { top: 30 },
  fnTooltips: d => [
    { name: 'Rt', value: d.epi_rt, color: '#000', formatType: '.2f' }
  ]
}

const getCasesBarsComponents = () => [
  bxBars()
    .fnDefined(d => d.cases_value !== null)
    .fnLowValue(0)
    .fnHighValue(d => d.cases_value)
    .fnStrokeWidth(0)
    .fnFill('#e34a33')
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout)
]

const getDeathsBarsComponents = () => [
  bxBars()
    .fnDefined(d => d.deaths_value !== null)
    .fnLowValue(0)
    .fnHighValue(d => d.deaths_value)
    .fnStrokeWidth(0)
    .fnFill('#8856a7')
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout)
]

const getRtComponents = () => [
  bxLine()
    .fnValue(1)
    .fnFillOpacity(0)
    .fnStrokeWidth(2)
    .fnStroke('#878787')
    .fnStrokeDasharray([6, 2]),
  bxLine()
    .fnDefined(d => d.epi_rt)
    .fnValue(d => d.epi_rt)
    .fnFillOpacity(0)
    .fnStrokeWidth(2)
    .fnStroke('#000')
]

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      casesConfigs,
      deathsConfigs,
      rtConfig,
      getCasesBarsComponents,
      getDeathsBarsComponents,
      getRtComponents,
      toggle: 0
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries'
    }),
    epiTimeseries () {
      return this.timeseries
        .map(d => ({
          ...d,
          cases_value: d[['epi_cases_new', 'epi_cases'][this.toggle]],
          deaths_value: d[['epi_deaths_new', 'epi_deaths'][this.toggle]]
        }))
    },
    casesConfig () {
      return this.casesConfigs[this.toggle]
    },
    deathsConfig () {
      return this.deathsConfigs[this.toggle]
    }
  }
}
</script>

<style>

</style>
