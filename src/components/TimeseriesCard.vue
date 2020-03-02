<template>
  <v-card>
    <v-tabs
      ref="tabs"
      height="40"
      fixed-tabs
    >
      <v-tab>ciao</v-tab>
      <v-tab>ciao2</v-tab>
    </v-tabs>
    <v-card-subtitle
      ref="subtitle"
      class="pa-1"
    >
      sub
    </v-card-subtitle>
    <v-card-actions class="pa-0 ">
      <TimeseriesChart
        :id="`${id}-svg`"
        :size="chartSize"
        :values="values"
        :data="[1, 2, 3]"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import * as d3nic from 'd3nic'

import TimeseriesChart from './TimeseriesChart'

export default {
  components: {
    TimeseriesChart
  },
  props: {
    id: String
  },
  data () {
    return {
      values: null,
      chartSize: null
    }
  },
  mounted () {
    this.updateChartSize()
  },
  created () {
    this.values = [
      {
        id: 'emo_1',
        component: d3nic.bxBars()
      }
    ]
  },
  methods: {
    updateChartSize () {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight -
          (this.$refs.tabs.$el.clientHeight + this.$refs.subtitle.clientHeight)
      }
    }
  }
}
</script>

<style>

</style>
