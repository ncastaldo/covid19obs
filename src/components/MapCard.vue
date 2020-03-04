<template>
  <v-card
    ref="card"
  >
    <v-card-title>
      {{ click!== null ? click.locationName : '- - -' }}
    </v-card-title>
    <v-card-subtitle>
      {{ hover!== null ? hover.locationName : '- - -' }}
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

import { scaleSequential, scaleLog } from 'd3-scale'
import { interpolateViridis } from 'd3-scale-chromatic'
import { zoom, zoomIdentity } from 'd3-zoom'
import { select, event } from 'd3-selection'

import { mapMutations, mapGetters } from 'vuex'

const fnScaleLog = scaleLog()
const fnColor = scaleSequential(d => interpolateViridis(fnScaleLog(d)))

export default {
  name: 'MapCard',
  props: {
    size: Object
  },
  data () {
    return {
      chart: null,
      geoRegions: null,

      svg: null,

      backgroundColor: this.$vuetify.theme.themes.dark.semiBackground,

      hover: null,
      click: null
    }
  },
  computed: {
    ...mapGetters({
      locations: 'getLocations'
    })
  },
  watch: {
    hover (value) {
      this.geoRegions.join()
        .style('fill-opacity', d => d === value ? 0.7 : null)
    }
  },
  mounted () {
    const size = {
      width: this.$el.clientWidth,
      height: this.$el.clientWidth // width => square
    }

    fnScaleLog.domain([
      1,
      this.locations
        .map(l => l.timeseries[l.timeseries.length - 4].EPI_confirmed_cum)
        .reduce((max, v) => max < v ? v : max, 1)
    ])

    this.chart
      .size(size)
      .data(this.locations)
      .draw({ duration: 500 })

    // selectAll(this.geoRegions.join().nodes()).on('click', function () { console.log(event) })

    this.fnZoom = zoom()
      .scaleExtent([1, 8])
      .translateExtent([[0, 0], Object.values(size)])
      .on('zoom', this.onZoom)

    this.svg = select('svg#map-chart').call(this.fnZoom)

    this.fnZoom.scaleTo(this.svg, 1)
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
        .fnFill(d => {
          return d.timeseries.length ? fnColor(d.timeseries[d.timeseries.length - 4].EPI_confirmed_cum) : 'grey'
        })
        .fnStroke(d => '#fff')
        .fnBefore(s => s.style('vector-effect', 'non-scaling-stroke'))
        .fnOn('mouseover', d => { this.hover = d })
        .fnOn('mouseout', d => { this.hover = null })
        .fnOn('click', this.onClick)
    },
    createChart () {
      this.chart = d3nic.geoChart()
        .selector('#map-chart')
        .fnKey(d => d.locationId)
        .components([this.geoRegions])
    },
    onZoom () {
      this.chart.group().attr('transform', event.transform)
    },
    onClick (value) {
      const currentEvent = this.geoRegions.event()

      currentEvent.stopPropagation()
      this.setLocationId(value ? value.locationId : null)
      this.geoRegions.join()
        .style('stroke-width', d => d === value ? 1 : null)

      const width = this.chart.size().width
      const height = this.chart.size().height
      const bounds = this.geoRegions.fnGeoPath().bounds(value.geometry)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)))
      const translate = [width / 2 - scale * x, height / 2 - scale * y]

      this.svg.transition().duration(750).call(
        this.fnZoom.transform,
        zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      )
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
