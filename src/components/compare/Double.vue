<template>
  <div>
    <div class="d-flex">
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
import { xyCircles, xyTexts } from 'd3nic'

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
      const secondCompare = this.secondCompare

      console.log(secondCompare)
      return this.firstCompare.lentgh === this.secondCompare.lentgh
        ? this.firstCompare
          .map((cmp, i) => ({ ...cmp, value: [cmp.value, secondCompare[i].value] }))
        : []
    },
    config () {
      const fnDefined = d =>
        this.firstCompareVar.fnDefined(d.value[0]) &&
        this.secondCompareVar.fnDefined(d.value[1])
      return {
        id: 'compare-double',
        fnDefined,
        scaleTypes: [this.firstCompareVar.scaleType, this.secondCompareVar.scaleType],
        formatTypes: [this.firstCompareVar.formatType, this.secondCompareVar.formatType],
        axisLabels: [this.firstCompareVar.compareVarName, this.secondCompareVar.compareVarName],
        fnComponents: () => [
          xyCircles()
            .fnDefined(fnDefined)
            .fnValue(d => d.value)
            .fnRadius(d => 6)
            .fnStroke(d => '#000')
            .fnStrokeWidth(d => 1)
            .fnFill(d => d.continentColor)
            .fnOn('mouseover', this.$refs.chart.onMouseover)
            .fnOn('mouseout', this.$isMobile() || this.$refs.chart.onMouseout),
          xyTexts()
            .fnDefined(fnDefined)
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
  }
}
</script>

<style>

</style>
