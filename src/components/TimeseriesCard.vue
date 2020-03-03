<template>
  <v-card>
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
        :data="[1,1,1,1,1,1,1,1,1,1,1,1,].map(d => Math.random())"
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
    id: String,
    charts: Array
  },
  data () {
    return {
      values: null,
      chartSize: null
    }
  },
  mounted () {
    this.updateChartSize()
    console.log(this.charts)
  },
  created () {
    this.values = [
      {
        id: 'emo_1',
        component: d3nic.bxBars().fnFill(d => this.$vuetify.theme.themes.dark.primary)
      }
    ]
  },
  methods: {
    updateChartSize () {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight - this.$refs.subtitle.clientHeight
      }
      console.log(this.chartSize)
    }
  }
}
</script>

<style>

</style>
