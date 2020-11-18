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
import { mapGetters } from 'vuex'

const tabs = [
  { name: 'Infodemic Risk', is: 'RiskIndexes' },
  { name: 'News Reliability', is: 'News' },
  { name: 'Epidemic Indices', is: 'Epidemics' },
  { name: 'Tweets Volume', is: 'Tweets' }
  // 'Tweets', 'Risk Indexes', 'News'
]

export default {
  components: {
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

<style>

</style>
