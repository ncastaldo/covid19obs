import { csvParse } from 'd3-dsv'

const fnParse = ({ iso, date, ...rest }) => ({
  iso,
  dateISO: date,
  date: Date.parse(date),
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
    const [from, to] = rootGetters['period/getDateIdRange']
    return fullTimeseries
      .filter(d => +d.date >= from && +d.date <= to) //  less or equal
  }

}

const actions = {
  init: ({ dispatch }) => { return dispatch('loadTimeseries') },

  loadTimeseries: ({ getters, rootGetters, commit }) => {
    // console.log(rootGetters)
    const locationId = rootGetters['location/getLocation'].locationId

    const timeseriesUrl = `/assets/timeseries/${locationId}.csv`

    // fetching the timeseries
    return fetch(timeseriesUrl)
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
