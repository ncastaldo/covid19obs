import { csvParse } from 'd3-dsv'

import variables from '../assets/variables'

import { getFnDefined } from '../plugins/utils'

const compareVarList = Object.values(variables)
  .filter(v => v.compare) // filter only the compare ones
  .map(({ id, name, ...rest }) => ({
    compareVarId: id,
    compareVarName: name,
    ...rest
  }))

const fnParse = ({ variable, iso, ...dateValues }) => ({
  variable,
  iso,
  ...Object.entries(dateValues)
    .map(([date, value]) => [date, value.length ? +value : null])
    .reduce((acc, [date, value]) => ({ ...acc, [date]: value }), {})
})

const compareVars = compareVarList
  .reduce((compareVars, cv) => ({
    ...compareVars,
    [cv.compareVarId]: {
      ...cv,
      fnDefined: getFnDefined(cv) // easier
    }
  }), {})

console.log(compareVars)

const makeState = () => ({
  compareVarId: null,
  compareVars,

  fullCompare: []
})

const mutations = {
  setCompareVarId: (state, compareVarId) => { state.compareVarId = compareVarId },

  setFullCompare: (state, fullCompare) => { state.fullCompare = fullCompare }
}

const getters = {
  getCompareVars: ({ compareVars }) => Object.values(compareVars),
  getCompareVar: ({ compareVars, compareVarId }) => compareVars[compareVarId],

  getFullCompare: ({ fullCompare }) => fullCompare,
  getCompare: ({ fullCompare }, _, __, rootGetters) => {
    const periodISO = rootGetters['period/getPeriod'].periodISO
    const locationList = rootGetters['location/getLocationList']
    return fullCompare
      .filter(cmp => locationList.map(l => l.locationId).includes(cmp.locationId))
      // assigning the value
      .map(cmp => ({ ...cmp, value: cmp[periodISO] }))
  }
}

// TODO dedicate new url and files
// in order to select month

const actions = {
  init: ({ commit, dispatch }, compareVarId) => {
    commit('setCompareVarId', compareVarId)
    console.log(compareVarId)
    dispatch('loadCompare')
  },

  loadCompare: ({ getters, dispatch }) => {
    const compareVarId = getters.getCompareVar.compareVarId

    const compareUrl = `/assets/compare/${compareVarId}.csv`

    // fetching the compare
    fetch(compareUrl)
      .then(res => res.text())
      .then(data => csvParse(data, fnParse))
      .then(fullCmp => { dispatch('setFullCompare', fullCmp) })
  },

  setCompareVarId: ({ commit, dispatch }, compareVarId) => {
    commit('setCompareVarId', compareVarId)
    dispatch('loadCompare')
  },

  setFullCompare: ({ commit, rootGetters }, fullCmp) => {
    const fullCompare = fullCmp.map(({ iso, ...rest }) => ({
      ...rootGetters['location/getLocationInfo'](iso),
      ...rest
    }))
    commit('setFullCompare', fullCompare)
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
