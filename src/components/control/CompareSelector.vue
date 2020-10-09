<template>
  <v-select
    v-model="compare"
    class="px-3"
    :items="compares"
    item-value="compareId"
    item-text="compareName"
    hide-details
    style="max-width: 300px"
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
    compares () {
      return this.$store.getters[`compare/${this.module}/getCompares`]
    },
    getterKey () {
      return `compare/${this.module}/getCompare`
    },
    setterKey () {
      return `compare/${this.module}/setCompareId`
    },
    compare: {
      get () { return this.$store.getters[this.getterKey] },
      // using dispatch in the setter, to load new data
      set (compareId) { this.$store.dispatch(this.setterKey, compareId) }
    }
  }
}
</script>

<style>

</style>
