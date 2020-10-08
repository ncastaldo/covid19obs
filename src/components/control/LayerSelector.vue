<template>
  <v-select
    v-model="layer"
    class="pt-0 mt-0 mx-2"
    :items="layers"
    item-value="layerId"
    item-text="layerName"
    hide-details
    style="width: 180px"
    color="#000"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      layers: 'layer/getLayers'
    }),
    layer: {
      get () { return this.$store.getters['layer/getLayer'] },
      set (layerId) { this.$store.dispatch('layer/setLayerId', layerId) }
    }
  },
  created () {
    console.log(this.$store.getters['layer/getLayer'])
  }
}
</script>

<style>

</style>
