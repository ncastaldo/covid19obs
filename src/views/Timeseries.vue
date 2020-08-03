<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
      >
        <Location :height="300" />
      </v-col>
      <v-col
        cols="12"
        class="pb-3"
      >
        <Epidemics />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Location from '../components/control/Location'
import Epidemics from '../components/timeseries/Epidemics'

export default {
  components: {
    Location,
    Epidemics
  }
}
</script>
