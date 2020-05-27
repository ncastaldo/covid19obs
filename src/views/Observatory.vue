<template>
  <v-container fluid>
    <DateSlider />
    <LocationLegendChart
      :locationDict="locationDict"
      :locationInfo="locationInfo"
    />
    <LocationMapChart
      :locationInfo="locationInfo"
    />
    <!--LocationBarChart
      :locationDict="locationDict"
      :locationInfo="locationInfo"
    /-->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { extent } from 'd3-array'

import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import DateSlider from '../components/DateSlider'
import LocationMapChart from '../components/LocationMapChart'
import LocationLegendChart from '../components/LocationLegendChart'
// import LocationBarChart from '../components/LocationBarChart'

import locationDicts from '../assets/locationDicts'

const INVALID_COLOR = '#aaa'

export default {
  components: {
    DateSlider,
    LocationLegendChart,
    LocationMapChart
    // LocationBarChart
  },
  data () {
    return {
      fnColorScale: null,

      locationDicts,
      locationDictId: null,

      locationData: null,

      locationInfo: null
    }
  },
  computed: {
    ...mapGetters({
      dateIndex: 'getDateIndex'
    }),
    locationDict () {
      return locationDicts.find(json => json.id === this.locationDictId)
    }
  },
  watch: {
    locationDict (mDict) {
      this.fnColorScale = d3Scale[mDict.scaleColorType]()
        .interpolator(d3ScaleChromatic[mDict.interpolator])
    },
    dateIndex () {
      this.computeLocationInfo()
    },
    locationData () {
      this.computeLocationInfo()
    }
  },
  created () {
    this.locationDictId = 'confirmed'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      // loading the actual data
      fetch(`/assets/map_dicts/${this.locationDictId}.json`)
        .then(res => res.json())
        .then(data => { this.locationData = data })
    },
    computeLocationInfo () {
      const fnInBounds = value =>
        (this.locationDict.bounds[0] === null || value >= this.locationDict.bounds[0]) &&
        (this.locationDict.bounds[1] === null || value <= this.locationDict.bounds[1])
      const fnGetValue = list => list !== null &&
        fnInBounds(list[this.dateIndex]) ? list[this.dateIndex] : null
      const fnGetColor = value => value !== null ? this.fnColorScale(value) : INVALID_COLOR

      // color scale domain update
      const domain = extent(Object.values(this.locationData).map(fnGetValue))
      this.fnColorScale.domain(domain)

      // locationInfo computation
      this.locationInfo = Object.entries(this.locationData || {})
        .filter(([locationId, list]) => locationId !== '_WORLD')
        .map(([locationId, list]) => [locationId, fnGetValue(list)])
        .reduce((acc, [locationId, value]) => ({
          ...acc,
          [locationId]: {
            locationId,
            value,
            color: fnGetColor(value)
          }
        }), {})
    }
  }
}
</script>
