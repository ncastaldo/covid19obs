<template>
  <v-select
    v-model="layer"
    class="py-2  mx-2"
    :items="layers"
    item-value="layerId"
    item-text="layerName"
    style="width: 280px"
    hide-details
  >
    <template
      v-slot:selection="data"
    >
      <h3>
        {{ data.item.layerName }}
      </h3>
    </template>
  </v-select>
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
