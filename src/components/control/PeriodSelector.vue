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

const config = {
  minStep: 0,
  maxStep: 0,
  color: '#2877b8'
}

export default {
  components: {
    PeriodBrushChart
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
