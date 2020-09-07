import { dsvFormat } from 'd3-dsv'

const fnCompareParser = dsvFormat(',')

const state = {
  tweetsDict: null
}

const mutations = {
  setTweetsDict: (state, tweetsDict) => { state.tweetsDict = tweetsDict }
}

const getters = {
  getTweetsDict: ({ tweetsDict }) => tweetsDict,

  getTweets: ({ tweetsDict }, _, __, rootGetters) => {
    const periods = rootGetters['period/getPeriods']
    const locationId = rootGetters['location/getLocation'].locationId
    return periods
      .map(({ periodId, periodISO }) => ({
        periodId,
        value: tweetsDict && locationId in tweetsDict
          ? +tweetsDict[locationId][periodISO]
          : 1
      }))
  }
}

// TODO dedicate new url and files
// in order to select month

const actions = {
  init: ({ commit, dispatch }) => {
    dispatch('loadTweets')
  },

  loadTweets: ({ commit }) => {
    const tweetsUrl = '/assets/compare/info_tweets.csv'

    // fetching the compare
    fetch(tweetsUrl)
      .then(res => res.text())
      .then(data => fnCompareParser.parse(data))
      .then(data => data.reduce((acc, { iso, ...rest }) => ({
        ...acc,
        [iso]: rest
      }), {}))
      .then(tweetsDict => { commit('setTweetsDict', tweetsDict) })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
