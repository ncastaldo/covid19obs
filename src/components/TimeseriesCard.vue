<template>
  <v-card>
    <v-card-subtitle
      ref="subtitle"
      class=""
    >
      <v-tooltip
        v-for="bv in btnValues"
        :key="bv.id"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            depressed
            height="20"
            class="px-1 mx-1"
            v-on="on"
          >
            <v-icon
              x-small
              left
              :color="bv.color"
            >
              mdi-square
            </v-icon>
            <span class=".overline">{{ bv.label }}</span>
          </v-btn>
        </template>
        <span>{{ bv.tooltip }}</span>
      </v-tooltip>
    </v-card-subtitle>
    <v-card-actions class="pa-0">
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
    btnValues () {
      return this.chartConfig.values.map(v => ({
        id: v.id,
        color: v.color,
        label: v.label,
        tooltip: v.tooltip
      }))
    },
    chartData () {
      return this.location ? this.location.timeseries : []
    },
    chartValues () {
      return this.chartConfig.values.map(v => ({
        ...v,
        component: v.fns.reduce((component, fn) => {
          return component[fn.name](d => fn.type === 'field' ? d[fn.value] : fn.value)
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
