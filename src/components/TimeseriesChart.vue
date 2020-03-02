<template>
  <svg
    :id="id"
    width="0"
    height="0"
  />
</template>

<script>
import * as d3nic from 'd3nic'

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
  mounted () {
    // next tick to receive the size
    this.createAxes()
    this.createChart()
    this.$nextTick(() => {
      this.chart
        .size(this.size)
        .data(this.data)
        .draw({ duration: 500 })
    })
  },
  methods: {
    createAxes () {
      this.axes = [
        d3nic.bxAxisX(),
        d3nic.bxAxisY()
      ]
    },
    createChart () {
      this.chart = d3nic.bxChart()
        .selector(`#${this.id}`)
        .padding({ left: 40, right: 20, top: 10, bottom: 30 })
      // do not use spread for proxy: they would vanish, use concat instead
        .components(this.axes.concat(this.values.map(v => v.component)))
    }
  }

}
</script>

<style>

</style>
