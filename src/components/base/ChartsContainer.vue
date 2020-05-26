
<template>
  <div v-resize:debounce.500="onResize">
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
    ratio: Number
  },
  data () {
    return {
      width: null
    }
  },
  computed: {
    height () {
      return this.width
        ? this.width * this.ratio
        : null
    }
  },
  watch: {
    width (newVal, oldVal) {
      const size = {
        width: newVal,
        height: this.height
      }
      this.charts.forEach(c => c.size(size))
      if (oldVal) {
        this.$emit('size', size)
        this.charts.forEach(c => c.draw({ duration: 250 }))
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.onResize()
    })
  },
  methods: {
    onResize () {
      this.width = this.$el.offsetWidth
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
