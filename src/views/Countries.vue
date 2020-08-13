<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="pb-3"
      >
        <CompareVarSelector />
        <PeriodSelector />
      </v-col>
      <v-col
        cols="12"
        class="pb-3"
      >
        <Compare />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompareVarSelector from '../components/control/CompareVarSelector'
import PeriodSelector from '../components/control/PeriodSelector'

import Compare from '../components/Compare'

export default {
  components: {
    CompareVarSelector,
    PeriodSelector,
    Compare
  }
}
</script>
