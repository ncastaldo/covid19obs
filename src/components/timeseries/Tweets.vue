<template>
  <div class="pt-5">
    <TimeseriesChart
      :id="typeConfig.id"
      :key="typeConfig.id"
      :height="200"
      :timeseries="modifiedTimeseries"
      :config="typeConfig"
      :getComponents="getTypeComponents"
    />
    <TimeseriesChart
      :id="localConfig.id"
      :key="localConfig.id"
      :height="120"
      :timeseries="modifiedTimeseries"
      :config="localConfig"
      :getComponents="getLocalComponents"
    />
    <TimeseriesChart
      :id="verifiedConfig.id"
      :key="verifiedConfig.id"
      :height="120"
      :timeseries="modifiedTimeseries"
      :config="verifiedConfig"
      :getComponents="getVerifiedComponents"
    />
    <Article>
      <div class="text-justify py-1">
        Social media data used to estimate Infodemic Risk Indices and News Reliability Indices refer to messages posted in the popular microblogging platform Twitter.
        <br>
        Collected data include stand-alone messages (Tweets) and special social interactions encoding endorsement and engagement (Retweets, Replies). The evolution over time of the volume of each class is shown.
        <br>
        <PolicyText>
          More widely covered and engaging news have potentially a bigger impact on individual and social behaviors. The volume of social media activity gives us a proxy of the level of informational input to which people are exposed in a given moment.
        </PolicyText>
        Messages are further classified with respect to their language, which can be the official language of the country (Local) or another language (Foreign).

        <PolicyText>
          Messages in local language are targeting a wide local audience. Messages in foreign languages (such as English in non-English speaking countries) are targeting the most educated segment of the public opinion as well as foreign public opinion, opinion makers, and media.
        </PolicyText>
        Messages are also classified in terms of their originators. In fact, when an account of public interest is authentic it is labeled by Twitter as Verified. For instance, the account of the former President of the United States of America Barack Obama, as well as the account of the World Health Organization, are both Verified. User which are not verified by Twitter can belong either to real people who publicly share their names (such as physicians, professors, students, so forth so on), anonymous accounts and fictitious accounts which are potentially malicious (e.g., spreading false statements or engaging with real users sharing unreliable information). These types of accounts are Unverified.
        A healthy online discussion has preferably a high volume of messages from Verified accounts.
        <PolicyText>
          Verified sources are generally more reliable and are exposed to closer screening by online moderators. Non-verified sources are also important because they reflect the views and positions of that part of the public opinion that is not made of opinion makers, but is also more manipulable and more likely to contain misinformation. A fair sampling of the infodemic flow should contain both kinds of sources, as verified users are more reliable but also the official expression of institutions and public figures, whereas unverified users are less reliable but inform about how the current opinion is moving.
        </PolicyText>
      </div>
    </Article>
  </div>
</template>

<script>
import TimeseriesChart from './../graphics/TimeseriesChart'

import { mapGetters } from 'vuex'

import { bxBars, bxLine, bxArea, bxLines, bxCircles } from 'd3nic'
import { stack } from 'd3-shape'

import {
  fillOpacityMouseover,
  fillOpacityMouseout,
  opacityMouseover,
  opacityMouseout
} from '../../plugins/graphics'

// ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"

const colors = {
  T: '#045a8d', // '#045a8d',
  RT: '#3690c0', // '#2b8cbe',
  RE: '#a6bddb',
  local: '#1C8571',
  foreign: '#74c476',
  verified: '#e08214',
  unverified: '#8073ac'
}

const typeConfig = {
  id: 'type-tweets',
  formatType: '~s',
  yLabel: '# Tweets',
  fnTooltips: d => [
    { name: 'Tweets', value: d.info_tweets_T, color: colors.T, formatType: '.3s' },
    { name: 'Retweets', value: d.info_tweets_RT, color: colors.RT, formatType: '.3s' },
    { name: 'Replies', value: d.info_tweets_RE, color: colors.RE, formatType: '.3s' }
  ].reverse()
}

const getTypeComponents = () => [
  bxBars()
    .fnDefined(d => d.info_tweets_T != null)
    .fnLowValue(d => d.stack_info_tweets_T[0])
    .fnHighValue(d => d.stack_info_tweets_T[1])
    .fnFill(colors.T)
    .fnFillOpacity(0.9)
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),
  bxBars()
    .fnDefined(d => d.info_tweets_RT != null)
    .fnLowValue(d => d.stack_info_tweets_RT[0])
    .fnHighValue(d => d.stack_info_tweets_RT[1])
    .fnFill(colors.RT)
    .fnFillOpacity(0.9)
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout),
  bxBars()
    .fnDefined(d => d.info_tweets_RE != null)
    .fnLowValue(d => d.stack_info_tweets_RE[0])
    .fnHighValue(d => d.stack_info_tweets_RE[1])
    .fnFill(colors.RE)
    .fnFillOpacity(0.9)
    .fnOn('mouseover', fillOpacityMouseover)
    .fnOn('mouseout', fillOpacityMouseout)
]

