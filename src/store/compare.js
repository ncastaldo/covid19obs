import { variableList, variables, compareTextParser } from '../plugins/util'

const compares = variableList
  .filter(v => v.compare) // filter only the compare ones
  .map(({ id, name, ...rest }) => ({
    compareId: id,
    compareName: name
  }))
  .reduce((acc, c) => ({
    ...acc,
    [c.compareId]: c
  }), {})

// REMEMBER TO CONSIDER fnDefined!!

const makeState = () => ({
  compareId: null,
  compares,

  compareVariableInfo: null,
  fullCompareData: []
})

const mutations = {
  setCompareId: (state, compareId) => { state.compareId = compareId },

  setCompareVariableInfo: (state, compareVariableInfo) => { state.compareVariableInfo = compareVariableInfo },
  setFullCompareData: (state, fullCompareData) => { state.fullCompareData = fullCompareData }
}

const getters = {
  getCompares: ({ compares }) => Object.values(compares),
  getCompare: ({ compares, compareId }) => compares[compareId],

  getCompareVariableInfo: ({ compareVariableInfo }) => compareVariableInfo,

  getFullCompareData: ({ fullCompareData }) => fullCompareData,
  getCompareData: ({ fullCompareData }, _, __, rootGetters) => {
    const monthISO = rootGetters['month/getMonth'].monthISO
    const locationList = rootGetters['location/getLocationList']
    return fullCompareData
      .filter(cmp => locationList.map(l => l.locationId).includes(cmp.locationId))
      // assigning the value
      .map(cmp => ({ ...cmp, value: cmp[monthISO] }))
  }
}

// TODO dedicate new url and files
// in order to select month

const actions = {
  init: ({ commit, dispatch }, compareId) => {
    // just to have something in that variable
    commit('setCompareVariableInfo', variables[compareId])

    // dispatching here!
    return dispatch('setCompareId', compareId)
  },

  loadRawCompareData: ({ getters, dispatch }) => {
    const compareId = getters.getCompare.compareId
    const compareUrl = `/assets/compare/${compareId}.csv`

    // fetching the compare
    return fetch(compareUrl)
      .then(res => res.text())
      .then(data => compareTextParser(data))
      .then(rawCompareData => { dispatch('setRawCompareData', { rawCompareData, compareId }) })
  },

  setCompareId: ({ commit, dispatch }, compareId) => {
    commit('setCompareId', compareId)
    return dispatch('loadRawCompareData')
  },

  setRawCompareData: ({ commit, rootGetters }, { rawCompareData, compareId }) => {
    const fullCompareData = rawCompareData.map(({ iso, ...rest }) => ({
      // appending information about the location
      ...rootGetters['location/getLocationInfo'](iso),
      ...rest
    }))
    commit('setFullCompareData', fullCompareData)
    commit('setCompareVariableInfo', variables[compareId])
  }
}

export default function () {
  return {
    namespaced: true,
    state: makeState(),
    mutations,
    getters,
    actions
  }
}
