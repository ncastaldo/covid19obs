<template>
  <v-container class="pt-4">
    <LocationSummary />

    <PeriodSelector class="mt-4" />

    <v-tabs
      v-model="index"
      class="pt-4"
      fixed-tabs
      show-arrows
      hide-slider
    >
      <v-tab
        v-for="(t, i) in tabs"
        :key="i"
      >
        <h4>{{ t.name }}</h4>
      </v-tab>
    </v-tabs>
    <div style="position: relative">
      <Background :locationList="[location]" />
      <component :is="currentTab.is" />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import LocationSummary from '../components/LocationSummary'
import PeriodSelector from '../components/control/PeriodSelector'

import Epidemics from './timeseries/Epidemics'
import Tweets from './timeseries/Tweets'
import RiskIndexes from './timeseries/RiskIndexes'
import News from './timeseries/News'

const tabs = [
  { name: 'Infodemic Risk Indices', is: 'RiskIndexes' },
  { name: 'News Reliability Indices', is: 'News' },
  { name: 'Epidemic Indices', is: 'Epidemics' },
  { name: 'Social Media Indices', is: 'Tweets' }
]

export default {
  components: {
    LocationSummary,
    PeriodSelector,
    Epidemics,
    Tweets,
    RiskIndexes,
    News
  },
  data () {
    return {
      tabs,
      index: 0
    }
  },
  computed: {
    ...mapGetters({
      location: 'location/getLocation'
    }),
    currentTab () {
      return tabs[this.index]
    }
  }
}
</script>

<style >

</style>
