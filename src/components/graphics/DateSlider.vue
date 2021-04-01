<template>
  <v-range-slider
    :max="dateData.length"
    step="1"
    ticks
    tick-size="2"
    :value="dateData"
    dense
  />
</template>

<script>

// TODO

export default {
  props: {
    bandDomain: Array,
    dateData: Array,
    config: Object
  },
  computed: {
  }
}
</script>

<style>

</style>
