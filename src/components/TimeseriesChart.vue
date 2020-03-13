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
      v-if="hover !== null"
      v-model="isHover"
      transition="none"
      absolute
      :position-x="xTooltip"
      :position-y="yTooltip"
      top
    >
      <div
        v-if="hover !== null"
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

import { select, touches, event } from 'd3-selection'
import { scaleLinear, scaleLog, scaleSymlog } from 'd3-scale'

import { stack } from 'd3-shape'

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
    timeseries: Array
  },
  data () {
    return {
      chart: null,
      axes: null,
      mouseBars: null,

      valueComponents: null,
      data: null,

      svg: null,
      topPadding: 10,

      hover: null,

      xTooltip: null,
      yTooltip: null,

      newChart: false,

      countMouseOver: 0
    }
  },
  computed: {
    circles () {
      return this.chartConfig.values.filter(v => v.type === 'bxLine')
        .map(v => d3nic.bxCircles()
          .fnDefined(d => v.id in d && d[v.id].length)
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
    chartConfig () {
      this.clear()

      this.computeValueComponents()

      this.createAxes()
      this.createMouseBars()
      this.createChart()

      this.computeData()

      this.chart
        .size(this.size)
        .data(this.data)
        .draw({ duration: this.$isMobile() ? 0 : 500 })
    },
    timeseries () {
      this.computeData()

      this.chart
        .data(this.data)
        .draw({ delay: this.$isMobile() ? 750 : 0, duration: this.$isMobile() ? 0 : 500 })
    },
    size (value) {
      this.chart
        .size(value)
        .draw()
    },
    hover (value) {
      this.circles.map(c =>
        c.join().style('opacity', d => value && value.date === d.date ? 1 : null)
      )
      this.chartConfig.values.map((v, i) => // awful but works
        v.type === 'bxBars' &&
        this.valueComponents[i].join().style('opacity', d => value && value.date === d.date ? 0.8 : null)
      )
    }
  },
  mounted () {
    this.computeValueComponents()

    this.createAxes()
    this.createMouseBars()
    this.createChart()

    this.computeData()

    this.chart
      .size(this.size)
      .data(this.data)
      .draw({ duration: this.$isMobile() ? 0 : 500 })

    this.svg = select(`#${this.id}`)
      .on('touchstart touchmove', this.onTouch)
      .on('touchend', this.onTouchend)
      .node()
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
    computeData () {
      if (!this.chartConfig.stacked) {
        this.data = this.timeseries
      } else {
        const keys = this.chartConfig.values.map(v => v.id).reverse()
        const fnStack = stack().keys(keys)
        const stackedData = fnStack(this.timeseries)
        this.data = this.timeseries.map((d, i) => ({
          ...d,
          ...keys.reduce((acc, k, j) => ({
            ...acc,
            [`stack_${k}`]: this.timeseries.length // considering []
              ? stackedData[j][i].filter((_, i) => i <= 1)
              : 0
          }), {})
        }))
      }
    },
    computeValueComponents () {
      this.valueComponents = this.chartConfig.values.map((v, k) => {
        const component = this.chartConfig.stacked
          ? d3nic[v.type]()
            .fnLowValue(d => (d[`stack_${v.id}`][0]) + (this.chartConfig.scaleType === 'scaleLog' ? 1 : 0))
            .fnHighValue(d => (d[`stack_${v.id}`][1]) + (this.chartConfig.scaleType === 'scaleLog' ? 1 : 0))
            .fnDefined(d => d[`stack_${v.id}`])
          : v.fns.reduce((component, fn, i) => {
            return component[fn.name](d => fn.type === 'field' ? d[fn.value] : fn.value)
              .fnDefined(d => fn.type === 'field' ? fn.value in d && d[fn.value].length : true) // to be reviewed
          }, d3nic[v.type]())
        return v.type === 'bxLine'
          ? component
            .fnFillOpacity(0)
            .fnStrokeWidth(2)
            .fnStroke(v.color)
          : component
            .fnFill(v.color)
            .fnStrokeWidth(0)
      })
    },
    clear () {
      this.chart.group().remove()
    },
    setHover (d) {
      this.hover = {
        date: d.date,
        values: this.chartConfig.values.map(v => ({
          label: `${v.label}:`,
          value: d[v.id],
          color: v.color
        }))
          .sort((a, b) => b.value - a.value)
      }
      this.countMouseOver += 1
    },
    onTouch () {
      // event && event.preventDefault()
      const x = touches(this.svg)[0][0]
      const extent = this.chart.extent()
      if (x > extent[0][0] && x < extent[1][0]) {
        const step = this.chart.fnBandScale().step()
        const d = this.data[Math.floor((x - extent[0][0]) / step)]
        const top = this.svg.getBoundingClientRect().top + this.topPadding
        this.xTooltip = x
        this.yTooltip = top
        this.setHover(d)
      } else {
        this.onTouchend()
      }
    },
    onTouchend () {
      this.hover = null
    },
    onMouseover (d, i, nodes) {
      const top = this.svg.getBoundingClientRect().top + this.topPadding
      const rect = nodes[i].getBoundingClientRect()
      this.xTooltip = (rect.right + rect.x) / 2
      this.yTooltip = top
      this.setHover(d)
    },
    onMouseout () {
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
