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
import { xyCircles, xyLinesH, xyLinesV } from 'd3nic'

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
      return this.firstCompare.lentgh === this.secondCompare.lentgh
        ? this.firstCompare
          .map((cmp, i) => ({ ...cmp, value: [cmp.value, secondCompare[i].value] }))
        : []
    },
    config () {
      return {
        id: 'compare-double',
        fnComponents: () => [
          xyLinesH().fnValue(d => d.value),
          xyLinesV().fnValue(d => d.value),
          xyCircles()
            .fnValue(d => d.value)
            .fnRadius(d => 5)
            .fnStroke(d => '#000')
            .fnStrokeWidth(d => 1)
            .fnFill(d => d.continentColor)
            .fnOn('mouseover', this.$refs.chart.onMouseover)
            .fnOn('mouseout', this.$isMobile() || this.$refs.chart.onMouseout)
        ],
        // scaleType: this.compareVar.scaleType,
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
