<template>
  <v-card v-resize:debounce.250="updateChartSize">
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
        v-if="timeseries"
        :id="`${id}-svg`"
        :size="chartSize"
        :chartConfig="chartConfig"
        :timeseries="timeseries || []"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

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
    }
  },
  mounted () {
    this.updateChartSize() // since refs are not reactive
  },
  methods: {
    getChartHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 140
        case 'sm': return 140
        case 'md': return 120
        case 'lg': return 120
        case 'xl': return 120
        default: return 120
      }
    },
    updateChartSize () {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.getChartHeight()
      }
    }
  }
}
</script>

<style scoped>

</style>
