<template>
  <div
    class="pa-3 my-2 policy"
    @click="show = !show"
  >
    <v-icon
      color="rgba(31, 121, 179)"
      class="ml-1 mx-3 mb-2"
    >
      mdi-script-text-outline
    </v-icon>
    <b class="policy-title">Policy Implication</b>
    <br>
    <span v-show="show">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: null
    }
  },
  created () {
    this.show = false
  }
}
</script>

<style scoped>

.policy {
  cursor: pointer;
  background: rgba(31, 121, 179, 0.1);;
}

.policy-title {
  color: rgba(31, 121, 179);
}

.policy:hover .policy-title {
  text-decoration: underline;
}

</style>
