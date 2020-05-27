<template>
  <v-container
    fluid
    class="pt-0"
  >
    <div
      v-sticky
      sticky-z-index="4"
      sticky-offset="stickyOffset"
      style="background: rgba(0, 0, 0, 0.7)"
      class="pb-1"
    >
      <DateSlider />
      <LocationLegendChart
        :locationDict="locationDict"
        :locationInfo="locationInfo"
      />
    </div>
    <v-row>
      <v-col class="col-12 col-md-8">
        <LocationMapChart
          :locationInfo="locationInfo"
          :height="height"
        />
      </v-col>
      <v-col class="col-12 col-md-4">
        <LocationBarChart
          :locationDict="locationDict"
          :locationInfo="locationInfo"
          :height="height"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import { extent } from 'd3-array'

import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import Sticky from 'vue-sticky-directive'

import DateSlider from '../components/DateSlider'
import LocationMapChart from '../components/LocationMapChart'
import LocationLegendChart from '../components/LocationLegendChart'
import LocationBarChart from '../components/LocationBarChart'

import locationDicts from '../assets/locationDicts'

const INVALID_COLOR = '#aaa'

export default {
  directives: { Sticky },
  components: {
    DateSlider,
    LocationLegendChart,
    LocationMapChart,
    LocationBarChart
  },
  data () {
    return {
      stickyOffset: { top: 60 },
      height: 400,

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

<style scoped>
.controls {
  background: rgba(0, 0, 0, 0.7);
}
</style>
