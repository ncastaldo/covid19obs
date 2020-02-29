<template>
  <v-card
    ref="container"
    class="ma-4 mr-2 mt-0 p-0"
  >
    <div
      v-show="hover"
      class="label"
    >
      {{ hover!== null ? hover.properties.admin : '' }}
    </div>
    <v-card-actions class="pa-0">
      <svg
        id="map-chart"
        :style="{ 'background-color': backgroundColor }"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import * as d3nic from 'd3nic'
import { zoom } from 'd3-zoom'
import { select, event } from 'd3-selection'

import config from '../../config'
import world from '../../assets/map/world.json'
import { mapMutations } from 'vuex'

export default {
  name: 'MapContainer',
  props: {
    size: Object
  },
  data () {
    return {
      chart: null,
      geoRegions: null,

      backgroundColor: config.colors.background,

      hover: null,
      click: null
    }
  },
  computed: {
    svgSize () {
      console.log(this.size)
      return {
        width: this.size.width - 4 * 6,
        height: this.size.height - 4 * 6
      }
    }
  },
  watch: {
    hover (value) {
      this.geoRegions.join()
        .style('fill-opacity', d => d === value ? 0.7 : null)
    },
    click (value) {
      this.setLocationId(value ? value.properties.adm0_a3 : null)
      this.geoRegions.join()
        .style('stroke-width', d => d === value ? 1 : null)
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.svgSize)
      this.chart
        .size(this.svgSize)
        .data(world.features)
        .draw({ duration: 500 })

      const fnZoom = zoom()
        .scaleExtent([2, 8])
        .translateExtent([[0, 0], Object.values(this.svgSize)])
        .on('zoom', this.zoomed)

      const svg = select('svg#map-chart').call(fnZoom)

      fnZoom.scaleTo(svg, 2)
    })
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
      // palette https://colorhunt.co/palette/156620
      this.geoRegions = d3nic.geoRegions()
        .fnValue(d => d.geometry)
        .fnFill(d => config.colors.primary)
        .fnStroke(d => '#fff')
        .fnBefore(s => s.style('vector-effect', 'non-scaling-stroke'))
        .fnOn('mouseover', d => { this.hover = d })
        .fnOn('mouseout', d => { this.hover = null })
        .fnOn('click', d => { this.click = d === this.click ? null : d })
    },
    createChart () {
      this.chart = d3nic.geoChart()
        .selector('#map-chart')
        .fnKey(d => d.properties.adm0_a3)
        .components([this.geoRegions])
    },
    zoomed () {
      this.chart.group().attr('transform', event.transform)
    }
  }
}
</script>

<style scoped>

.label {
  pointer-events: none;
  position: fixed;

  z-index: 1; /* In front of all */

  margin-left: 20px;
  margin-top: 20px;

  padding: 10px;

  background-color: rgba(30,30,30,0.8)

}

</style>
