<template>
  <div class="d-flex align-center justify-space-between flex-wrap">
    <div class="display__icon mx-2">
      <v-icon large>
        mdi-calendar
      </v-icon>
    </div>
    <div class="mr-3">
      <h2 class="thin-font">
        Tweets Recorded
      </h2>
    </div>
    <v-spacer />
    <v-select
      v-model="period"
      class="mx-2"
      label="Period"
      :items="periods"
      item-value="periodId"
      item-text="periodName"
    >
      <template
        v-slot:selection="data"
      >
        <h3>
          {{ data.item.periodName }}
        </h3>
      </template>
    </v-select>
    <div class="d-flex align-center thin-font mx-3">
      <h2
        class="thin-font mx-1"
      >
        <i>from {{ fastDateRange[0] }}</i>
      </h2>
      <h2
        class="thin-font mx-1"
      >
        <i>to {{ fastDateRange[1] }}</i>
      </h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { timeFormat } from 'd3-time-format'

const fnDateFormat = timeFormat('%d/%m/%y')

export default {
  computed: {
    fastDateRange () {
      return this.$store.state.period.fastDateIdRange
        .map(d => new Date(d))
        .map(fnDateFormat)
    },
    ...mapGetters({
      periods: 'period/getPeriods'
    }),
    period: {
      get () { return this.$store.getters['period/getPeriod'] },
      // using dispatch in the setter, to load new data
      set (periodId) { this.$store.dispatch('period/setPeriodId', periodId) }
    }
  }
}
</script>

<style>

/*img {
  border: 1px solid #000;
}*/

</style>
