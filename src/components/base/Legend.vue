<template>
  <div
    class="d-flex align-center justify-center flex-wrap"
  >
    <div
      v-for="(t, i) in tooltips"
      :key="i"
      class="px-2 mx-1 d-flex justify-center"
    >
      <v-icon
        small
        class="pr-1"
        :color="t.color"
      >
        mdi-circle
      </v-icon>
      <span class=".overline">{{ t.name }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    fnTooltips: {
      type: Function,
      default: () => []
    }
  },
  computed: {
    tooltips () {
      return this.items.length ? this.items : this.fnTooltips({})
    }
  }
}
</script>

<style>

</style>
