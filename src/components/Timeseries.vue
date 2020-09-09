<template>
  <div>
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
      <Background />
      <component
        :is="currentTab.is"
        style="position: relative"
      />
    </div>
  </div>
</template>

<script>
import Epidemics from './timeseries/Epidemics'
import Tweets from './timeseries/Tweets'
import RiskIndexes from './timeseries/RiskIndexes'
import News from './timeseries/News'

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
    currentTab () {
      return tabs[this.index]
    }
  }
}
</script>

<style>

</style>
