
<template>
  <div
    :style="style"
    class="map-control"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    position: {
      default: 'top-left',
      type: String
    }
  },
  data () {
    return {
      top: null,
      left: null,
      bottom: '0px',
      right: '0px'
    }
  },
  computed: {
    style () {
      const keys = this.position.split('-')
      const style = {}
      keys.forEach(k => { style[k] = '0px' })
      return style
    }
  }
}

</script>

<style scoped>

.map-control {
  position: absolute;
  z-index: 1; /* In front of all */
  padding: 10px;
}

</style>
