import { dsvFormat } from 'd3-dsv'

const fnTimeseriesParser = dsvFormat(',')

const state = {
  fullTimeseries: []
}

const mutations = {
  setFullTimeseries: (state, fullTimeseries) => { state.fullTimeseries = fullTimeseries }
}

const getters = {
  getFullTimeseries: ({ fullTimeseries }) => fullTimeseries,
  getTimeseries: ({ fullTimeseries }, _, __, rootGetters) => {
    const [from, to] = rootGetters['periodRange/getPeriodRange']
      .map((p, i) => i === 0 ? p.from : p.to)
    return fullTimeseries
      .filter(d => {
        const dt = +new Date(d.datetime)
        return dt >= from && dt < to // stricly less
      })
  }
}

const actions = {
  init: ({ dispatch }) => { dispatch('loadTimeseries') },

  loadTimeseries: ({ getters, rootGetters, commit }) => {
    console.log(rootGetters)
    const locationId = rootGetters['location/getLocation'].locationId

    const timeseriesUrl = `/assets/infodemics/${locationId}.csv`

    // fetching the timeseries
    fetch(timeseriesUrl)
      .then(res => res.text())
      .then(data => Promise.resolve(fnTimeseriesParser.parse(data)))
      .then(ts => { commit('setFullTimeseries', ts) })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
