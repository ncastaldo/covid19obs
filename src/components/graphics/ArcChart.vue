<template>
  <div
    class="pa-0 ma-0"
  >
    <Legend
      :fnTooltips="() => arcData"
    />
    <ChartsContainer
      :charts="[chart]"
      :height="height"
    >
      <svg
        :id="id"
      />
    </ChartsContainer>
    <Tooltip>
      <ArcHover
        :hover="hover"
        :fnTooltips="config.fnTooltips || null"
      />
    </Tooltip>
  </div>
</template>

<script>
import ArcHover from './ArcHover'

import {
  brChart
} from 'd3nic'

export default {
  components: {
    ArcHover
  },
  props: {
    id: String,
    height: Number,
    arcData: Array,
    config: Object
  },
  data () {
    return {
      chart: null,

      components: [],

      hover: null
    }
  },
  watch: {
    arcData (value) {
      this.chart.data(value)

      console.log(value)

      this.drawChart()
    },
    config () {
      this.update()
    }
  },
  mounted () {
    this.createComponents()

    this.createChart()

    this.compose()
    this.update()

    this.chart.data(this.arcData)

    this.drawChart()
  },
  methods: {
    createComponents () {
      console.log(this.config)
      this.components = this.config.fnComponents()
    },
    createChart () {
      this.chart = brChart()
        .selector(`#${this.id}`)
        .padding(this.padding)
        .fnKey(d => d.key)
    },
    compose () {
      // this.yAxis.tickFormat(format(this.chartConfig.yFormat))
      this.chart.components(this.components)
      // .contScaleType(this.chartConfig.scaleType)
    },
    update () {
      this.chart
        .angleExtent([-Math.PI * 2 / 3, Math.PI * 2 / 3])
        .bandPaddingInner(this.config.bandPaddingInner)
        .bandPaddingOuter(this.config.bandPaddingOuter)
      /* this.xAxis.tickFormatType(this.config.formatType)
      this.chart
        .contScaleType(this.config.scaleType)
        .contBaseDomain(this.config.baseDomain)
        .contFixedDomain(this.config.fixedDomain) */
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(() =>
        this.chart.draw({ duration: 750 }))
    },
    onMouseover (event, d) {
      this.hover = d
    },
    onMouseout (event, d) {
      this.hover = null
    }
  }

}
</script>

<style>

</style>
