<template>
  <div class="pt-3">
    <div class="d-flex justify-center">
      <CompareSelector />
    </div>

    <CompareSingleChart
      :id="config.id"
      :height="height"
      :maxViewHeight="400"
      :compareData="orderedCompareData"
      :config="config"
    />
    <div class="py-4 text-center">
      <v-btn
        @click="downloadCsv"
      >
        Download this Data
        <v-icon class="ml-2">
          mdi-download
        </v-icon>
      </v-btn>
    </div>
    <Article>
      <div class="py-2">
        <div class="text-justify py-1">
          Compare and rank countries by their Infodemic Risk Index (default) or other indices of the COVID-19 Infodemic Observatory.
          <br>
          Click on <i>PRESETS</i> button (top of the page) to select a region involving one or more countries, or interactively select the countries of interest by clicking on the map. Select a time period from the interactive timeline.
          <br>
          <PolicyText>
            Country ranks according to a given index give us a clear indication of what are the countries to watch as critical players with respect to a certain phenomenon. For instance if the index is the Infodemic Risk (IRI) one, we know which countries are currently working as potential hubs for disinformation creation and spreading. This also means that countries that currently have lower levels of infodemic risk but that are culturally or geographically connected to high-risk ones are likely to be impacted by misinformation through such connection and should be monitored more carefully.
          </PolicyText>
        </div>
      </div>
    </Article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { byBars } from 'd3nic'

import { pick } from 'lodash'
import { csvFormat } from 'd3-dsv'
import { fnDownload } from '../../plugins/util'

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
      month: 'month/getMonth',
      regionMapping: 'location/regionMapping'
    }),
    orderedCompareData () {
      return this.compareData.slice()
        .filter(d => this.compareVariableInfo.fnDefined(d.value))
        .sort((a, b) => a.value === null ? 1 : b.value === null ? -1
          : b.value - a.value)
    },
    height () {
      return Math.max(this.orderedCompareData.length * 15, 300)
    },
    config () {
      return {
        id: 'compare-single',
        padding: { left: 200, bottom: 5 },
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
  },
  methods: {
    downloadCsv () {
      const data = this.orderedCompareData
        .map(d => ({
          month: this.month.monthISO,
          ...pick(d, ['variable', 'locationId', 'locationName', 'regionId', 'value'])
        }))
      const text = csvFormat(data)
      const filename = `${this.compareVariableInfo.id}_${this.month.monthISO}.csv`
      fnDownload(filename, text)
    }
  }
}
</script>

<style>

</style>
