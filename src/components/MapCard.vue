<template>
  <v-card
    ref="card"
  >
    <v-card-title>
      {{ click!== null ? click.properties.admin : '- - -' }}
    </v-card-title>
    <v-card-subtitle>
      {{ hover!== null ? hover.properties.admin : '- - -' }}
    </v-card-subtitle>
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

import world from '../assets/map/world.json'
import { mapMutations } from 'vuex'

export default {
  name: 'MapCard',
  props: {
    size: Object
  },
  data () {
    return {
      chart: null,
      geoRegions: null,

      backgroundColor: this.$vuetify.theme.themes.dark.semiBackground,

      hover: null,
      click: null
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
    const size = {
      width: this.$el.clientWidth,
      height: this.$el.clientWidth // width => square
    }

    this.chart
      .size(size)
      .data(world.features)
      .draw({ duration: 500 })

    const fnZoom = zoom()
      .scaleExtent([2, 8])
      .translateExtent([[0, 0], Object.values(size)])
      .on('zoom', this.zoomed)

    const svg = select('svg#map-chart').call(fnZoom)

    fnZoom.scaleTo(svg, 2)
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
        .fnFill(d => this.$vuetify.theme.themes.dark.primary)
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

  bottom: 10;

  z-index: 1; /* In front of all */

  margin-left: 20px;
  margin-top: 20px;

  padding: 10px;

  background-color: rgba(30,30,30,0.8)

}

</style>
