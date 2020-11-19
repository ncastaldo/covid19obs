<template>
  <v-container>
    <v-row>
      <v-col>
        <MonthSelector />
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
          <Background :locationList="locationList" />
          <component :is="currentTab.is" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Single from './compare/Single'
import Double from './compare/Double'
import MonthSelector from './control/MonthSelector'

import { mapGetters } from 'vuex'

const tabs = [
  { name: 'Ranking', is: 'Single' },
  { name: 'Correlation', is: 'Double' }
  // 'Tweets', 'Risk Indexes', 'News'
]

export default {
  components: {
    Single,
    Double,
    MonthSelector
  },
  data () {
    return {
      tabs,
      index: 0
    }
  },
  computed: {
    ...mapGetters({
      locationList: 'location/getLocationList'
    }),
    currentTab () {
      return tabs[this.index]
    }
  }
}
</script>

<style>

</style>
