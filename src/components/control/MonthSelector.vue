<template>
  <v-card
    flat
    class="pa-1 mb-8"
    color="#f4f4f4"
  >
    <div class="d-flex align-center justify-space-between flex-wrap">
      <div class="display__icon mx-2">
        <v-icon large>
          mdi-calendar
        </v-icon>
      </div>
      <v-select
        v-model="month"
        class="mx-2"
        label="Month"
        :items="months"
        item-value="monthId"
        item-text="monthName"
      >
        <template
          v-slot:selection="data"
        >
          <h3>
            {{ data.item.monthName }}
          </h3>
        </template>
      </v-select>
      <v-spacer />
    </div>
    <MonthBarsChart
      id="month-bars"
      :monthData="monthData"
      :monthId="month.monthId"
      :config="config"
      :height="60"
      @click="setMonthId"
    />
  </v-card>
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
    month: {
      get () { return this.$store.getters['month/getMonth'] },
      // using dispatch in the setter, to load new data
      set (monthId) { this.$store.dispatch('month/setMonthId', monthId) }
    },
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

/*img {
  border: 1px solid #000;
}*/

</style>
