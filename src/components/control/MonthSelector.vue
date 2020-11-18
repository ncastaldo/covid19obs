<template>
  <div class="d-flex align-center justify-space-between flex-wrap">
    <div class="display__icon mx-2">
      <v-icon large>
        mdi-calendar
      </v-icon>
    </div>
    <v-select
      v-model="month"
      class="mx-2 pb-2"
      style="width:200px"
      label="Month"
      :items="months"
      hide-details
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      months: 'month/getMonths'
    }),
    month: {
      get () { return this.$store.getters['month/getMonth'] },
      // using dispatch in the setter, to load new data
      set (monthId) { this.$store.dispatch('month/setMonthId', monthId) }
    }
  }
}
</script>

<style>

/*img {
  border: 1px solid #000;
}*/

</style>
