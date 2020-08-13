<template>
  <div>
    <v-btn
      v-for="p in presets"
      :key="p.presetId"
      @click="setLocationIdList(p.presetLocationIdList)"
    >
      {{ p.presetName }}
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const presets = [
  {
    presetId: 'benelux',
    presetName: 'BeNeLux',
    presetLocationIdList: ['BEL', 'NLD', 'LUX']
  },
  {
    presetId: 'europe',
    presetName: 'Europe',
    presetLocationIdList: ['ITA', 'ESP', 'FRA', 'PRT', 'GBR', 'DEU']
  }
]

export default {
  data () {
    return {
      presets
    }
  },
  methods: {
    ...mapMutations({
      setLocationIdList: 'location/setLocationIdList'
    })
  }
}
</script>

<style>

</style>
