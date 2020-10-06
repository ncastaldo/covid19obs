<template>
  <div>
    <div class="d-flex justify-center flex-wrap">
      <CompareVarSelector module="first" />
      <CompareVarSelector module="second" />
    </div>
    <CompareDoubleChart
      :id="config.id"
      ref="chart"
      :height="400"
      :compareDouble="compareDouble"
      :config="config"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { xyCircles, xyLine, xyTexts } from 'd3nic'

import { mean, deviation, extent } from 'd3-array'

import CompareVarSelector from '../control/CompareVarSelector'

import CompareDoubleChart from '../graphics/CompareDoubleChart'

export default {
  components: {
    CompareVarSelector,
    CompareDoubleChart
  },
  computed: {
    ...mapGetters({
      continents: 'location/getContinents',

      firstCompare: 'compare/first/getCompare',
      firstCompareVar: 'compare/first/getCompareVar',

      secondCompare: 'compare/second/getCompare',
      secondCompareVar: 'compare/second/getCompareVar'
    }),
    compareDouble () {
      if (this.firstCompare.lentgh !== this.secondCompare.lentgh) return []
      return this.firstCompare
        .map((cmp, i) => ({
          ...cmp,
          value: [cmp.value, this.secondCompare[i].value]
        }))
    },
    regression () {
      if (this.firstCompare.lentgh !== this.secondCompare.lentgh) return []

      const mx = mean(this.firstCompare, d => d.value)
      const my = mean(this.secondCompare, d => d.value)
      const dx = deviation(this.firstCompare, d => d.value)
      const dy = deviation(this.secondCompare, d => d.value)

      const n = this.compareDouble.length

      // check n length

      const r = this.compareDouble
        // value is a pair
        .map((_, i) => [
          // (v - m) / dev -> formula to compute z
          (this.firstCompare[i].value - mx) / dx,
          (this.secondCompare[i].value - my) / dy
        ])
        // sum(zx, xy) / n - 1
        .reduce((acc, [zx, zy]) => acc + zx * zy, 0) / (n - 1)

      console.log(r)

      // yhat = a + bx
      const b = r * dy / dx
      const a = my - b * mx

      const [minx, maxx] = extent(this.firstCompare, d => d.value)

      return [
        [minx, a + b * minx],
        [maxx, a + b * maxx]
      ]
    },
    invalidData () {
      return this.compareDouble
        .filter((d, i) => !this.fnDefined(d, i))
        .map(d => ({ name: d.locationId, color: d.continentColor }))
    },
    config () {
      return {
        id: 'compare-double',
        fnDefined: this.fnDefined,
        scaleTypes: [this.firstCompareVar.scaleType, this.secondCompareVar.scaleType],
        formatTypes: [this.firstCompareVar.formatType, this.secondCompareVar.formatType],
        axisLabels: [this.firstCompareVar.compareVarName, this.secondCompareVar.compareVarName],
        fnComponents: () => [
          xyLine()
            .fnDefined((_, i) => i < 2)
            .fnValue((_, i) => this.regression[i])
            .fnStroke('#444')
            .fnStrokeWidth(2)
            .fnStrokeDasharray([5, 5])
            .fnFillOpacity(0),
          xyCircles()
            .fnDefined(this.fnDefined)
            .fnValue(d => d.value)
            .fnRadius(d => 6)
            .fnStroke(d => '#000')
            .fnStrokeWidth(d => 1)
            .fnFill(d => d.continentColor)
            .fnOn('mouseover', this.$refs.chart.onMouseover)
            .fnOn('mouseout', this.$isMobile() || this.$refs.chart.onMouseout),
          xyTexts()
            .fnDefined(this.fnDefined)
            .fnValue(d => d.value)
            .fnFill(d => d.continentColor)
            .fnText(d => d.locationId)
            .fnBefore(s => s.attr('dx', 10).attr('dy', -10).style('pointer-events', 'none'))
        ],
        fnTooltips: d => [{
          name: this.firstCompareVar.compareVarName,
          value: d.value[0],
          color: this.firstCompareVar.color
        },
        {
          name: this.secondCompareVar.compareVarName,
          value: d.value[1],
          color: this.secondCompareVar.color
        }]
      }
    }
  },
  methods: {
    fnDefined (d) {
      return this.firstCompareVar.fnDefined(d.value[0]) &&
        this.secondCompareVar.fnDefined(d.value[1])
    }
  }
}
</script>

<style>

</style>
