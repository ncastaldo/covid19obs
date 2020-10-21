<template>
  <PeriodBrushChart
    id="period-range-brush"
    :height="300"
    :periodData="tweetsPeriods"
    :bandDomain="bandDomain"
    :config="config"
    @endBandDomain="setPeriodIdRange"
  />
</template>

<script>
import PeriodBrushChart from '../graphics/PeriodBrushChart'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PeriodBrushChart
  },
  computed: {
    ...mapGetters({
      periods: 'period/getPeriods',
      periodRange: 'period/getPeriodRange',
      tweetsPeriods: 'period/getTweetsPeriods'
    }),
    config () {
      return {
        bandMinStep: 0,
        bandMaxStep: 2,
        color: 'rgb(31, 121, 179)'
      }
    },
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
