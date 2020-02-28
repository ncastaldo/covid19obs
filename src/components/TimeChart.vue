<template>
  <div
    ref="container"
    style="width: 100%; height:100%"
  >
    <svg id="time-chart" />
  </div>
</template>

<script>
import { dsv } from 'd3-fetch'
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
      dsv(';', `/assets/infodemics/infodemics_${value.locationId}.csv`).then((data) => {
        console.log(data)
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
  mounted () {
    const size = {
      width: this.$refs.container.offsetWidth,
      height: 300
    }
    this.chart.size(size)
  },
  methods: {
    getBxLine (fnValue) {
      return d3nic.bxLine()
        .fnValue(fnValue)
        .fnFillOpacity(0)
        .fnStrokeWidth(2)
    },
    createComponents () {
      this.lineEpiConfirmed = this.getBxLine(d => d.EPI_confirmed_cum).fnStroke('red')
      this.lineEpiDead = this.getBxLine(d => d.EPI_dead_cum).fnStroke('black')
      this.lineEpiRecovered = this.getBxLine(d => d.EPI_recovered_cum).fnStroke('green')
    },
    createChart () {
      this.chart = d3nic.bxChart()
        .selector('#time-chart')
        .fnKey(d => d.date)
        .fnBandValue(d => new Date(d.date).toLocaleDateString())
        .components([
          d3nic.bxAxisX().tickFormat((d, i) => i % 10 === 0 ? d : ''),
          d3nic.bxAxisY(),
          this.lineEpiConfirmed,
          this.lineEpiDead,
          this.lineEpiRecovered
        ])
    }
  }
}
</script>
