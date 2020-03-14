<template>
  <div
    class="pa-0 ma-0 "
  >
    <svg
      id="map-chart"
      width="0"
      height="0"
      :style="{ 'background-color': backgroundColor }"
      @click="() => onClick(null)"
    >
      <foreignObject
        id="map-chart__hover"
        x="0"
        y="20"
        :width="size ? size.width : 0"
        :height="size ? size.height : 0"
        style="pointer-events: none;"
      >
        <span
          v-if="hover"
          class="px-2 pt-4 pb-0"
          style="background-color: rgba(0,0,0,0.4)"
        >{{ hover.locationName }}</span>
      </foreignObject>
    </svg>
  </div>
</template>

<script>
import * as d3nic from 'd3nic'

import { zoom, zoomIdentity } from 'd3-zoom'
import { select, event } from 'd3-selection'

import { mapActions, mapGetters } from 'vuex'

const ZOOM_SCALE_MIN = 2
const ZOOM_SCALE_MAX = 70

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
    size (value) {
      if (this.chart.group()) {
        this.chart
          .size(value)
          .draw()

        if (!this.$isMobile()) {
          this.svg.call(this.fnZoom.transform, this.getZoomIdentity())
        }
      }
    },
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
    createComponents () {
      this.geoRegions = d3nic.geoRegions()
        .fnValue(d => d.geometry)
        .fnFill(d => 'grey')
        .fnStroke(d => '#000')
        .fnBefore(s => s.style('vector-effect', 'non-scaling-stroke'))
        .fnOn('mouseover touchstart', d => { this.hover = d })
        .fnOn('mouseout mouseup touchend', d => { this.hover = null })
        .fnOn('click', this.onClick)
    },
    createChart () {
      this.chart = d3nic.geoChart()
        .selector('#map-chart')
        .padding({ top: 0, right: 0, bottom: 0, left: 0 })
        .fnKey(d => d.locationId)
        .components([this.geoRegions])
    },
    ...mapActions({
      setLocationId: 'setLocationId'
    }),
    draw () {
      // next tick to be sure to receive the size
      this.$nextTick(() => {
        this.chart
          .size(this.size)
          .data(this.data)
          .draw({ duration: this.$isMobile() ? 0 : 500 })

        this.paintMap()

        select('#map-chart__hover').raise()

        this.fnZoom = zoom()
          .scaleExtent([ZOOM_SCALE_MIN, ZOOM_SCALE_MAX])
          .translateExtent([[0, 0], Object.values(this.size)])
          .on('zoom', this.onZoom)

        this.svg = select('svg#map-chart')
          .call(this.fnZoom)
          .on('dblclick.zoom', null)

        this.fnZoom.scaleTo(this.svg, ZOOM_SCALE_MIN)
      })
    },
    paintMap () {
      this.geoRegions.join()
        .style('fill', d => this.colorMapping[d.locationId])
    },
    onZoom () {
      this.chart.group().attr('transform', event.transform)
    },
    getZoomIdentity () {
      const width = this.chart.size().width
      const height = this.chart.size().height
      const bounds = this.location.locationId !== '_WORLD'
        ? this.geoRegions.fnGeoPath().bounds(this.location.geometry)
        : [[0, 0], [width, height]]

      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const scale = Math.max(ZOOM_SCALE_MIN, Math.min(ZOOM_SCALE_MAX, 0.8 / Math.max(dx / width, dy / height)))
      const translate = [width / 2 - scale * x, height / 2 - scale * y]
      return zoomIdentity.translate(translate[0], translate[1]).scale(scale)
    },
    onClick (value) {
      this.geoRegions.event() &&
      this.geoRegions.event().stopPropagation()

      const newLocationId = !value || value.locationId === this.location.locationId
        ? '_WORLD' // world is the default
        : value.locationId

      this.setLocationId(newLocationId)

      this.geoRegions.join()
        .style('stroke-width', null)
        .filter(d => d.locationId === newLocationId)
        .style('stroke-width', 1)

      if (!this.$isMobile()) {
        this.svg.transition()
          .duration(750)
          .call(
            this.fnZoom.transform,
            this.getZoomIdentity()
          )
      }
    }
  }
}

</script>
