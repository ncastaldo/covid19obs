<template>
  <v-card class="fill-height">
    <v-card-title ref="title">
      {{ location !== null ? location.locationName : '- - -' }}
    </v-card-title>
    <v-card-subtitle ref="subtitle">
      {{ hover!== null ? hover.locationName : '- - -' }}
    </v-card-subtitle>
    <v-card-actions class="pa-0">
      <MapChart
        :size="chartSize"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import * as d3nic from 'd3nic'

import MapChart from './MapChart'

import { scaleSequential, scaleLog } from 'd3-scale'
import { interpolateViridis } from 'd3-scale-chromatic'

import { mapMutations, mapGetters } from 'vuex'

const fnScaleLog = scaleLog()
const fnColor = scaleSequential(d => interpolateViridis(fnScaleLog(d)))

export default {
  name: 'MapCard',
  components: {
    MapChart
  },
  props: {
    size: Object
  },
  data () {
    return {
      chartSize: null,
      hover: null
      // color scales
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation',
      dateIndex: 'getDateIndex'
    })
  },
  watch: {
    dateIndex (value) {
      console.log(value)
    }
  },
  mounted () {
    this.updateChartSize() // since refs are not reactive
  },
  methods: {
    updateChartSize () {
      this.chartSize = {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight -
          0// (this.$refs.title.clientHeight + this.$refs.subtitle.clientHeight)
      } // height computed without considering the others
    }
  }
}

</script>
