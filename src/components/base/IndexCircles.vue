<template>
  <span>
    <v-icon
      v-for="i in Array.from(Array(+active))"
      :key="i"
      :size="size"
      :color="color"
    >
      mdi-circle
    </v-icon>
    <v-icon
      v-for="i in Array.from(Array(+total - +active))"
      :key="i"
      :size="size"
      color="#888"
    >
      mdi-circle-outline
    </v-icon>
  </span>
</template>

<script>
export default {
  props: {
    total: {
      type: [Number, String],
      default: 10
    },
    active: {
      type: [Number, String],
      default: 5
    },
    color: {
      type: String,
      default: '#5aae61'
    },
    size: {
      type: String,
      default: 'large'
    }
  }
}
</script>

<style>

</style>
