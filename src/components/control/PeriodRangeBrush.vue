<template>
  <PeriodBrushChart
    id="period-range-brush"
    :periodData="tweets"
    :bandDomain="bandDomain"
    :config="config"
    @endBandDomain="setPeriodIdRange"
  />
</template>

<script>
import PeriodBrushChart from '../graphics/PeriodBrushChart'
import { mapGetters, mapActions } from 'vuex'

const config = {
  bandMinStep: 0,
  bandMaxStep: 2,
  color: '#2877b8'
}

export default {
  components: {
    PeriodBrushChart
  },
  data () {
    return {
      config
    }
  },
  computed: {
    ...mapGetters({
      periods: 'period/getPeriods',
      periodRange: 'period/getPeriodRange',
      tweets: 'tweets/getTweets'
    }),
    bandDomain () {
      return this.periodRange.map(p => p.periodId)
    }
  },
  methods: {
    ...mapActions({
      setPeriodIdRange: 'period/setPeriodIdRange'
    })
  }
}
</script>

<style>

</style>
