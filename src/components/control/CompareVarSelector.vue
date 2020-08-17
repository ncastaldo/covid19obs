<template>
  <v-select
    v-model="compareVar"
    :items="compareVars"
    item-value="compareVarId"
    item-text="compareVarName"
    hide-details
    style="width: 180px"
    color="#444"
  />
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  props: {
    module: {
      type: String,
      default: 'first'
    }
  },
  computed: {
    compareVars () {
      return this.$store.getters[`compare/${this.module}/getCompareVars`]
    },
    getterKey () {
      return `compare/${this.module}/getCompareVar`
    },
    setterKey () {
      return `compare/${this.module}/setCompareVarId`
    },
    compareVar: {
      get () { return this.$store.getters[this.getterKey] },
      // using dispatch in the setter, to load new data
      set (compareVarId) { this.$store.dispatch(this.setterKey, compareVarId) }
    }
  }
}
</script>

<style>

</style>
