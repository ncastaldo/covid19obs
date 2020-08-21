<template>
  <div
    class="pa-0 ma-0"
  >
    <ChartsContainer
      :charts="[chart]"
      :height="height"
      @size="updateData"
    >
      <svg
        :id="id"
      />
    </ChartsContainer>
    <Tooltip>
      <div
        :hover="hover"
        :fnTooltips="config.fnTooltips || null"
      />
    </Tooltip>
  </div>
</template>

<script>
// import TimeseriesHover from './TimeseriesHover'

import { max } from 'd3-array'
import { hierarchy, pack } from 'd3-hierarchy'

import {
  chart
} from 'd3nic'

export default {
  components: {
    // TimeseriesHover
  },
  props: {
    id: String,
    height: Number,
    chartData: Array,
    config: Object
  },
  data () {
    return {
      fnPack: pack(),

      chart: null,
      components: [],

      hover: null
    }
  },
  watch: {
    chartData (value) {
      this.updateData()
      this.drawChart()
    },
    config () {
      // recreating the chart, save the size
      const chartSize = this.chart.size()

      this.clear()

      this.createComponents()

      this.update()

      this.updateData()

      this.chart.size(chartSize)

      this.drawChart()
    }
  },
  mounted () {
    this.createComponents()
    this.createChart()

    this.compose()
    this.update()

    // wait for next tick to have the size
    this.$nextTick(() => {
      this.updateData() // drawn by computing bubbles
      this.drawChart()
    })
  },
  methods: {
    updateData () {
      // size
      const { width, height } = this.chart.size()

      this.fnPack.size([width, height]).padding(2)

      // pack
      const root = hierarchy({ children: this.chartData })
        .sum(d => d.value) // accessor function

      const bubbles = this.fnPack(root)
        .descendants()
        .filter(n => n.depth > 0) // not the root
        .map(({ r, x, y, data }) => ({
          pack: { r, x, y },
          ...data
        }))

      this.chart.data(bubbles)
    },
    createComponents () {
      this.components = this.config.fnComponents()
    },
    createChart () {
      this.chart = chart()
        .selector(`#${this.id}`)
        .fnKey(d => d.key)
    },
    compose () {
      this.chart.components(this.components)
    },
    update () {
      //
    },
    drawChart () {
      // wait for chartscontainer
      this.$nextTick(() => this.chart.draw({ duration: 750 }))
    },
    onMouseover (d, i, nodes) {
      this.hover = d
    },
    onMouseout (d, i, nodes) {
      this.hover = null
    },
    clear () {
      this.components.map(c =>
        c.join()
          .transition()
          .duration(500)
          .style('opacity', 0)
          .remove())
      this.mouseBars.join().remove()
    }
  }

}
</script>

<style>

</style>
