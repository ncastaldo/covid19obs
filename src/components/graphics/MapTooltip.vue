
<template>
  <div
    :style="{
      top, left, bottom, right, transform
    }"
    class="
    tooltip"
  >
    <slot v-if="show" />
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    mapEvent: Object // leaflet map event
  },
  data () {
    return {
      show: false,
      top: '0px',
      left: '0px',
      bottom: null,
      right: null,
      translateX: '0px',
      translateY: '-50%'
    }
  },
  computed: {
    transform () {
      return `translate(${this.translateX}, ${this.translateY})`
    }
  },
  watch: {
    mapEvent (mapEvent) {
      if (mapEvent) {
        this.show = true

        const event = mapEvent.originalEvent

        const x = event.clientX
        const y = event.clientY

        const [top, bottom] = // window.innerHeight / 2 - event.clientY > 0 ?
      [y + 'px', null] // : [null, (window.innerHeight - event.clientY) + 'px']

        const [left, right] = window.innerWidth / /* 3 * 2 */ 2 - x > 0
          ? [x + 'px', null] : [null, (window.innerWidth - x) + 'px']

        Object.assign(this, { top, left, bottom, right })
      }
    }
  }
}

</script>

<style scoped>

.tooltip {
  pointer-events: none;
  position: fixed;

  transition: left 0.05s, right 0.05s, top 0.05s;

  z-index: 1; /* In front of all */

  padding: 30px;

}

</style>
