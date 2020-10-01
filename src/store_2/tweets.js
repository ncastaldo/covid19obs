import { dsvFormat } from 'd3-dsv'
import { mean, extent } from 'd3-array'

const fnCompareParser = dsvFormat(',')

const state = {
  fullTweetsDict: {}
}

const mutations = {
  setFullTweetsDict: (state, fullTweetsDict) => { state.fullTweetsDict = fullTweetsDict }
}

const getters = {
  getTweetsDict: ({ fullTweetsDict }, _, __, rootGetters) => {
    const [fromISO, toISO] = rootGetters['period/getPeriodRange'].map(p => p.periodISO)

    return Object.values(fullTweetsDict)
      .map(({ iso, variable, ...rest }) => ({
        iso,
        value: mean(Object.entries(rest)
          .filter(([p]) => p >= fromISO && p < toISO)
          .map(([_, v]) => +v))
      }))
      .reduce((acc, { iso, ...rest }) => ({
        ...acc,
        [iso]: rest
      }), {})
  },

  getTweetsDomain: (_, getters) => {
    return extent(Object.values(getters.getTweetsDict), d => d.value)
  },

  getTimeseriesTweets: ({ fullTweetsDict }, _, __, rootGetters) => {
    const periods = rootGetters['period/getPeriods']
    const locationId = rootGetters['location/getLocation'].locationId
    return periods
      .map(({ periodId, periodISO }) => ({
        periodId,
        value: fullTweetsDict && locationId in fullTweetsDict
          ? +fullTweetsDict[locationId][periodISO]
          : 1
      }))
  }
}

// TODO dedicate new url and files
// in order to select month

const actions = {
  init: ({ dispatch }) => {
    dispatch('loadTweets')
  },

  loadTweets: ({ rootGetters, commit }) => {
    // console.log(rootGetters)
    const layerId = rootGetters['layer/getLayer'].layerId

    const tweetsUrl = `/assets/compare/${layerId}.csv`

    console.log(tweetsUrl)

    // fetching the compare
    fetch(tweetsUrl)
      .then(res => res.text())
      .then(data => fnCompareParser.parse(data))
      .then(tweets => tweets.reduce((acc, { iso, ...rest }) => ({
        ...acc,
        [iso]: { iso, ...rest }
      }), {}))
      .then(fullTweetsDict => { commit('setFullTweetsDict', fullTweetsDict) })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
