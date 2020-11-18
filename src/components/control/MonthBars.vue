<template>
  <MonthBarsChart
    id="month-bars"
    :monthData="monthData"
    :monthId="month.monthId"
    :config="config"
    :height="60"
    @click="setMonthId"
  />
</template>

<script>
import MonthBarsChart from '../graphics/MonthBarsChart'
import { mapGetters, mapMutations } from 'vuex'

const config = {
  minStep: 0,
  maxStep: 0,
  color: '#2877b8'
}

export default {
  components: {
    MonthBarsChart
  },
  data () {
    return { config }
  },
  computed: {
    ...mapGetters({
      months: 'month/getMonths',
      month: 'month/getMonth',
      compareVar: 'compare/first/getCompareVar'
    }),
    monthData () {
      return this.months.map(({ monthId }) => ({ monthId, value: 1 }))
    }
  },
  methods: {
    ...mapMutations({
      setMonthId: 'month/setMonthId'
    })
  }
}
</script>

<style>

</style>
