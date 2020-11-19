<template>
  <div>
    <Article>
      <div class="py-2">
        <div class="headline text-center py-1 ">
          Correlation
        </div>
        <div class="text-justify py-1">
          Compare countries with respect to two indices simultaneously, to discover potential correlations between distinct indicators. For instance, it is possible to compare the infodemic risk index of one or more country against the incidence of COVID-19.
          <br>
          Click on <i>PRESETS</i> button (top of the page) to select a region involving one or more countries, or interactively select the countries of interest by clicking on the map. Select a time period from the interactive timeline.
          <br>
          Policy implications: @@@@@@@@@@ (in the example above, a positive correlation indicates that countries with larger infodemic risk exhibit also a larger number of COVID-19 cases and deaths)
        </div>
      </div>
    </Article>

    <MonthSelector />

    <div class="d-flex justify-center flex-wrap">
      <CompareSelector module="first" />
      <CompareSelector module="second" />
    </div>
    <CompareDoubleChart
      :id="config.id"
      ref="chart"
      :height="400"
      :compareData="doubleCompareData"
      :config="config"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { xyCircles, xyLine, xyTexts } from 'd3nic'

import { mean, deviation, extent } from 'd3-array'

import CompareSelector from '../control/CompareSelector'
import MonthSelector from '../control/MonthSelector'

import CompareDoubleChart from '../graphics/CompareDoubleChart'

export default {
  components: {
    CompareSelector,
    CompareDoubleChart,
    MonthSelector
  },
  computed: {
    ...mapGetters({
      regions: 'location/getRegions',

      firstCompareData: 'compare/first/getCompareData',
      firstCompareVariableInfo: 'compare/first/getCompareVariableInfo',

      secondCompareData: 'compare/second/getCompareData',
      secondCompareVariableInfo: 'compare/second/getCompareVariableInfo'
    }),
    doubleCompareData () {
      if (this.firstCompareData.lentgh !== this.secondCompareData.lentgh) return []

      const doubleCompareData = this.firstCompareData
        .map((cmp, i) => ({
          ...cmp,
          value: [
            cmp.value,
            this.secondCompareData[i].value
          ]
        }))
        .filter(this.fnDefined)

      console.log(doubleCompareData)

      const n = doubleCompareData.length

      if (n > 1) {
        const mx = mean(doubleCompareData, d => d.value[0])
        const my = mean(doubleCompareData, d => d.value[1])

        const dx = deviation(doubleCompareData, d => d.value[0])
        const dy = deviation(doubleCompareData, d => d.value[1])

        const r = doubleCompareData
          // value is a pair
          .map((_, i) => [
            // (v - m) / dev -> formula to compute z
            (doubleCompareData[i].value[0] - mx) / dx,
            (doubleCompareData[i].value[1] - my) / dy
          ])
          // sum(zx, xy) / n - 1
          .reduce((acc, [zx, zy]) => acc + zx * zy, 0) / (n - 1)

        console.log(`R: ${r}`)

        // yhat = a + bx
        const b = r * dy / dx
        const a = my - b * mx

        const [minx, maxx] = extent(doubleCompareData, d => d.value[0])
        const [miny, maxy] = extent(doubleCompareData, d => d.value[1])

        const r0 = a + b * minx > miny
          ? [minx, a + b * minx] // '-  on y axis
          : [b !== 0 ? (miny - a) / b : minx, miny] // |.  on x axis

        const r1 = a + b * maxx < maxy
          ? [maxx, a + b * maxx] // -.  on y axis
          : [b !== 0 ? (maxy - a) / b : maxx, maxy] // '|  on x axis

        doubleCompareData[0].regression = r0
        doubleCompareData[1].regression = r1
      }

      return doubleCompareData
    },
    invalidData () {
      return this.doubleCompareData
        .filter((d, i) => !this.fnDefined(d, i))
        .map(d => ({ name: d.locationId, color: d.regionColor }))
    },
    config () {
      const compareVariableInfos = [
        this.firstCompareVariableInfo,
        this.secondCompareVariableInfo
      ]
      return {
        id: 'compare-double',
        fnDefined: this.fnDefined,
        scaleTypes: compareVariableInfos.map(v => v.scaleType),
        formatTypes: compareVariableInfos.map(v => v.formatType),
        axisLabels: compareVariableInfos.map(v => v.name),
        fnComponents: () => [
          /* xyLine()
            .fnDefined(d => d.regression)
            .fnValue(d => d.regression)
            .fnStroke('#444')
            .fnStrokeWidth(2)
            .fnStrokeDasharray([5, 5])
            .fnFillOpacity(0) */
          xyCircles()
            .fnDefined(this.fnDefined)
            .fnValue(d => d.value)
            .fnRadius(d => 6)
            .fnStroke(d => '#000')
            .fnStrokeWidth(d => 1)
            .fnFill(d => d.regionColor)
            .fnOn('mouseover', this.$refs.chart.onMouseover)
            .fnOn('mouseout', this.$isMobile() || this.$refs.chart.onMouseout),
          xyTexts()
            .fnDefined(this.fnDefined)
            .fnValue(d => d.value)
            .fnFill(d => d.regionColor)
            .fnText(d => d.locationId)
            .fnBefore(s => s.attr('dx', 10).attr('dy', -10).style('pointer-events', 'none'))
        ],
        fnTooltips: d => [{
          name: this.firstCompareVariableInfo.name,
          value: d.value[0],
          color: this.firstCompareVariableInfo.color
        },
        {
          name: this.secondCompareVariableInfo.name,
          value: d.value[1],
          color: this.secondCompareVariableInfo.color
        }]
      }
    }
  },
  methods: {
    fnDefined (d) {
      return this.firstCompareVariableInfo.fnDefined(d.value[0]) &&
        this.secondCompareVariableInfo.fnDefined(d.value[1])
    }
  }
}
</script>

<style>

</style>
