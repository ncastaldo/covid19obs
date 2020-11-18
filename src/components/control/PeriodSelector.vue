<template>
  <div class="d-flex align-center justify-space-between flex-wrap">
    <div class="display__icon mx-2">
      <v-icon large>
        mdi-calendar
      </v-icon>
    </div>
    <div class="mr-3">
      <h2>Tweets Recorded</h2>
    </div>
    <v-select
      v-model="period"
      class="mx-2"
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
  </div>
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
