
<template>
  <div
    v-resize:debounce.500="onResize"
    :style="style"
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
    minWidth: Number, // scroll-x if more

    maxViewHeight: Number, // scroll-y if more

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
    },
    styleHeight () {
      return this.maxViewHeight && this.chartHeight > this.maxViewHeight
        ? this.maxViewHeight
        : this.chartHeight
    },
    style () {
      return {
        height: `${this.styleHeight}px`,
        'overflow-x': this.minWidth ? 'scroll' : 'hidden',
        'overflow-y': (this.chartHeight > this.styleHeight) ? 'scroll' : 'hidden'
      }
    }
  },
  watch: {
    chartWidth (newVal, oldVal) {
      const size = {
        width: newVal,
        height: this.chartHeight
      }
      this.charts.forEach(c => c.size(size))
      if (oldVal) { this.emitSizeDraw(size) }
    },
    chartHeight (newVal, oldVal) {
      const size = {
        width: this.chartWidth,
        height: newVal
      }
      this.charts.forEach(c => c.size(size))
      // not calling 'draw', assuming this is due to a data change
      // if (oldVal) { this.emitSizeDraw(size) }
    }
  },
  mounted () {
    // this.$nextTick(function () {
    this.onResize()
    // })
  },
  methods: {
    emitSizeDraw (size) {
      this.$emit('size', size)
      this.charts.forEach(c => c.draw({ duration: 0 }))
    },
    onResize () {
      const w = this.$el.offsetWidth
      this.chartWidth = Math.max(
        Math.min(w, this.maxWidth || w),
        this.minWidth || w
      )
    }
  }

}

</script>
