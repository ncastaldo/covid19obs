<template>
  <div>
    <svg id="time-chart" />
  </div>
</template>

<script>
import { csv } from 'd3-fetch'
import * as d3nic from 'd3nic'

import { mapGetters } from 'vuex'

export default {
  name: 'TimeChart',
  data () {
    return {
      timeseries: null,

      chart: null,
      lineEpiConfirmed: null,
      lineEpiDead: null,
      lineEpiRecovered: null,

      hover: null
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  },
  watch: {
    location (value) {
      csv(`/assets/epi/EPI_${value.locationId}.csv`).then((data) => {
        this.timeseries = data
      })
    },
    timeseries (value) {
      this.chart
        .data(value)
        .draw({ duration: 500 })
    }
  },
  created () {
    this.createComponents()
    this.createChart()
  },
  methods: {
    getBxLine (fnValue) {
      return d3nic.bxLine()
        .fnValue(fnValue)
        .fnFillOpacity(0)
        .fnStrokeWidth(2)
    },
    createComponents () {
      this.lineEpiConfirmed = this.getBxLine(d => d.EPI_confirmed_cum).fnStroke('orange')
      this.lineEpiDead = this.getBxLine(d => d.EPI_dead_cum).fnStroke('black')
      this.lineEpiRecovered = this.getBxLine(d => d.EPI_recovered_cum).fnStroke('green')
    },
    createChart () {
      this.chart = d3nic.bxChart()
        .selector('#time-chart')
        .fnKey(d => d.date)
        .fnBandValue(d => d.date)
        .size({ width: 800, height: 300 })
        .components([
          this.lineEpiConfirmed,
          this.lineEpiDead,
          this.lineEpiRecovered
        ])
    }
  }
}
</script>
