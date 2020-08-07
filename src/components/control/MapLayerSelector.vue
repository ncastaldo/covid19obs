<template>
  <v-select
    v-model="mapLayer"
    class="pt-0 mt-0"
    :items="mapLayers"
    item-value="mapLayerId"
    item-text="mapLayerName"
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
      mapLayers: 'mapLayer/getMapLayers'
    }),
    mapLayer: {
      get () { return this.$store.getters['mapLayer/getMapLayer'] },
      set (mapLayerId) { this.$store.commit('mapLayer/setMapLayerId', mapLayerId) }
    }
  },
  created () {
    console.log(this.$store.getters['mapLayer/getMapLayer'])
  }
}
</script>

<style>

</style>
