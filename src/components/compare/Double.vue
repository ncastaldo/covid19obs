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

      const compareDouble = this.firstCompare
        .map((cmp, i) => ({
          ...cmp, value: [cmp.value, this.secondCompare[i].value]
        }))
        .filter(this.fnDefined)

      const n = compareDouble.length

      if (n > 1) {
        const mx = mean(compareDouble, d => d.value[0])
        const my = mean(compareDouble, d => d.value[1])

        const dx = deviation(compareDouble, d => d.value[0])
        const dy = deviation(compareDouble, d => d.value[1])

        const r = compareDouble
          // value is a pair
          .map((_, i) => [
            // (v - m) / dev -> formula to compute z
            (compareDouble[i].value[0] - mx) / dx,
            (compareDouble[i].value[1] - my) / dy
          ])
          // sum(zx, xy) / n - 1
          .reduce((acc, [zx, zy]) => acc + zx * zy, 0) / (n - 1)

        console.log(`R: ${r}`)

        // yhat = a + bx
        const b = r * dy / dx
        const a = my - b * mx

        console.log(`b: ${b}`)
        console.log(`a: ${a}`)

        const [minx, maxx] = extent(compareDouble, d => d.value[0])
        const [miny, maxy] = extent(compareDouble, d => d.value[1])

        const r0 = a + b * minx > miny
          ? [minx, a + b * minx] // '-  on y axis
          : [b !== 0 ? (miny - a) / b : minx, miny] // |.  on x axis

        const r1 = a + b * maxx < maxy
          ? [maxx, a + b * maxx] // -.  on y axis
          : [b !== 0 ? (maxy - a) / b : maxx, maxy] // '|  on x axis

        compareDouble[0].regression = r0
        compareDouble[1].regression = r1
      }

      console.log(compareDouble)

      return compareDouble
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
            .fnDefined(d => d.regression)
            .fnValue(d => d.regression)
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
