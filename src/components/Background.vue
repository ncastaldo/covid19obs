<template>
  <svg
    style="position: absolute; left:0; top: 0; z-index: -0"
    viewBox="0 0 500 300"
    preserveAspectRatio="xMidYMid"
    width="100%"
    height="100%"
  >
    <g opacity="0.2">
      <path
        v-for="l in locationPaths"
        :key="l.locationId"
        :d="l.path"
        :fill="inContinent(l) ? '#aaa' : 'none'"
        :stroke-width="inContinent(l) ? 0 : 0.5"
        stroke="#aaa"
      />
      <circle
        :cx="circle.cx"
        :cy="circle.cy"
        :r="circle.r"
        fill="rgb(31, 121, 179)"
      />
    </g>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex'

import { geoMercator, geoPath, geoCentroid } from 'd3-geo'

export default {
  data () {
    return {
      fnProjection: geoMercator(),
      fnGeoPath: geoPath(),
      locationPaths: []
    }
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations',
      location: 'location/getLocation',
      continent: 'location/getContinent'
    }),
    circle () {
      if (!this.location.geometry) { return { cx: 0, cy: 0, r: 0 } }
      const [cx, cy] = this.fnProjection(geoCentroid(this.location.geometry))
      const r = 10
      return { cx, cy, r }
    },
    world () {
      return {
        type: 'FeatureCollection',
        features: this.locations.map(l => ({ ...l, type: 'Feature' }))
      }
    }
  },
  mounted () {
    this.fnProjection.fitSize([500, 300], this.world)
    this.fnGeoPath.projection(this.fnProjection)

    this.locationPaths = this.locations
      .map(l => ({
        ...l,
        path: this.fnGeoPath(l.geometry)
      }))

    console.log(this.locationPaths)
  },
  methods: {
    inContinent (l) {
      return this.location.locationId === '_WORLD' ||
      l.continentId === this.continent.continentId
    }
  }
}
</script>

<style>

</style>
