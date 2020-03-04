<template>
  <svg
    id="map-chart"
    width="0"
    height="0"
    :style="{ 'background-color': backgroundColor }"
  >
    <foreignObject
      id="map-chart__hover"
      x="0"
      y="20"
      :width="size ? size.width : 0"
      :height="size ? size.height : 0"
      style="pointer-events: none;"
    >
      <span>{{ hover ? hover.locationName : '' }}</span>
    </foreignObject>
  </svg>
</template>

<script>
import * as d3nic from 'd3nic'

import { zoom, zoomIdentity } from 'd3-zoom'
import { select, event } from 'd3-selection'

import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'MapCard',
  props: {
    size: Object,
    data: Array,
    colorMapping: Object
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
      location: 'getLocation'
    })
  },
  watch: {
    hover (value) {
      this.geoRegions.join()
        .style('fill-opacity', d => d === value ? 0.5 : null)
    },
    colorMapping (value) {
      this.paintMap()
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()
    this.draw()
  },
  methods: {
    ...mapMutations({
      setLocationId: 'setLocationId'
    }),
    createComponents () {
      this.geoRegions = d3nic.geoRegions()
        .fnValue(d => d.geometry)
        .fnFill(d => 'grey')
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
    draw () {
      // next tick to be sure to receive the size
      this.$nextTick(() => {
        this.chart
          .size(this.size)
          .data(this.data)
          .draw({ duration: 500 })

        this.paintMap()

        select('#map-chart__hover').raise()

        this.fnZoom = zoom()
          .scaleExtent([1, 8])
          .translateExtent([[0, 0], Object.values(this.size)])
          .on('zoom', this.onZoom)

        this.svg = select('svg#map-chart').call(this.fnZoom)

        this.fnZoom.scaleTo(this.svg, 1)
      })
    },
    paintMap () {
      this.geoRegions.join()
        .style('fill', d => this.colorMapping[d.locationId])
    },
    onZoom () {
      this.chart.group().attr('transform', event.transform)
    },
    onClick (value) {
      this.geoRegions.event().stopPropagation()

      this.setLocationId(value ? value.locationId : null)

      this.geoRegions.join()
        .style('stroke-width', null)
        .filter(d => d === value)
        .style('stroke-width', 2)
        .raise()

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
