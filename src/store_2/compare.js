import { dsvFormat } from 'd3-dsv'

const fnCompareParser = dsvFormat(',')

const state = {
  fullCompare: []
}

const mutations = {
  setFullCompare: (state, fullCompare) => { state.fullCompare = fullCompare }
}

const getters = {
  getFullCompare: ({ fullCompare }) => fullCompare,
  getCompare: ({ fullCompare }, _, __, rootGetters) => {
    const [from, to] = rootGetters['periodRange/getPeriodRange']
      .map((p, i) => i === 0 ? p.from : p.to)
    return fullCompare
      .filter(d => {
        const dt = +new Date(d.datetime)
        return dt >= from && dt < to // stricly less
      })
  }
}

const actions = {
  init: ({ dispatch }) => { dispatch('loadCompare') },

  loadCompare: ({ getters, rootGetters, commit }) => {
    console.log(rootGetters)
    const locationId = rootGetters['location/getLocation'].locationId

    const compareUrl = `/assets/infodemics/${locationId}.csv`

    // fetching the compare
    fetch(compareUrl)
      .then(res => res.text())
      .then(data => Promise.resolve(fnCompareParser.parse(data)))
      .then(ts => { commit('setFullCompare', ts) })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
