<template>
  <svg
    :id="id"
    width="0"
    height="0"
  />
</template>

<script>
import * as d3nic from 'd3nic'

import { format } from 'd3-format'

export default {
  props: {
    id: String,
    size: Object,
    values: Array,
    data: Array
  },
  data () {
    return {
      chart: null,
      axes: null
    }
  },
  computed: {
    valueComponents () {
      return this.values.map(v =>
        v.type === 'bxLine'
          ? v.component
            .fnFillOpacity(0)
            .fnStrokeWidth(2)
            .fnStroke(v.color)
          : v.component
            .fnFill(v.color)
            .fnStrokeWidth(0)
      )
    }
  },
  watch: {
    values () {
      this.clear()
      this.createAxes()
      this.createChart()
      this.draw()
    },
    data () {
      this.draw()
    }
  },
  mounted () {
    this.createAxes()
    this.createChart()
    this.draw()
  },
  methods: {
    createAxes () {
      this.axes = [
        d3nic.bxAxisX()
          .ticks(3)
          .tickSizeInner(0)
          .tickSizeOuter(0)
          .tickFormat(t => t)
          .fnBefore(s => s.classed('axis', true)),
        d3nic.bxAxisY()
          .tickSizeInner(4)
          .tickSizeOuter(0)
          .ticks(2)
          .tickFormat(format('.1s'))
          .fnBefore(s => s.classed('axis', true))
      ]
    },
    createChart () {
      this.chart = d3nic.bxChart()
        .selector(`#${this.id}`)
        .padding({ left: 45, right: 20, top: 10, bottom: 30 })
        .fnKey(d => new Date(d.date))
        .fnBandValue(d => d.date)
      // do not use spread for proxy: they would vanish, use concat instead
        .components(this.axes.concat(this.valueComponents))
    },
    draw () {
      // next tick to be sure to receive the size
      this.$nextTick(() => {
        console.log(this.valueComponents.map(vc => vc.fnsValue().map(f => f.toString())))

        this.chart
          .size(this.size)
          .data(this.data)
          .draw({ duration: 500 })
      })
    },
    clear () {
      this.chart.group().remove()
    }
  }

}
</script>

<style>

</style>
