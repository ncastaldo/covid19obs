<template>
  <div>
    <Article>
      <div class="py-2">
        <div class="headline text-center py-1 ">
          Ranking
        </div>
        <div class="text-justify py-1">
          Compare and rank countries by their Infodemic Risk Index (default) or other indices of the COVID-19 Infodemic Observatory.
          <br>
          Click on <i>PRESETS</i> button (top of the page) to select a region involving one or more countries, or interactively select the countries of interest by clicking on the map. Select a time period from the interactive timeline.
          <br>
          Policy implications: @@@@@@@@@@@@@
        </div>
      </div>
    </Article><MonthSelector />
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
import MonthSelector from '../control/MonthSelector'

import CompareSingleChart from '../graphics/CompareSingleChart'

import {
  fillOpacityMouseover,
  fillOpacityMouseout
} from '../../plugins/graphics'

export default {
  components: {
    CompareSelector,
    CompareSingleChart,
    MonthSelector
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
