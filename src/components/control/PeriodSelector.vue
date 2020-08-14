<template>
  <PeriodBrushChart
    id="period-selector"
    :periods="periods"
    :brushDomain="brushDomain"
    :config="config"
    @endDomain="(bd) => setPeriodId(bd[0])"
  />
</template>

<script>
import PeriodBrushChart from '../graphics/PeriodBrushChart'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    PeriodBrushChart
  },
  computed: {
    ...mapGetters({
      periods: 'period/getPeriods',
      period: 'period/getPeriod',
      compareVar: 'compareVar/getCompareVar'
    }),
    config () {
      return {
        minStep: 0,
        maxStep: 0,
        color: this.compareVar.color
      }
    },
    brushDomain () {
      return [this.period, this.period]
        .map(p => p.periodId)
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
