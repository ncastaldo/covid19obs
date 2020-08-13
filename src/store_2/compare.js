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
    const periodId = rootGetters['period/getPeriod'].periodId
    const locationList = rootGetters['location/getLocationList']
    return fullCompare
      .filter(cmp => locationList.map(l => l.locationId).includes(cmp.locationId))
      .map(cmp => ({
        ...cmp,
        value: +cmp[periodId] // + because parser gives string
      }))
  }
}

// TODO dedicate new url and files
// in order to select month

const actions = {
  init: ({ dispatch }) => { dispatch('loadCompare') },

  loadCompare: ({ rootGetters, dispatch }) => {
    const compareVarId = rootGetters['compareVar/getCompareVar'].compareVarId

    const compareUrl = `/assets/compare/${compareVarId}.csv`

    // fetching the compare
    fetch(compareUrl)
      .then(res => res.text())
      .then(data => Promise.resolve(fnCompareParser.parse(data)))
      .then(fullCmp => { dispatch('setFullCompare', fullCmp) })
  },

  setFullCompare: ({ commit, rootGetters }, fullCmp) => {
    const fullCompare = fullCmp.map(({ iso, ...rest }) => ({
      ...rootGetters['location/getLocationInfo'](iso),
      ...rest
    }))
    commit('setFullCompare', fullCompare)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
