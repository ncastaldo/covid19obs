<template>
  <svg
    style="position: absolute; left:0; top: 0; z-index: -0"
    viewBox="0 0 500 300"
    preserveAspectRatio="xMidYMid"
    width="100%"
    height="100%"
  >
    <g opacity="0.1">
      <path
        v-for="l in locationPaths"
        :key="l.locationId"
        :d="l.path"
        :stroke-width="0.5"
        fill="#ddd"
        stroke="#999"
      />
      <circle
        v-for="(c, i) in circles"
        :key="i"
        :cx="c.cx"
        :cy="c.cy"
        :r="c.r"
        :fill="c.color"
      />
    </g>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex'

import { geoMercator, geoPath, geoCentroid } from 'd3-geo'

export default {
  props: {
    locationList: Array
  },
  data () {
    return {
      fnProjection: geoMercator(),
      fnGeoPath: geoPath(),
      locationPaths: []
    }
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations'
    }),
    isWorld () {
      return this.locationList.length === 1 && !this.locationList[0].geometry
    },
    circles () {
      if (this.isWorld) { return [{ cx: 0, cy: 0, r: 0 }] }
      const r = 10
      return this.locationList
        .map(l => [...this.fnProjection(geoCentroid(l.geometry)), l.regionColor])
        .map(([cx, cy, color]) => ({ cx, cy, r, color }))
    },
    world () {
      return {
        type: 'FeatureCollection',
        features: this.locations.map(l => ({ ...l, type: 'Feature' }))
      }
    }
  },
  created () {
    this.fnProjection.fitSize([500, 300], this.world)
    this.fnGeoPath.projection(this.fnProjection)

    this.locationPaths = this.locations
      .map(l => ({
        ...l,
        path: this.fnGeoPath(l.geometry)
      }))
  }
}
</script>

<style>

</style>
