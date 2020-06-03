
<template>
  <div
    v-resize:debounce.500="onResize"
    :style="{height: `${chartHeight}px`}"
  >
    <slot />
  </div>
</template>

<script>
import resize from 'vue-resize-directive'

export default {
  name: 'ChartContainer',
  directives: {
    resize
  },
  props: {
    charts: Array,
    maxWidth: Number,
    // define alternatively height or ratio, height is dominant
    height: Number,
    ratio: Number
  },
  data () {
    return {
      chartWidth: null
    }
  },
  computed: {
    chartHeight () {
      return this.chartWidth
        // if height is defined return it, otherwise compute it
        ? this.height || this.chartWidth * this.ratio
        : null
    }
  },
  watch: {
    chartWidth (newVal, oldVal) {
      const size = {
        width: newVal,
        height: this.chartHeight
      }
      this.charts.forEach(c => c.size(size))
      if (oldVal) {
        this.$emit('size', size)
        this.charts.forEach(c => c.draw({ duration: 0 }))
      }
    }
  },
  mounted () {
    // this.$nextTick(function () {
    this.onResize()
    // })
  },
  methods: {
    onResize () {
      const w = this.$el.offsetWidth
      this.chartWidth = this.maxWidth
        ? Math.min(w, this.maxWidth)
        : w
    }
  }

}

</script>

<style scoped>

.chart-container {
  width: 100%;
  padding: 0;
}

</style>
