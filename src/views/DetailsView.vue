<template>
  <svg
    viewBox="0 0 500 400"
    width="500px"
    height="400px"
  >
    <path
      v-for="d in hexagons"
      :key="`${d.x}_${d.y}`"
      :d="d.path"
      stroke-width="0"
      stroke="#fff"
      :fill="d.color"
    />
  </svg>
</template>

<script>
import { csvParse } from 'd3-dsv'

import { geoMercator } from 'd3-geo'
import { hexbin } from 'd3-hexbin'
import { max, sum } from 'd3-array'

import { interpolateViridis } from 'd3-scale-chromatic'

import { scaleSequentialSymlog } from 'd3-scale'

import { mapGetters } from 'vuex'

const geohashUrl = '/assets/geohash/geohash_ITA.csv'

export default {
  data () {
    return {
      fnProjection: geoMercator(),
      fnHexbin: hexbin(),
      geohash: [],
      hexagons: []
    }
  },
  computed: {
    ...mapGetters({
      getLocationInfo: 'location/getLocationInfo'
    })
  },
  watch: {
    geohash () {
      const { geometry } = this.getLocationInfo('ITA')

      this.fnProjection.fitExtent([[20, 20], [500 - 20, 400 - 20]], geometry)

      const points = this.geohash
        .map(p => ({ ...p, ...this.fnProjection([p.long, p.lat]) }))

      const hexPoints = this.fnHexbin
        .size([500, 400])
        .radius(4)(points)

      hexPoints.forEach(d => {
        d.value = d.reduce((acc, cur) => acc + cur['2020-08'], 0)
      })

      const fnColor = scaleSequentialSymlog(interpolateViridis)
        .domain([0, max(hexPoints, d => d.value)])

      console.log(sum(hexPoints, d => d.value))

      console.log(fnColor.domain())

      this.hexagons = hexPoints.map(d => ({
        ...d,
        color: fnColor(d.value),
        path: 'M' + d.x + ',' + d.y + this.fnHexbin.hexagon()
      }))
    }
  },
  mounted () {
    fetch(geohashUrl)
      .then(res => res.text())
      .then(data => csvParse(data, ({ geohash, ...rest }) => ({
        geohash,
        ...Object.entries(rest)
          .map(([k, v]) => ({ [k]: +v }))
          .reduce((acc, cur) => ({ ...acc, ...cur }), {})
      })))
      .then(geohash => { this.geohash = geohash })
  }
}
</script>

<style>

</style>
