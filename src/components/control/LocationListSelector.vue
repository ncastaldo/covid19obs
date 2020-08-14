<template>
  <v-menu :offsetY="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        Presets
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="p in presets"
        :key="p.presetId"
        @click="setLocationIdList(p.presetLocationIdList)"
      >
        <v-list-item-title>{{ p.presetName }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
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
