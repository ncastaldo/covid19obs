<template>
  <div
    v-if="hover && fnTooltips"
    class="py-2 px-3 text-left"
    style="background-color: rgba(255,255, 255, 0.9)"
  >
    <h4>{{ hover.locationName }}</h4>
    <div
      v-for="(line, i) in lines"
      :key="i"
      class="d-flex align-center"
    >
      <v-icon
        small
        :color="line.color"
      >
        mdi-circle
      </v-icon>
      <span class="pl-1 pr-2">{{ line.name }}</span>
      <span class="font-weight-medium">{{ line.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hover: Object,
    fnTooltips: Function
  },
  computed: {
    lines () {
      return this.fnTooltips(this.hover)
    }
  }
}
</script>

<style>

</style>
