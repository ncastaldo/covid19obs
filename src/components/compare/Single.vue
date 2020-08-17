<template>
  <div>
    <CompareVarSelector />
    <CompareSingleChart
      :id="config.id"
      :height="400"
      :compare="orderedCompare"
      :config="config"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { byBars } from 'd3nic'

import CompareVarSelector from '../control/CompareVarSelector'

import CompareSingleChart from '../graphics/CompareSingleChart'

import {
  barsMouseover,
  barsMouseout
} from '../../plugins/graphics'

export default {
  components: {
    CompareVarSelector,
    CompareSingleChart
  },
  computed: {
    ...mapGetters({
      continents: 'location/getContinents',
      compare: 'compare/first/getCompare',
      compareVar: 'compare/first/getCompareVar',
      continentMapping: 'location/continentMapping'
    }),
    orderedCompare () {
      return this.compare.slice().sort((a, b) => b.value - a.value)
    },
    config () {
      return {
        id: 'compare',
        fnComponents: () => [
          byBars()
            .fnDefined(d => d.value >= this.compareVar.minValue)
            .fnLowValue(d => this.compareVar.minValue)
            .fnHighValue(d => d.value)
            .fnFill(d => d.continentColor)
            .fnOn('mouseover', barsMouseover)
            .fnOn('mouseout', barsMouseout)
        ],
        scaleType: this.compareVar.scaleType,
        fnTooltips: d => [{
          name: this.compareVar.compareVarName,
          value: d.value,
          color: this.compareVar.color
        }]
      }
    }
  }
}
</script>

<style>

</style>
