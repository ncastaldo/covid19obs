<template>
  <svg
    v-if="false"
    style="position: absolute; left:0; top: 0; z-index: -0"
    viewBox="0 0 500 300"
    preserveAspectRatio="xMidYMid"
    width="100%"
    height="100%"
  >
    <g opacity="0.15">
      <path
        v-for="p in pathObjects"
        :key="p.locationId"
        :d="p.path"
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
        opacity="0.5"
      />
    </g>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex'

/* USE A SIMPLER MAP!! */

import { geoMercator, geoPath, geoCentroid } from 'd3-geo'

export default {
  props: {
    locationList: Array
  },
  data () {
    return {
      fnProjection: geoMercator(),
      fnGeoPath: geoPath(),
      pathObjects: []
    }
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations',
      getLocationGeometry: 'location/getLocationGeometry'
    }),
    features () {
      return this.locations.map(({ geometry, ...properties }) => ({
        type: 'Feature',
        geometry: this.getLocationGeometry(properties.locationId),
        properties
      }))
    },
    world () {
      return {
        type: 'FeatureCollection',
        features: this.features
      }
    },
    isWorld () {
      return this.locationList.length === 1 && this.locationList[0].locationId.length > 3
    },
    circles () {
      if (this.isWorld) { return [{ cx: 0, cy: 0, r: 0 }] }
      const r = 10
      return this.locationList
        .map(l => [
          ...this.fnProjection(geoCentroid(this.getLocationGeometry(l.locationId))),
          l.regionColor
        ])
        .map(([cx, cy, color]) => ({ cx, cy, r, color }))
      // return []
    }
  },
  created () {
    this.fnProjection.fitSize([500, 300], this.world)
    this.fnGeoPath.projection(this.fnProjection)

    this.pathObjects = this.features
      .map(f => ({
        locationId: f.properties.locationId,
        path: this.fnGeoPath(f.geometry)
      }))
  }
}
</script>

<style>

</style>
