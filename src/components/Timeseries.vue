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
  { name: 'Epidemics', is: 'Epidemics' },
  { name: 'Tweets', is: 'Tweets' },
  { name: 'Risk Indexes', is: 'RiskIndexes' },
  { name: 'News', is: 'News' }
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
