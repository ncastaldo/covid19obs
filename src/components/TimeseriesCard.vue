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
        :values="chartValues"
        :data="chartData"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import * as d3nic from 'd3nic'
import { mapGetters } from 'vuex'

import TimeseriesChart from './TimeseriesChart'

export default {
  components: {
    TimeseriesChart
  },
  props: {
    id: String,
    chartConfig: Object
  },
  data () {
    return {
      chartSize: null
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation'
    }),
    chartData () {
      return this.location ? this.location.timeseries : []
    },
    chartValues () {
      return this.chartConfig.values.map(v => ({
        ...v,
        component: v.fns.reduce((component, fn) => {
          return component[fn.name](d => d[fn.field])
        }, d3nic[v.type]())
      }))
    }
  },
  mounted () {
    this.updateChartSize() // since refs are not reactive
  },
  methods: {
    updateChartSize () {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight - this.$refs.subtitle.clientHeight
      }
    }
  }
}
</script>

<style>

</style>
