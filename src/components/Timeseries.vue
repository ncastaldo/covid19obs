<template>
  <v-container class="py-0">
    <PeriodSelector />
    <br>
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
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PeriodSelector from '../components/control/PeriodSelector'

const tabs = [
  { name: 'Infodemic Risk Indices', is: 'RiskIndexes' },
  { name: 'News Reliability Indices', is: 'News' },
  { name: 'Epidemic Indices', is: 'Epidemics' },
  { name: 'Social Media Indices', is: 'Tweets' }
]

export default {
  components: {
    PeriodSelector,
    Epidemics: () => import(/* webpackChunkName: "Epidemics" */'./timeseries/Epidemics'),
    Tweets: () => import(/* webpackChunkName: "Tweets" */'./timeseries/Tweets'),
    RiskIndexes: () => import(/* webpackChunkName: "RiskIndexes" */'./timeseries/RiskIndexes'),
    News: () => import(/* webpackChunkName: "News" */'./timeseries/News')
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

<style scoped>

.tab {
  background-color: '#dadada'
}

.active-tab {
  background-color: '#fff'
}

</style>
