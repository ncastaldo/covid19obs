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
      <BubbleHover
        :hover="hover"
        :fnTooltips="config.fnTooltips || null"
      />
    </Tooltip>
  </div>
</template>

<script>
import BubbleHover from './BubbleHover'

import { pack } from 'd3-hierarchy'

import {
  chart
} from 'd3nic'

export default {
  components: {
    BubbleHover
  },
  props: {
    id: String,
    height: Number,
    root: Object,
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
    root (value) {
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

      const fnPack = pack().size([width, height]).padding(1)

      const bubbles = fnPack(this.root)
        .descendants()
        .filter(d => d.depth)
        .map(({ data, ...rest }) => ({
          pack: { ...rest },
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
        .padding({ top: 0, bottom: 0 })
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
    onMouseover (event, d) {
      this.hover = d
    },
    onMouseout (event, d) {
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
