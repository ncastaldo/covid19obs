import { csvParse } from 'd3-dsv'

const fnParse = ({ iso, datetime, ...rest }) => ({
  iso,
  datetime,
  date: Date.parse(datetime),
  ...Object.entries(rest)
    .map(([key, value]) => [key, value.length ? +value : null])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
})

const state = {
  fullTimeseries: []
}

const mutations = {
  setFullTimeseries: (state, fullTimeseries) => { state.fullTimeseries = fullTimeseries }
}

const getters = {
  getFullTimeseries: ({ fullTimeseries }) => fullTimeseries,
  getTimeseries: ({ fullTimeseries }, _, __, rootGetters) => {
    const [from, to] = rootGetters['period/getPeriodRange']
      .map((p, i) => i === 0 ? p.from : p.to)
    return fullTimeseries
      .filter(d => +d.date >= from && +d.date < to) // stricly less
  }

}

const actions = {
  init: ({ dispatch }) => { dispatch('loadTimeseries') },

  loadTimeseries: ({ getters, rootGetters, commit }) => {
    // console.log(rootGetters)
    const locationId = rootGetters['location/getLocation'].locationId

    const timeseriesUrl = `/assets/infodemics/${locationId}.csv`

    // fetching the timeseries
    fetch(timeseriesUrl)
      .then(res => res.text())
      .then(data => csvParse(data, fnParse))
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
