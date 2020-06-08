<template>
  <v-card v-resize:debounce.250="updateHeight">
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
    <TimeseriesChart
      v-if="timeseries"
      :id="`${id}-svg`"
      :height="height"
      :chartConfig="chartConfig"
      :timeseries="timeseries || []"
    />
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
      height: 130
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
    this.updateHeight() // since refs are not reactive
  },
  methods: {
    updateHeight () {
      const bp = this.$vuetify.breakpoint.name
      this.height = bp === 'xs'
        ? 130/* 140 */ : bp === 'sm'
          ? 130/* 140 */ : bp === 'md'
            ? 130 : bp === 'lg'
              ? 130 : 130
    }
  }
}
</script>

<style scoped>

</style>
