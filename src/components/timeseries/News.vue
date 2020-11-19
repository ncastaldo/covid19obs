<template>
  <div>
    <Article>
      <div class="py-2">
        <div class="headline text-center py-1">
          News Reliability Indices
        </div>
        <div class="text-justify py-1">
          What is the volume of online messages  about COVID-19 pointing to reliable or unreliable sources of information? A reliable source of information is, for instance, www.congress.gov, a project of the Library of Congress that provides an online database of United States Congress legislative information, according to a <a href="https://mediabiasfactcheck.com/congress-gov/">popular fact-checking Web site</a>. Conversely, a potentially unreliable source of information is, for instance, www.zerohedge.com, <a href="https://mediabiasfactcheck.com/zero-hedge/">known for sharing false or inaccurate news.</a>
          <br>
          <br>
          The volume of messages containing reliable and unreliable information is shown over time. The difference between reliable and unreliable volumes is shown as a dashed line: the closer the line to the top, the more healthy the sources of information circulating online
        </div>
      </div>
    </Article>

    <PeriodSelector />
    <TimeseriesChart
      :id="timeseriesConfig.id"
      :key="timeseriesConfig.id"
      :height="200"
      :timeseries="timeseries"
      :config="timeseriesConfig"
      :getComponents="getTimeseriesComponents"
    />
    <div class="d-flex flex-row-reverse align-center justify-center mt-3 pa-4">
      <div class="col-6">
        <div class="headline text-center py-1">
          News Reliability Index
        </div>
        <div class="text-justify py-1">
          We further distinguish classes of information sources into:
          <br>
          <ul>
            <li>
              Reliable
              <ul>
                <li>MSM: Recognized and politically unbiased mainstream media</li>
                <li>Science: Recognized scientific sources</li>
              </ul>
            </li>

            <li>
              Unreliable
              <ul>
                <li>Satire: Known to use humour and irony to expose and criticize news</li>
                <li>Clickbait: Known source of false advertisement designed to attract attention</li>
                <li>Political: Known politically biased media</li>
                <li>Fake: Known to spread fake news and hoaxes</li>
                <li>Conspiracy: Known to spread false narratives and conspiracy theories</li>
              </ul>
            </li>
          </ul>
          Science and MSM are predominant in healthy online discussions. The News Reliability Index quantifies the relative volume of reliable content with respect to the overall volume of messages pointing to sources of information.
        </div>
      </div>
      <ArcChart
        :id="arcConfig.id"
        :key="arcConfig.id"
        ref="arcChart"
        class="col-6"
        :height="300"
        :arcData="arcData"
        :config="arcConfig"
        :getComponents="getArcComponents"
      />
    </div>
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'
import ArcChart from './../graphics/ArcChart'
import PeriodSelector from './../control/PeriodSelector'

import { mapGetters } from 'vuex'

import { sum } from 'd3-array'
import { stack } from 'd3-shape'
import { bxBars, bxLine, bxCircles, brStackBars } from 'd3nic'

import {
  fillOpacityMouseover,
  fillOpacityMouseout,
  opacityMouseover,
  opacityMouseout
} from '../../plugins/graphics'

const newsColors = {
  reliable: '#5aae61', // '#018571',
  unreliable: '#9970ab', // '#8856A7',
  difference: '#111'
}

const timeseriesConfig = {
  id: 'news',
  formatType: '~s',
  fnTooltips: d => [
    { name: 'Reliable', value: +d.info_fact_reliable, color: newsColors.reliable, formatType: '.3s' },
    { name: 'Unreliable', value: +d.info_fact_unreliable, color: newsColors.unreliable, formatType: '.3s' },
    { name: 'Difference', value: +d.info_fact_reliable - +d.info_fact_unreliable, color: newsColors.difference, formatType: '.3s' }
  ]
}

