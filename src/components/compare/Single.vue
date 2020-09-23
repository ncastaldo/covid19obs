<template>
  <div>
    <div class="d-flex justify-center">
      <CompareVarSelector />
    </div>
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
  fillOpacityMouseover,
  fillOpacityMouseout
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
      return this.compare.slice()
        .sort((a, b) => a.value === null ? 1 : b.value === null ? -1
          : b.value - a.value)
    },
    config () {
      return {
        id: 'compare-single',
        scaleType: this.compareVar.scaleType,
        baseDomain: this.compareVar.baseDomain,
        fixedDomain: this.compareVar.fixedDomain,
        formatType: this.compareVar.formatType,
        fnComponents: () => [
          byBars()
            .fnDefined(d => this.compareVar.fnDefined(d.value))
            .fnLowValue(d => this.compareVar.minValue)
            .fnHighValue(d => d.value)
            .fnFill(d => d.continentColor)
            .fnFillOpacity(0.9)
            .fnOn('mouseover', fillOpacityMouseover)
            .fnOn('mouseout', fillOpacityMouseout)
        ],
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