const localConfig = {
  id: 'local-tweets',
  bandPaddingInner: 1,
  formatType: '.0%',
  yLabel: 'Language',
  fnTooltips: d => [
    { name: 'Local [%]', value: d.info_tweets_local_fraction, color: colors.local, formatType: '.1%' },
    { name: 'Foreign [%]', value: 1 - d.info_tweets_local_fraction, color: colors.foreign, formatType: '.1%' }
  ].reverse()
}

const verifiedConfig = {
  id: 'verified-tweets',
  bandPaddingInner: 1,
  formatType: '.0%',
  yLabel: 'Verified',
  fnTooltips: d => [
    { name: 'Verified [%]', value: d.info_tweets_verified_fraction, color: colors.verified, formatType: '.1%' },
    { name: 'Unverified [%]', value: 1 - d.info_tweets_verified_fraction, color: colors.unverified, formatType: '.1%' }
  ].reverse()
}

const getAreaComponent = (fnLow, fnHigh, color) =>
  bxArea()
    .fnDefined(d => fnLow(d) !== null)
    .fnLowValue(fnLow)
    .fnHighValue(fnHigh)
    .fnFillOpacity(0.5)
    .fnFill(color)

const getLineComponent = (fn, color, dash = null) =>
  bxLine()
    .fnDefined(d => fn(d) !== null)
    .fnValue(fn)
    .fnStroke(color)
    .fnStrokeWidth(2)
    .fnStrokeDasharray(dash)
    .fnFillOpacity(0)

const getCirclesComponent = (fn, color) =>
  bxCircles()
    .fnDefined(d => fn(d) != null)
    .fnValue(fn)
    .fnFill(color)
    .fnRadius(d => 5)
    .fnStrokeWidth(d => 0)
    .fnOpacity(d => 0)
    .fnOn('mouseover', opacityMouseover)
    .fnOn('mouseout', opacityMouseout)

const getLinesComponent = (fn, color) =>
  bxLines()
    .fnDefined(d => fn(d) != null)
    .fnLowValue(d => 0)
    .fnHighValue(fn)
    .fnFillOpacity(d => 0)
    .fnStrokeWidth(d => 1)
    .fnStroke(d => color)
    .fnOpacity(d => 0)
    .fnOn('mouseover', opacityMouseover)
    .fnOn('mouseout', opacityMouseout)

const getLocalComponents = () => [
  getAreaComponent(d => 0, d => d.info_tweets_local_fraction, colors.local),
  getAreaComponent(d => d.info_tweets_local_fraction, d => 1, colors.foreign),
  getLineComponent(d => 0.5, '#878787', [6, 2]),
  getLineComponent(d => d.info_tweets_local_fraction, '#111'),
  getLinesComponent(d => 1, '#878787'),
  getCirclesComponent(d => d.info_tweets_local_fraction, '#111')
]

const getVerifiedComponents = () => [
  getAreaComponent(d => 0, d => d.info_tweets_verified_fraction, colors.verified),
  getAreaComponent(d => d.info_tweets_verified_fraction, d => Math.max(d.info_tweets_verified_fraction, 0.15), colors.unverified),
  // getLineComponent(d => 0.05, '#878787', [2, 10]),
  getLineComponent(d => 0.10, '#878787', [2, 10]),
  getLineComponent(d => d.info_tweets_verified_fraction, '#111'),
  getLinesComponent(d => Math.max(d.info_tweets_verified_fraction, 0.15), '#878787'),
  getCirclesComponent(d => d.info_tweets_verified_fraction, '#111')
]

export default {
  components: {
    TimeseriesChart
  },
  data () {
    return {
      typeConfig,
      getTypeComponents,
      verifiedConfig,
      localConfig,
      getLocalComponents,
      getVerifiedComponents
    }
  },
  computed: {
    ...mapGetters({
      timeseries: 'timeseries/getTimeseries'
    }),
    modifiedTimeseries () {
      const keys = ['info_tweets_T', 'info_tweets_RT', 'info_tweets_RE']
      const fnStack = stack().keys(keys)
      const stackedData = fnStack(this.timeseries)
      return this.timeseries.map((d, i) => ({
        ...d,
        info_tweets_foreign: +d.info_tweets - +d.info_tweets_local,
        info_tweets_local_fraction: d.info_tweets !== null && d.info_tweets > 0
          ? d.info_tweets_local / (+d.info_tweets)
          : null,
        info_tweets_verified_fraction: d.info_tweets !== null && d.info_tweets > 0
          ? d.info_tweets_verified / (+d.info_tweets)
          : null,
        ...keys.reduce((acc, k, j) => ({
          ...acc,
          [`stack_${k}`]: this.timeseries.length // considering []
            ? stackedData[j][i].filter((_, i) => i <= 1)
            : 0
        }), {})
      }))
    }

  }
}
</script>

<style>

</style>
