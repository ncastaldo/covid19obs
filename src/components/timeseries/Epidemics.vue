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
  barsMouseover,
  barsMouseout
} from '../../plugins/graphics'

const cumulativeConfigs = [
  {
    id: 'confirmed',
    fnComponents: () => [
      bxBars()
        .fnDefined(d => d.epi_confirmed != null)
        .fnLowValue(d => 0)
        .fnHighValue(d => d.epi_confirmed)
        .fnFill(d => '#e34a33')
        .fnOn('mouseover', barsMouseover)
        .fnOn('mouseout', barsMouseout)
    ],
    fnTooltips: d => [
      { name: 'Conf', value: d.epi_confirmed, color: '#e34a33' }
    ]
  },
  {
    id: 'dead',
    fnComponents: () => [
      bxBars()
        .fnDefined(d => d.epi_dead != null)
        .fnLowValue(d => 0)
        .fnHighValue(d => d.epi_dead)
        .fnFill(d => '#8856a7')
        .fnOn('mouseover', barsMouseover)
        .fnOn('mouseout', barsMouseout)
    ],
    fnTooltips: d => [
      { name: 'Dead', value: d.epi_dead, color: '#8856a7' }
    ]
  }
]

const newConfigs = [
  {
    id: 'confirmed',
    fnComponents: () => [
      bxBars()
        .fnDefined(d => d.epi_confirmed_new != null)
        .fnLowValue(d => 0)
        .fnHighValue(d => d.epi_confirmed_new)
        .fnFill(d => '#e34a33')
        .fnOn('mouseover', barsMouseover)
        .fnOn('mouseout', barsMouseout)
    ],
    fnTooltips: d => [
      { name: 'Conf', value: d.epi_confirmed, color: '#e34a33' }
    ]
  },
  {
    id: 'dead',
    fnComponents: () => [
      bxBars()
        .fnDefined(d => d.epi_dead_new != null)
        .fnLowValue(d => 0)
        .fnHighValue(d => d.epi_dead_new)
        .fnFill(d => '#8856a7')
        .fnOn('mouseover', barsMouseover)
        .fnOn('mouseout', barsMouseout)
    ],
    fnTooltips: d => [
      { name: 'Dead', value: d.epi_dead, color: '#8856a7' }
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
