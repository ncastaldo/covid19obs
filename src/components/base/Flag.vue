<template>
  <img
    :width="width"
    :src="`https://flagcdn.com/${flagId.toLowerCase()}.svg`"
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
    }
  },
  methods: {
    onError (e) {
      e.target.src = 'assets/static_img/flag.svg'
    }
  }
}
</script>
