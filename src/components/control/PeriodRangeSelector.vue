<template>
  <PeriodBrushChart
    id="period-range-selector"
    :periods="periods"
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
  maxStep: 1,
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
      periods: 'periodRange/getPeriods',
      periodRange: 'periodRange/getPeriodRange'
    }),
    brushDomain () {
      return this.periodRange.map(p => p.periodId)
    }
  },
  methods: {
    ...mapActions({
      setPeriodIdRange: 'periodRange/setPeriodIdRange'
    })
  }
}
</script>

<style>

</style>
