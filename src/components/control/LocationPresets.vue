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
    presetId: 'reset',
    presetName: 'Reset',
    presetLocationIdList: [

    ]
  },
  {
    presetId: 'whoMembers',
    presetName: 'WHO members',
    presetLocationIdList: [
      'AFG', 'ALB', 'DZA', 'AND', 'AGO', 'AIA',
      'ATG', 'ARG', 'ARM', 'AUS', 'AUT', 'AZE',
      'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL',
      'BLZ', 'BEN', 'BTN', 'BOL', 'BIH', 'BWA',
      'BRA', 'BRN', 'BGR', 'BFA', 'BDI', 'CPV',
      'KHM', 'CMR', 'CAN', 'CAF', 'TCD', 'CHL',
      'CHN', 'COL', 'COM', 'COG', 'COK', 'CRI',
      'CIV', 'HRV', 'CUB', 'CYP', 'CZE', 'PRK',
      'COD', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU',
      'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'SWZ',
      'ETH', 'FJI', 'FIN', 'FRA', 'GAB', 'GMB',
      'GEO', 'DEU', 'GHA', 'GRC', 'GRD', 'GTM',
      'GIN', 'GNB', 'GUY', 'HTI', 'HND', 'HUN',
      'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL',
      'ISR', 'ITA', 'JAM', 'JPN', 'JOR', 'KAZ',
      'KEN', 'KIR'
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
    presetId: 'asean',
    presetName: 'ASEAN members',
    presetLocationIdList: [
      'PHL', 'THA', 'MYS', 'IDN', 'SGP', 'BRN', 'KHM', 'VNM', 'LAO', 'MMR'
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
