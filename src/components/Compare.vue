<template>
  <div>
    <CompareChart
      v-for="cfg in configs"
      :id="cfg.id"
      :key="cfg.id"
      :height="200"
      :compare="compareDict[cfg.id]"
      :config="cfg"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bxBars } from 'd3nic'

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
    configs () {
      return this.continents
        .map(c => ({
          id: c.continentId,
          fnComponents: () => [
            bxBars()
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
        }))
    },
    compareDict () {
      return this.compare.reduce((acc, cur) => {
        const cont = cur.continentId
        if (cont) { // removing world
          acc[cont] = acc[cont] || []
          acc[cont].push(cur)
        }
        return acc
      }, {})
    }
  }
}
</script>

<style>

</style>
