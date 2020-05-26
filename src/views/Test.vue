<template>
  <div>
    <DateSlider />
    <CountryMapChart
      v-if="false"
      :countryDict="countryDict"
      :countryInfo="countryInfo"
    />
    <CountryBarChart
      :countryDict="countryDict"
      :countryInfo="countryInfo"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { extent } from 'd3-array'

import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import DateSlider from '../components/DateSlider'
import CountryMapChart from '../components/CountryMapChart'
import CountryBarChart from '../components/CountryBarChart'

import countryDicts from '../assets/mapDicts'

const INVALID_COLOR = '#aaa'

export default {
  components: {
    DateSlider,
    CountryMapChart,
    CountryBarChart
  },
  data () {
    return {
      fnColorScale: null,

      countryDicts,
      countryDictId: null,

      countryData: null,

      countryInfo: null
    }
  },
  computed: {
    ...mapGetters({
      dateIndex: 'getDateIndex'
    }),
    countryDict () {
      return countryDicts.find(json => json.id === this.countryDictId)
    }
  },
  watch: {
    countryDict (mDict) {
      this.fnColorScale = d3Scale[mDict.scaleColorType]()
        .interpolator(d3ScaleChromatic[mDict.interpolator])
    },
    dateIndex () {
      this.computeCountryInfo()
    },
    countryData () {
      this.computeCountryInfo()
    }
  },
  created () {
    this.countryDictId = 'confirmed'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      // loading the actual data
      fetch(`/assets/map_dicts/${this.countryDictId}.json`)
        .then(res => res.json())
        .then(data => { this.countryData = data })
    },
    computeCountryInfo () {
      const fnGetValue = list => list !== null ? list[this.dateIndex] : null
      const fnGetColor = value => value !== null ? this.fnColorScale(value) : INVALID_COLOR

      // color scale domain update
      const domain = extent(Object.values(this.countryData).map(fnGetValue))
      this.fnColorScale.domain(domain)

      // countryInfo computation
      this.countryInfo = Object.entries(this.countryData || {})
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
