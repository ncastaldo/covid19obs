<template>
  <PeriodBrushChart
    id="period-range-selector"
    :periodData="tweets"
    :brushDomain="brushDomain"
    :config="config"
    @endDomain="setPeriodIdRange"
  />
</template>

<script>
import PeriodBrushChart from '../graphics/PeriodBrushChart'
import { mapGetters, mapActions } from 'vuex'

const config = {
  minStep: 0,
  maxStep: 2,
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
    brushDomain () {
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
