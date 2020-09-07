<template>
  <div class="d-flex align-center py-2">
    <div class="display__icon pr-3">
      <v-icon large>
        mdi-calendar
      </v-icon>
    </div>
    <h2>{{ display }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      periodRange: 'period/getPeriodRange'
    }),
    display () {
      return this.periodRange
        .map(pr => pr.periodName)
        .join(' - ')
    }
  }
}
</script>

<style scoped>

/*img {
  border: 1px solid #000;
}*/

</style>
