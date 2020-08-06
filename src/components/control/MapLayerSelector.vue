<template>
  <v-select
    v-model="mapLayer"
    :items="mapLayers"
    background-color="#fff"
    item-value="mapLayerId"
    item-text="mapLayerName"
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
