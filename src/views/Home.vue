<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
      >
        <Control />
      </v-col>
      <v-col
        cols="6"
        class="pb-3"
      >
        <Timeseries />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Control from '../components/Control'

import Timeseries from '../components/Timeseries'

export default {
  components: {
    Control,

    Timeseries
  }
}
</script>
