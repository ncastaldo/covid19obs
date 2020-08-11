<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="6"
      >
        <Control />
      </v-col>
      <v-col
        cols="6"
        class="pb-3"
      >
        <Epidemics />
      </v-col>
      <v-col
        v-if="false"
        cols="12"
        class="pb-3"
      >
        <Tweets />
      </v-col>
      <v-col
        v-if="false"
        cols="12"
        class="pb-3"
      >
        <RiskIndexes />
      </v-col>
      <v-col
        v-if="false"
        cols="12"
        class="pb-3"
      >
        <News />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Control from '../components/control/Control'

import Epidemics from '../components/timeseries/Epidemics'
import Tweets from '../components/timeseries/Tweets'
import RiskIndexes from '../components/timeseries/RiskIndexes'
import News from '../components/timeseries/News'

export default {
  components: {
    Control,

    Epidemics,
    Tweets,
    RiskIndexes,
    News
  }
}
</script>
