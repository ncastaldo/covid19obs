<template>
  <img
    :width="width"
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
      default: 30
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

.outlined {
  outline: solid 1px #000;
}

</style>
