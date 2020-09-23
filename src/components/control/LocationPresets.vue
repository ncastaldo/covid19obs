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
    presetId: 'g8',
    presetName: 'G8',
    presetLocationIdList: [
      'CAN', 'FRA', 'DEU', 'JPN', 'ITA', 'GBR', 'RUS', 'USA'
    ]
  },
  {
    presetId: 'asean',
    presetName: 'ASEAN',
    presetLocationIdList: [
      'PHL', 'THA', 'MYS', 'IDN', 'SGP', 'BRN', 'KHM', 'VNM', 'LAO', 'MMR'
    ]
  },
  {
    presetId: 'custom',
    presetName: 'Custom',
    presetLocationIdList: [
      'AUT', 'BEL', 'USA', 'IND', 'JPN', 'ESP', 'DEU', 'FRA', 'ITA', 'GBR'
    ]
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
