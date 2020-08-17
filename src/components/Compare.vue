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
    <component :is="currentTab.is" />
  </div>
</template>

<script>
import Single from './compare/Single'
import Double from './compare/Double'

const tabs = [
  { name: 'Ranking', is: 'Single' },
  { name: 'Correlation', is: 'Double' }
  // 'Tweets', 'Risk Indexes', 'News'
]

export default {
  components: {
    Single,
    Double
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
