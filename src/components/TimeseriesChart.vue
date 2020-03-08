<template>
  <div
    class="pa-0 ma-0 fill-height"
  >
    <svg
      :id="id"
      style="min-height: 120px"
      width="0"
      height="0"
    />
    <v-tooltip
      v-model="isHover"
      transition="none"
      absolute
      :position-x="xTooltip"
      :position-y="yTooltip"
      top
    >
      <div
        v-if="hover"
        class="text-left"
      >
        <div>{{ hover.date }}</div>
        <div
          v-for="(hv, i) in hover.values"
          :key="i"
        >
          <span>
            <v-icon
              x-small
              :color="hv.color"
              class="pr-1 pb-1"
            >
              mdi-square
            </v-icon>
            {{ hv.label }}
          </span>
          {{ fnValueFormat(hv.value) }}
        </div>
      </div>
    </v-tooltip>
  </div>
</template>

<script>
import * as d3nic from 'd3nic'
import * as _ from 'lodash'

import { select } from 'd3-selection'
import { scaleLinear, scaleLog, scaleSymlog } from 'd3-scale'

import { format } from 'd3-format'

const scaleTypes = {
  scaleLinear: scaleLinear(),
  scaleLog: scaleLog(),
  scaleSymlog: scaleSymlog()
}

export default {
  props: {
    id: String,
    size: Object,
    chartConfig: Object,
    values: Array,
    data: Array
  },
  data () {
    return {
      chart: null,
      axes: null,
      mouseBars: null,

      svg: null,
      topPadding: 10,

      hover: null,

      xTooltip: null,
      yTooltip: null,

      countMouseOver: 0
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
    },
    circles () {
      return this.values.filter(v => v.type === 'bxLine')
        .map(v => d3nic.bxCircles()
          .fnDefined(d => d[v.id].length)
          .fnValue(d => d[v.id])
          .fnFill(v.color)
          .fnOpacity(0)
          .fnRadius(4))
    },
    isHover () {
      return this.hover !== null
    },
    fnValueFormat () {
      return format(this.chartConfig.valueFormat)
    }
  },
  watch: {
    values () {
      this.clear()
      this.createAxes()
      this.createMouseBars()
      this.createChart()
      this.draw()
    },
    data () {
      this.draw()
    },
    hover (value) {
      this.circles.map(c =>
        c.join().style('opacity', d => value && value.date === d.date ? 1 : null)
      )
      this.values.map((v, i) => // awful but works
        v.type === 'bxBars' &&
        this.valueComponents[i].join().style('opacity', d => value && value.date === d.date ? 0.8 : null)
      )
    }
  },
  mounted () {
    this.createAxes()
    this.createMouseBars()
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
          .tickFormat(format(this.chartConfig.yFormat))
          .fnBefore(s => s.classed('axis', true))
      ]
    },
    createMouseBars () {
      this.mouseBars = d3nic.bxMouseBars()
        .fnOn('mouseover', this.onMouseover)
        .fnOn('mouseout', this.onMouseout)
    },
    createChart () {
      this.chart = d3nic.bxChart()
        .selector(`#${this.id}`)
        .padding({ left: 50, right: 20, top: this.topPadding, bottom: 30 })
        .fnKey(d => new Date(d.date))
        .fnBandValue(d => d.date)
        .fnContScale(scaleTypes[this.chartConfig.scaleType] || scaleLinear())
      // do not use spread for proxy: they would vanish, use concat instead
        .components(
          this.axes.concat(this.valueComponents)
            .concat(this.circles)
            .concat([this.mouseBars])
        )
    },
    draw () {
      // next tick to be sure to receive the size
      this.$nextTick(() => {
        this.chart
          .size(this.size)
          .data(this.data)
          .draw({ duration: 500 })

        this.svg = select(`#${this.id}`).node()
      })
    },
    clear () {
      this.chart.group().remove()
    },
    onMouseover (d, i, nodes) {
      const top = this.svg.getBoundingClientRect().top + this.topPadding
      const event = this.mouseBars.event()
      this.xTooltip = event.x
      this.yTooltip = top
      this.hover = {
        date: d.date,
        values: this.values.map(v => ({
          label: `${v.label}:`,
          value: d[v.id],
          color: v.color
        }))
          .sort((a, b) => b.value - a.value)
      }
      this.countMouseOver += 1
    },
    onMouseout (state) {
      this.countMouseOver -= 1
      this.debounceMouseOut()
    },
    debounceMouseOut: _.debounce(function () {
      if (this.countMouseOver === 0) {
        this.hover = null
      }
    }, 1)
  }

}
</script>

<style>

</style>
