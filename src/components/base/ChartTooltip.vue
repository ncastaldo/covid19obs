
<template>
  <div
    :style="{ left, top }"
    class="tooltip"
  >
    <slot>Tooltip content</slot>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  data () {
    return {
      left: '0px',
      top: '0px'
    }
  },
  mounted () {
    this.$parent.$el.addEventListener('mousemove', this.mousemove)
  },
  methods: {
    mousemove (event) {
      this.left = event.clientX + 'px'
      this.top = event.clientY + 'px'
    }
  }
}

</script>

<style scoped>

.tooltip {
  pointer-events: none;
  position: fixed;

  z-index: 1; /* In front of all */

  margin-left: 20px;
  margin-top: 20px;

  padding: 10px;

  max-width: 150px;

  color: rgba(0, 0, 0, 1);
  background-color: rgba(255,255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 1);
}

</style>
