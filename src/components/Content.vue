<template>
  <v-layout
    fill-height
  >
    <v-flex
      xs7
      style="height:100vh"
    >
      <v-layout
        column
        wrap
      >
        <v-flex ref="title">
          <DateSlider />
        </v-flex>
        <v-flex>
          <MapContainer :size="mapContainerSize" />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex
      ref="section"
      xs5
      style="overflow-y: scroll; height:100vh"
    >
      <LocationLabel />
      <TimeChart />
    </v-flex>
  </v-layout>
</template>

<script>
import MapContainer from './map/MapContainer'

import LocationLabel from './section/LocationLabel'
import DateSlider from './map/DateSlider'

import TimeChart from './section/TimeChart'

export default {
  components: {
    MapContainer,
    TimeChart,
    LocationLabel,
    DateSlider
  },
  data () {
    return {
      mapContainerSize: null
    }
  },
  created () {
    window.addEventListener('resize', this.updateHeight)
  },
  mounted () {
    this.updateHeight()
  },
  methods: {
    updateHeight () {
      this.mapContainerSize = {
        width: window.innerWidth - this.$refs.section.clientWidth,
        height: window.innerHeight - this.$refs.title.clientHeight
      }
      console.log(this.mapContainerSize)
    }
  }
}
</script>
