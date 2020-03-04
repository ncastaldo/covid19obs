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
import MapChart from './MapChart'

import { scaleSequential, scaleLog } from 'd3-scale'
import { interpolateViridis } from 'd3-scale-chromatic'

import { mapGetters } from 'vuex'

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
      locations: 'getLocations',
      dateIndex: 'getDateIndex'
    })
  },
  watch: {
    dateIndex (value) {
      console.log(this.locations.map(l => l.timeseries))
      const max = this.locations
        .filter(l => l.timeseries)
        .map(l => l.timeseries[this.dateIndex].EPI_confirmed_cum)
      console.log(max)

      // .reduce((max, value) => Math.max(max, value), 1)
      // fnScaleLog.domain([1, max])
      console.log(fnScaleLog.domain())
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
