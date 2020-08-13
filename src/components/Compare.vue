<template>
  <div>
    <CompareChart
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

import CompareChart from './graphics/CompareChart'

import {
  barsMouseover,
  barsMouseout
} from '../plugins/graphics'

export default {
  components: {
    CompareChart
  },
  computed: {
    ...mapGetters({
      continents: 'location/getContinents',
      compare: 'compare/getCompare',
      compareVar: 'compareVar/getCompareVar'
    }),
    orderedCompare () {
      return this.compare.slice().sort((a, b) => b.value - a.value)
    },
    config () {
      return {
        id: 'compare',
        fnComponents: () => [
          byBars()
            .fnDefined(d => d.value != null)
            .fnLowValue(d => 0)
            .fnHighValue(d => d.value)
            .fnFill(d => this.compareVar.compareVarColor)
            .fnOn('mouseover', barsMouseover)
            .fnOn('mouseout', barsMouseout)
        ],
        fnTooltips: d => [{
          name: this.compareVar.compareVarName,
          value: d.value,
          color: this.compareVar.compareVarColor
        }]
      }
    }
  }
}
</script>

<style>

</style>
