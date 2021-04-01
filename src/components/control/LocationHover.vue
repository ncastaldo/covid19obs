<template>
  <div
    v-if="hover"
    class="py-2 px-3 text-left"
    style="background-color: rgba(255,255, 255, 0.9)"
  >
    <h3 class="text-h1">
      {{ hover.locationName }}
    </h3>
    <span> {{ pair.name }}: {{ pair.value !== null ? pair.value: 'Unavailable' }} </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    hover: Object
  },
  computed: {
    ...mapGetters({
      mapLayers: 'mapLayer/getMapLayers',
      mapLayer: 'mapLayer/getMapLayer'
    }),
    pair () {
      if (!this.hover || !this.mapLayer) return []
      const id = this.mapLayer.mapLayerId
      return {
        name: this.mapLayer.mapLayerName,
        value: id in this.hover
          ? this.hover[id]
          : null
      }
    }
  }
}
</script>

<style>

</style>
