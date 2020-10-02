<template>
  <PeriodBrushChart
    id="period-range-brush"
    :periodData="layerPeriods"
    :bandDomain="bandDomain"
    :config="config"
    @endBandDomain="setPeriodIdRange"
  />
</template>

<script>
import PeriodBrushChart from '../graphics/PeriodBrushChart'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PeriodBrushChart
  },
  computed: {
    ...mapGetters({
      periods: 'period/getPeriods',
      periodRange: 'period/getPeriodRange',
      layer: 'layer/getLayer',
      layerPeriods: 'layer/getLayerPeriods'
    }),
    config () {
      return {
        bandMinStep: 0,
        bandMaxStep: 2,
        color: this.layer.layerColor
      }
    },
    bandDomain () {
      return this.periodRange.map(p => p.periodId)
    }
  },
  methods: {
    ...mapActions({
      setPeriodIdRange: 'period/setPeriodIdRange'
    })
  }
}
</script>

<style>

</style>
