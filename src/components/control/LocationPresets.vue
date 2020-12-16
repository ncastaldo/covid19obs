<template>
  <v-menu :offsetY="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        Countries Presets
        <v-icon class="ml-2">
          mdi-cursor-default-click-outline
        </v-icon>
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
    presetId: 'eu',
    presetName: 'EU members',
    presetLocationIdList: [
      'AUT', 'BEL', 'BGR', 'HRV', 'CYP',
      'CZE', 'DNK', 'EST', 'FIN', 'FRA',
      'DEU', 'GRC', 'HUN', 'IRL', 'ITA',
      'LVA', 'LTU', 'LUX', 'MLT', 'NLD',
      'POL', 'PRT', 'ROU', 'SVK', 'SVN',
      'ESP', 'SWE'
    ]
  },
  {
    presetId: 'g8',
    presetName: 'G8 members',
    presetLocationIdList: [
      'CAN', 'FRA', 'DEU', 'JPN', 'ITA', 'GBR', 'RUS', 'USA'
    ]
  },
  {
    presetId: 'custom',
    presetName: 'Custom countries',
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
