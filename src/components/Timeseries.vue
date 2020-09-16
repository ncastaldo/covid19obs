<template>
  <v-container>
    <v-row>
      <v-col>
        <v-tabs
          v-model="index"
          fixed-tabs
          show-arrows
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Epidemics from './timeseries/Epidemics'
import Tweets from './timeseries/Tweets'
import RiskIndexes from './timeseries/RiskIndexes'
import News from './timeseries/News'
import { mapGetters } from 'vuex'

const tabs = [
  { name: 'Epidemics', is: 'Epidemics' },
  { name: 'Tweets', is: 'Tweets' },
  { name: 'Risk Indexes', is: 'RiskIndexes' },
  { name: 'News', is: 'News' }
  // 'Tweets', 'Risk Indexes', 'News'
]

export default {
  components: {
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

<style>

</style>
