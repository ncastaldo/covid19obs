<template>
  <PeriodBarsChart
    id="period-bars"
    :periodData="periodData"
    :periodId="period.periodId"
    :config="config"
    :height="60"
    @click="setPeriodId"
  />
</template>

<script>
import PeriodBarsChart from '../graphics/PeriodBarsChart'
import { mapGetters, mapMutations } from 'vuex'

const config = {
  minStep: 0,
  maxStep: 0,
  color: '#2877b8'
}

export default {
  components: {
    PeriodBarsChart
  },
  data () {
    return { config }
  },
  computed: {
    ...mapGetters({
      periods: 'period/getPeriods',
      period: 'period/getPeriod',
      compareVar: 'compare/first/getCompareVar'
    }),
    periodData () {
      return this.periods.map(({ periodId }) => ({ periodId, value: 1 }))
    }
  },
  methods: {
    ...mapMutations({
      setPeriodId: 'period/setPeriodId'
    })
  }
}
</script>

<style>

</style>
