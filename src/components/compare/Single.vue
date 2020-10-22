<template>
  <div>
    <div class="d-flex justify-center">
      <CompareSelector />
    </div>
    <CompareSingleChart
      :id="config.id"
      :height="400"
      :compareData="orderedCompareData"
      :config="config"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { byBars } from 'd3nic'

import CompareSelector from '../control/CompareSelector'

import CompareSingleChart from '../graphics/CompareSingleChart'

import {
  fillOpacityMouseover,
  fillOpacityMouseout
} from '../../plugins/graphics'

export default {
  components: {
    CompareSelector,
    CompareSingleChart
  },
  computed: {
    ...mapGetters({
      regions: 'location/getRegions',
      compareData: 'compare/first/getCompareData',
      compareVariableInfo: 'compare/first/getCompareVariableInfo',
      regionMapping: 'location/regionMapping'
    }),
    orderedCompareData () {
      console.log('computing ord. compare', new Date().toTimeString)
      return this.compareData.slice()
        .filter(d => this.compareVariableInfo.fnDefined(d.value))
        .sort((a, b) => a.value === null ? 1 : b.value === null ? -1
          : b.value - a.value)
    },
    config () {
      return {
        id: 'compare-single',
        scaleType: this.compareVariableInfo.scaleType,
        baseDomain: this.compareVariableInfo.baseDomain,
        fixedDomain: this.compareVariableInfo.fixedDomain,
        formatType: this.compareVariableInfo.formatType,
        fnComponents: () => [
          byBars()
            .fnDefined(d => this.compareVariableInfo.fnDefined(d.value))
            .fnLowValue(d => this.compareVariableInfo.minValue)
            .fnHighValue(d => d.value)
            .fnFill(d => d.regionColor)
            .fnFillOpacity(0.9)
            .fnOn('mouseover', fillOpacityMouseover)
            .fnOn('mouseout', fillOpacityMouseout)
        ],
        fnTooltips: d => [{
          name: this.compareVariableInfo.name,
          value: d.value,
          color: this.compareVariableInfo.color
        }]
      }
    }
  }
}
</script>

<style>

</style>
