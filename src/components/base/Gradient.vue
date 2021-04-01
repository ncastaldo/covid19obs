<template>
  <defs>
    <linearGradient
      :id="id"

      x1="0%"
      :y1="y1"
      :x2="x2"
      y2="0%"
    >
      <stop
        v-for="(d, i) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :key="i"
        :style="`stop-color:${fnInterpolator(i/10)}`"
        :offset="`${d*10}%`"
      />
    </linearGradient>
  </defs>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'gradient'
    },
    fnInterpolator: {
      type: Function,
      default: () => '#666'
    },
    direction: {
      type: String,
      default: () => 'x'
    }
  },
  computed: {
    x2 () { return this.direction === 'x' ? '100%' : '0%' },
    y1 () { return this.direction === 'x' ? '0%' : '100%' }
  }
}
</script>
