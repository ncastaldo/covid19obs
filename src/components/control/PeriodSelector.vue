<template>
  <v-select
    v-model="period"
    class="pt-0 mt-0"
    :items="periods"
    item-value="periodId"
    item-text="periodName"
    hide-details
    style="width: 180px"
    color="#000"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      periods: 'period/getPeriods'
    }),
    period: {
      get () { return this.$store.getters['period/getPeriod'] },
      set (periodId) { this.$store.commit('period/setPeriodId', periodId) }
    }
  },
  created () {
    console.log(this.$store.getters['period/getPeriod'])
  }
}
</script>

<style>

</style>
