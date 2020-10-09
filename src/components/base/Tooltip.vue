
<template>
  <div
    :style="{ top, left, bottom, right }"
    class="tooltip"
  >
    <slot v-if="show" />
  </div>
</template>

<script>
import { throttle } from 'lodash'

export default {
  name: 'Tooltip',
  data () {
    return {
      show: false,
      top: '0px',
      left: '0px',
      bottom: null,
      right: null
    }
  },
  mounted () {
    this.$parent.$el.addEventListener('mousemove', this.mousemove)
  },
  methods: {
    deprecated: throttle(function (event) {
      this.moveTooltip(event)
    }, 20),
    mousemove (event) {
      this.show = true
      const [top, bottom] = // window.innerHeight / 2 - event.clientY > 0 ?
      [event.clientY + 'px', null] // : [null, (window.innerHeight - event.clientY) + 'px']
      const [left, right] = window.innerWidth / /* 3 * 2 */ 2 - event.clientX > 0
        ? [event.clientX + 'px', null] : [null, (window.innerWidth - event.clientX) + 'px']
      Object.assign(this, { top, left, bottom, right })
    }
  }
}

</script>

<style scoped>

.tooltip {
  pointer-events: none;
  position: fixed;

  z-index: 1; /* In front of all */

  margin: 20px;

}

</style>
