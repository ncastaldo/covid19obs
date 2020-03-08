<template>
  <v-card v-resize:debounce="updateChartSize">
    <v-card-subtitle
      ref="subtitle"
      class="py-1"
    >
      <v-tooltip
        bottom
        max-width="300"
      >
        <template
          v-slot:activator="{ on }"
        >
          <v-btn
            depressed
            class="px-0 mr-2"
            icon
            v-on="on"
          >
            <v-icon size="20">
              mdi-information-outline
            </v-icon>
          </v-btn>
        </template>
        <div
          class="text-left"
        >
          {{ chartConfig.tooltip }}
        </div>
      </v-tooltip>
      <v-tooltip
        v-for="bv in btnValues"
        :key="bv.id"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            depressed
            height="20"
            class="px-0 mx-0 "
            tile=""
            v-on="on"
          >
            <v-icon
              x-small
              class="pr-1"
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
        :chartConfig="chartConfig"
        :values="chartValues"
        :data="chartData"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import * as d3nic from 'd3nic'
import { mapGetters } from 'vuex'
import { stack } from 'd3-shape'

import resize from 'vue-resize-directive'

import TimeseriesChart from './TimeseriesChart'

export default {
  components: {
    TimeseriesChart
  },
  directives: {
    resize
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
      timeseries: 'getTimeseries'
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
      if (!this.timeseries) return []
      if (!this.chartConfig.stacked) { return this.timeseries }
      const keys = this.chartConfig.values.map(v => v.id).reverse()
      const fnStack = stack().keys(keys)
      const stackedData = fnStack(this.timeseries)
      return this.timeseries.map((d, i) => ({
        ...d,
        ...keys.reduce((acc, k, j) => ({
          ...acc,
          [`stack_${k}`]: stackedData[j][i].filter((_, i) => i <= 1)
        }), {})
      }))
    },
    chartValues () {
      return this.chartConfig.values.map((v, k) => ({
        ...v,
        component: this.chartConfig.stacked
          ? d3nic[v.type]()
            .fnLowValue(d => (d[`stack_${v.id}`][0]) + (this.chartConfig.scaleType === 'scaleLog' ? 1 : 0))
            .fnHighValue(d => (d[`stack_${v.id}`][1]) + (this.chartConfig.scaleType === 'scaleLog' ? 1 : 0))
            .fnDefined(d => d[`stack_${v.id}`])
          : v.fns.reduce((component, fn, i) => {
            return component[fn.name](d => fn.type === 'field' ? d[fn.value] : fn.value)
              .fnDefined(d => fn.type === 'field' ? d[fn.value].length : true)
          }, d3nic[v.type]())
      }))
    },
    chartHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 200
        case 'sm': return 200
        case 'md': return 120
        case 'lg': return 120
        case 'xl': return 120
        default: return 300
      }
    }
  },
  mounted () {
    this.updateChartSize() // since refs are not reactive
  },
  methods: {
    updateChartSize () {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.chartHeight
      }
    }
  }
}
</script>

<style scoped>

</style>
