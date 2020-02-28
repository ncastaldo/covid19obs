<template>
  <svg id="map-chart" />
</template>

<script>
import * as d3nic from 'd3nic'

export default {
  name: 'Map',
  props: {
    geoJson: Object
  },
  data () {
    return {
      chart: null,
      geoRegions: null
    }
  },
  mounted () {

  },
  created () {
    this.createComponents()
    this.createChart()
  },
  methods: {
    createComponents () {
      this.geoRegions = d3nic.geoRegions()
    },
    createChart () {
      this.chart = d3nic.geoChart()
        .selector('#map-chart')
        .fnKey(d => d.concept)
        .components([this.geoRegions])
    }
  }
}
</script>