const getTimeseriesComponents = () => [
  bxBars()
    .fnDefined(d => d.info_fact_reliable != null)
    .fnHighValue(d => +d.info_fact_reliable)
    .fnLowValue(d => 0)
    .fnFill(newsColors.reliable)
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),
  bxBars()
    .fnDefined(d => +d.info_fact_unreliable != null)
    .fnHighValue(d => -d.info_fact_unreliable)
    .fnLowValue(d => 0)
    .fnFill(newsColors.unreliable)
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),
  bxLine()
    .fnDefined(d => +d.info_fact_reliable != null)
    .fnValue(d => +d.info_fact_reliable - +d.info_fact_unreliable)
    .fnFillOpacity(d => 0)
    .fnStroke(newsColors.difference)
    .fnStrokeWidth(d => 2)
    .fnStrokeDasharray(d => [2, 2]),
  bxCircles()
    .fnDefined(d => +d.info_fact_reliable != null)
    .fnValue(d => +d.info_fact_reliable - +d.info_fact_unreliable)
    .fnFill(newsColors.difference)
    .fnRadius(d => 4)
    .fnStrokeWidth(d => 0)
    .fnOpacity(d => 0)
    .fnOn('mouseover', opacityMouseover)
    .fnOn('mouseout', opacityMouseout)
]

const news = [
  { key: 'info_fact_science', name: 'Science', color: '#1b7837' },
  { key: 'info_fact_msm', name: 'MSM', color: '#5aae61' },
  { key: 'info_fact_satire', name: 'Satire', color: '#e7d4e8' },
  { key: 'info_fact_clickbait', name: 'Clickbait', color: '#c2a5cf' },
  { key: 'info_fact_political', name: 'Political', color: '#9970ab' },
  { key: 'info_fact_fake', name: 'Fake', color: '#762a83' },
  { key: 'info_fact_conspiracy', name: 'Conspiracy', color: '#40004b' }
]

export default {
  components: {
    TimeseriesChart,
    ArcChart,
    PeriodSelector
  },
  data () {
    return {
      timeseriesConfig,
      getTimeseriesComponents,
      arcConfig: {
        id: 'arc-news',
        bandPaddingInner: 0.5,
        bandPaddingOuter: 0,
        fnTooltips: d => [
          { name: 'Pct.', value: d.pct, formatType: '.2%' },
          { name: 'Tot.', value: d.value, formatType: '.3s' }
        ]
      },
      getArcComponents: () => [
        brStackBars()
          .fnFill(d => d.color)// d.color)
          .fnLowValue(d => d.stack[0])
          .fnHighValue(d => d.stack[1])
          .fnStroke(d => '#000')
          .fnStrokeWidth(d => 0)
          .fnOn('mouseover', this.$refs.arcChart.onMouseover)
          .fnOn('mouseout', this.$refs.arcChart.onMouseout)
          .fnOn('mouseover.fill-opacity', fillOpacityMouseover)
          .fnOn('mouseout.fill-opacity', fillOpacityMouseout)
          .phi(0)
      ]
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries',
      periodRange: 'period/getPeriodRange'
    }),
    period () {
      return this.periodRange
        .map(pr => pr.periodName)
        .join(' - ')
    },
    arcData () {
      const arcValues = news.map(d => ({
        ...d,
        value: sum(this.timeseries, ts => ts[d.key])
        // period: this.period
      }))

      const tot = sum(arcValues, d => d.value) || 1

      arcValues.forEach(d => { d.pct = d.value / tot })

      // function to stack
      const fnStack = stack()
        .keys(news.map(a => a.key))

      // tricks here
      const stackObject = fnStack([arcValues
        .reduce((acc, a) => ({ ...acc, [a.key]: a.value }), {})])
        .reduce((acc, s) => ({ ...acc, [s.key]: [s[0][0], s[0][1]] }), {})

      return arcValues.map(d => ({
        ...d,
        stack: stackObject[d.key]
      }))
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
