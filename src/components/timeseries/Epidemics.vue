<template>
  <div>
    <div>
      <v-btn-toggle
        v-model="toggle"
        rounded
        mandatory
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

const cumulativeConfigs = [
  {
    id: 'confirmed',
    fnComponents: () => [
      bxBars()
        .fnDefined(d => d.epi_confirmed != null)
        .fnLowValue(d => 0)
        .fnHighValue(d => d.epi_confirmed)
        .fnFill(d => 'red')
    ]
  },
  {
    id: 'dead',
    fnComponents: () => [
      bxBars()
        .fnDefined(d => d.epi_dead != null)
        .fnLowValue(d => 0)
        .fnHighValue(d => d.epi_dead)
        .fnFill(d => 'black')
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
        .fnFill(d => 'orange')
    ]
  },
  {
    id: 'dead',
    fnComponents: () => [
      bxBars()
        .fnDefined(d => d.epi_dead_new != null)
        .fnLowValue(d => 0)
        .fnHighValue(d => d.epi_dead_new)
        .fnFill(d => 'grey')
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
