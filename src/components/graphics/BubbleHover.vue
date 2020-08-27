<template>
  <div
    v-if="hover && fnTooltips"
    class="py-2 px-3 text-left"
    style="background-color: rgba(255,255, 255, 0.9)"
  >
    <h4>
      <v-icon
        small
        :color="hover.color"
      >
        mdi-square
      </v-icon>
      {{ hover.name }}
    </h4>
    <div>
      <!--span class="pl-1 pr-2">{{ hover.name }}</span-->
      <span class="font-weight-medium">{{ hover.value }}</span>
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
