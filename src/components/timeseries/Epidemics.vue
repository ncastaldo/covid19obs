<template>
  <div>
    <div class="text-justify">
      <div class="headline">
        Epidemics
      </div>
      <div class="">
        Evolution over time of the covid-19 epidemics, in terms of confirmed cases and deaths.
      </div>
    </div>
    <div>
      <v-btn-toggle
        v-model="toggle"
        rounded
        mandatory
        dense
      >
        <v-btn>Cumulative</v-btn>
        <v-btn>Daily</v-btn>
      </v-btn-toggle>
    </div>
    <TimeseriesChart
      v-for="cfg in configs"
      :id="cfg.id"
      :key="cfg.id"
      :height="200"
      :timeseries="timeseries"
      :config="cfg"
    />
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import { mapGetters } from 'vuex'

import { bxBars } from 'd3nic'

import {
  epiConfirmed,
  epiConfirmedNew,
  epiDead,
  epiDeadNew
} from '../../assets/variables'

import {
  fillOpacityMouseover,
  fillOpacityMouseout
} from '../../plugins/graphics'

// forcing the accessor value to be equal to the 'id'
const getConfig = ({ id, accessor, name, formatType, color }) => ({
  id,
  scaleType: 'scaleLinear',
  baseDomain: [0, 2],
  fixedDomain: null,
  formatType,
  fnComponents: () => [
    bxBars()
      .fnDefined(d => d[accessor] !== null)
      .fnLowValue(d => 0)
      .fnHighValue(d => d[accessor])
      .fnFill(d => color)
      .fnOn('mouseover', fillOpacityMouseover)
      .fnOn('mouseout', fillOpacityMouseout)
  ],
  fnTooltips: d => [
    { name, value: d[accessor], color, formatType: '.3s' }
  ]
})

const cumulativeConfigs = [
  getConfig({ ...epiConfirmed, id: 'epi_confirmed', accessor: 'epi_confirmed' }),
  getConfig({ ...epiDead, id: 'epi_dead', accessor: 'epi_dead' })
]

const newConfigs = [
  getConfig({ ...epiConfirmedNew, id: 'epi_confirmed', accessor: 'epi_confirmed_new' }),
  getConfig({ ...epiDeadNew, id: 'epi_dead', accessor: 'epi_confirmed_new' })
]

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      configList: [
        cumulativeConfigs,
        newConfigs
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
