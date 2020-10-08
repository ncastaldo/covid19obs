<template>
  <div>
    <Article>
      <div class="text-center py-2">
        <div class="headline py-1 ">
          Epidemics
        </div>
        <div class="py-1">
          Evolution over time of the covid-19 epidemics, in terms of confirmed cases and deaths.
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
      v-for="(config,i) in configs"
      :id="['confirmed', 'tests', 'dead'][i]"
      :key="['confirmed', 'tests', 'dead',][i]"
      :height="160"
      :timeseries="epiTimeseries"
      :config="config"
      :getComponents="getComponents"
      :transition="{duration: 500, delay: i*250}"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { bxBars } from 'd3nic'

import variableList from '../../assets/variables'

import {
  fillOpacityMouseover,
  fillOpacityMouseout
} from '../../plugins/graphics'

// forcing the accessor value to be equal to the 'id'
const getConfig = ({ id, values, name, formatType, color }) => ({
  id,
  scaleType: 'scaleLinear',
  baseDomain: [0, 2],
  fixedDomain: null,
  formatType,
  values,
  fnTooltips: d => values
    .map(({ name, fnValue, fnColor }) => ({
      name, value: fnValue(d), color: fnColor(d), formatType: '.2s'
    }))
})

// it receives a config object
const getComponents = ({ values }) => values
  .map(({ fnValue, fnColor }) =>
    bxBars()
      .fnDefined(d => fnValue(d) !== null)
      .fnLowValue(0)
      .fnHighValue(fnValue)
      .fnFill(fnColor)
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout))

const epidemicVariableIdList = [
  'epi_confirmed_new', 'epi_tests_new', 'epi_dead_new',
  'epi_confirmed', 'epi_tests', 'epi_dead'
]

const variables = variableList
  .reduce((acc, cur) => ({
    ...acc,
    [cur.id]: cur
  }), {})

const configs = epidemicVariableIdList
  .map(epiVarId => variables[epiVarId])
  .map((obj, i, array) => getConfig({
    ...obj,
    values: [{
      name: obj.name, // because equal to variable
      fnValue: d => d[[
        'epi_confirmed_value',
        'epi_tests_value',
        'epi_dead_value'][i % 3]],
      fnColor: () => obj.color // because equal to variable
    }]
  }))

const configList = [
  [configs[0], configs[1], configs[2]],
  [configs[3], configs[4], configs[5]]
]

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      configList,
      getComponents,
      toggle: 0
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries'
    }),
    configs () {
      return this.configList[this.toggle]
    },
    epiTimeseries () {
      return this.timeseries
        .map(d => ({
          ...d,
          epi_confirmed_value: d[this.configs[0].id],
          epi_tests_value: d[this.configs[1].id],
          epi_dead_value: d[this.configs[2].id]
        }))
    }
  }
}
</script>

<style>

</style>
