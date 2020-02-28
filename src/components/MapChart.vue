<template>
  <div
    ref="container"
    style="width: 100% height:100%"
  >
    <svg id="map-chart" />
    <ChartTooltip
      v-show="hover !== null"
    >
      <span v-if="hover !== null">
        <div>{{ hover.properties.admin }}</div>
      </span>
    </ChartTooltip>
  </div>
</template>

<script>
import * as d3nic from 'd3nic'
import { zoom, zoomIdentity } from 'd3-zoom'
import { select, event } from 'd3-selection'

import world from '../assets/map/world.json'
import { mapMutations } from 'vuex'

export default {
  name: 'MapChart',
  data () {
    return {
      chart: null,
      geoRegions: null,

      hover: null
    }
  },
  watch: {
    hover (value) {
      this.geoRegions.join().style('fill-opacity', d => d === value ? 0.8 : null)
    }
  },
  mounted () {
    const size = {
      width: this.$refs.container.offsetWidth,
      height: this.$refs.container.offsetHeight
    }

    const fnZoom = zoom()
      .scaleExtent([1, 7])
      .translateExtent([[0, 0], Object.values(size)])
      .on('zoom', this.zoomed)

    select('svg#map-chart').call(fnZoom)

    this.chart
      .size(size)
      .data(world.features)
      .draw({ duration: 500 })
  },
  created () {
    this.createComponents()
    this.createChart()
  },
  methods: {
    ...mapMutations({
      setLocationId: 'setLocationId'
    }),
    createComponents () {
      this.geoRegions = d3nic.geoRegions()
        .fnValue(d => d.geometry)
        .fnFill(d => '#000')
        .fnOn('mouseover', d => { this.hover = d })
        .fnOn('mouseout', d => { this.hover = null })
        .fnOn('click', d => { this.setLocationId(d.properties.adm0_a3) })
    },
    createChart () {
      this.chart = d3nic.geoChart()
        .selector('#map-chart')
        .fnKey(d => d.properties.adm0_a3)
        .components([this.geoRegions])
    },
    zoomed () {
      this.geoRegions.join().attr('transform', event.transform)
    }
  }
}
</script>
