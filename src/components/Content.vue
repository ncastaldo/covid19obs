<template>
  <v-row
    style="height:100%"
    no-gutters
  >
    <v-col cols="8">
      <MapChart style="height:100%" />
    </v-col>
    <v-col cols="4">
      <TimeChart />
    </v-col>
  </v-row>
</template>

<script>
import MapChart from './MapChart'
import TimeChart from './TimeChart'

export default {
  components: {
    MapChart,
    TimeChart
  }
}
</script>
