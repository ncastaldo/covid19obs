<template>
  <div class="d-flex align-center">
    <div class="display__icon mx-3">
      <v-icon large>
        mdi-calendar
      </v-icon>
    </div>
    <div>
      <v-btn
        v-for="item in stepItems.reverse()"
        :key="item.step"
        medium
        icon
        :disabled="item.disabled"
        :color="item.active ? 'primary': 'none'"
        @click="updatePeriodIdRange(toPeriod, item.step)"
      >
        <v-icon>mdi-numeric-{{ item.step+1 }}-box-outline</v-icon>
      </v-btn>
    </div>
    <v-select
      v-model="toPeriod"
      :items="periods"
      item-value="periodId"
      item-text="periodName"
      style="width: 180px"
      return-object
    >
      <template
        v-slot:selection="data"
      >
        <h2>{{ data.item.periodName }}</h2>
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const totSteps = 3

export default {
  computed: {
    ...mapGetters({
      periods: 'period/getPeriods',
      periodRange: 'period/getPeriodRange',
      step: 'period/getPeriodRangeStep'
    }),
    toPeriod: {
      get () { return this.periodRange[1] },
      set (period) { this.updatePeriodIdRange(period, this.step) }
    },
    stepItems () {
      return [...Array(totSteps)].map((_, i) => ({
        step: i,
        name: `${i + 1}M`,
        active: i === this.step,
        disabled: this.toPeriod.index - i < 0
      }))
    }
  },
  methods: {
    ...mapActions({ setPeriodIdRange: 'period/setPeriodIdRange' }),
    updatePeriodIdRange (period, step) {
      const fromIndex = Math.max(0, period.index - step)
      this.setPeriodIdRange([
        this.periods[fromIndex].periodId,
        period.periodId
      ])
    }
  }
}
</script>

<style scoped>

/*img {
  border: 1px solid #000;
}*/

</style>
