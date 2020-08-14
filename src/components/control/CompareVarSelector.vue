<template>
  <v-select
    v-model="compareVar"
    class="pt-0 mt-0"
    :items="compareVars"
    item-value="compareVarId"
    item-text="compareVarName"
    hide-details
    style="width: 180px"
    :color="compareVar.compareVarColor"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      compareVars: 'compareVar/getCompareVars'
    }),
    compareVar: {
      get () { return this.$store.getters['compareVar/getCompareVar'] },
      // using dispatch in the setter, to load new data
      set (compareVarId) { this.$store.dispatch('compareVar/setCompareVarId', compareVarId) }
    }
  }
}
</script>

<style>

</style>
