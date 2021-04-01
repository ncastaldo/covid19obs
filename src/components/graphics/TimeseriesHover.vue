<template>
  <div
    v-if="hover && fnTooltips"
    class="py-2 px-3 text-left"
    style="background-color: rgba(255,255, 255, 0.9)"
  >
    <h4>{{ date }}</h4>
    <div
      v-for="(line, i) in lines"
      :key="i"
      class="d-flex align-center pt-1"
    >
      <v-icon
        small
        :color="line.color"
      >
        mdi-circle
      </v-icon>
      <span class="pl-1 pr-2">{{ line.name }}</span>
      <span class="font-weight-medium">{{ getValue(line) }}</span>
    </div>
  </div>
</template>

<script>
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

const fnTimeFormat = timeFormat('%B %d, %Y')

export default {
  props: {
    hover: Object,
    fnTooltips: Function
  },
  computed: {
    date () {
      return this.hover
        ? fnTimeFormat(this.hover.date)
        : ''
    },
    lines () {
      return this.fnTooltips(this.hover)
    }
  },
  methods: {
    getValue (line) {
      return line.formatType
        ? line.value !== null
          ? format(line.formatType)(line.value)
          : 'Invalid'
        : line.value
    }
  }
}
</script>

<style>

</style>
