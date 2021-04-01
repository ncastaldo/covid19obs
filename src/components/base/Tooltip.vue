
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

import { isMobile } from 'mobile-device-detect'

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
    if (!isMobile) {
      this.$parent.$el.addEventListener('mousemove',
        (event) => this.mousemove(event.clientX, event.clientY))
    } else {
      this.$parent.$el.addEventListener('touchmove',
        (event) => this.mousemove(event.touches[0].clientX, event.touches[0].clientY))
    }
  },
  methods: {
    deprecated: throttle(function (event) {
      this.moveTooltip(event)
    }, 20),
    mousemove (clientX, clientY) {
      this.show = true
      const [top, bottom] = window.innerHeight / 2 - clientY > 0
        ? [clientY + 'px', null] : [null, (window.innerHeight - clientY) + 'px']
      const [left, right] = window.innerWidth / /* 3 * 2 */ 2 - clientX > 0
        ? [clientX + 'px', null] : [null, (window.innerWidth - clientX) + 'px']
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
