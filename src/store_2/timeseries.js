import { dsvFormat } from 'd3-dsv'

const fnTimeseriesParser = dsvFormat(',')

const state = {
  timeseries: []
}

const mutations = {
  setTimeseries: (state, timeseries) => { state.timeseries = timeseries }
}

const getters = {
  getTimeseries: ({ timeseries }) => timeseries
}

const actions = {
  init: ({ dispatch }) => { dispatch('loadTimeseries') },

  loadTimeseries: ({ rootGetters, commit }) => {
    const locationId = rootGetters.getLocation.locationId
    const timeseriesUrl = `/assets/infodemics/${locationId}.csv`

    // fetching the timeseries
    fetch(timeseriesUrl)
      .then(res => res.text())
      .then(data => Promise.resolve(fnTimeseriesParser.parse(data)))
      .then(ts => { commit('setTimeseries', ts) })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
