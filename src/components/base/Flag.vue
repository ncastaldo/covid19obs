<template>
  <img
    :style="{'width': `${width}px`, 'max-height': `${width}px`}"
    :src="`https://flagcdn.com/${flagId.toLowerCase()}.svg`"
    :class="outlined ? 'outlined': ''"
    @error="onError"
  >
</template>

<script>

export default {
  props: {
    flagId: {
      default: '',
      type: String
    },
    width: {
      type: [Number, String],
      default: 10
    },
    outlined: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    onError (e) {
      e.target.src = 'assets/static_img/flag.svg'
    }
  }
}
</script>

<style scoped>

img {
  object-fit: contain;
}

.outlined {
  outline: solid 1px #000;
}

</style>
