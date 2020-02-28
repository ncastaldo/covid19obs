<template>
  <div>
    <svg id="map-chart" />
  </div>
</template>

<script>
import * as d3nic from 'd3nic'
import { zoom } from 'd3-zoom'
import { select, event } from 'd3-selection'

import world from '../assets/world.json'

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
    const fnZoom = zoom().scaleExtent([1, 8]).on('zoom', this.zoomed)
    select('svg#map-chart').call(fnZoom)

    this.chart
      .data(world.features)
      .draw()
  },
  created () {
    this.createComponents()
    this.createChart()
  },
  methods: {
    createComponents () {
      this.geoRegions = d3nic.geoRegions()
        .fnValue(d => d.geometry)
        .fnFill(d => '#000')
    },
    createChart () {
      this.chart = d3nic.geoChart()
        .selector('#map-chart')
        .fnKey(d => d.properties.adm0_a3)
        .size({ width: 800, height: 800 })
        .components([this.geoRegions])
    },
    zoomed () {
      this.geoRegions.join().attr('transform', event.transform)
    }
  }
}
</script>
