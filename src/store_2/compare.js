import { dsvFormat } from 'd3-dsv'

const compareVarList = [
  {
    compareVarId: 'info_tweets',
    compareVarName: 'Collected tweets',
    color: '#2877b8',
    scaleType: 'scaleLog',
    fixedDomain: [1, null],
    minValue: 1
  },
  {
    compareVarId: 'epi_confirmed',
    compareVarName: 'Confirmed cases',
    color: '#e34a33',
    scaleType: 'scaleLog',
    minValue: 1
  },
  {
    compareVarId: 'epi_confirmed_new',
    compareVarName: 'Avg. daily cases',
    color: '#e34a33',
    scaleType: 'scaleLog',
    minValue: 1
  },
  {
    compareVarId: 'epi_dead',
    compareVarName: 'Deaths',
    color: '#8856a7',
    scaleType: 'scaleLog',
    minValue: 1
  },
  {
    compareVarId: 'epi_dead_new',
    compareVarName: 'Avg. daily deaths',
    color: '#8856a7',
    scaleType: 'scaleLog',
    minValue: 1
  },
  {
    compareVarId: 'info_fact_unreliable',
    compareVarName: 'Unreliable facts',
    color: '#8856A7',
    scaleType: 'scaleLog',
    minValue: 1
  },
  {
    compareVarId: 'info_risk_index',
    compareVarName: 'Avg. risk Index',
    color: '#2877b8',
    scaleType: 'scaleLinear',
    minValue: 0
  }]

const fnCompareParser = dsvFormat(',')

const compareVars = compareVarList
  .reduce((compareVars, ml) => ({
    ...compareVars,
    [ml.compareVarId]: ml
  }), {})

const makeState = () => ({
  compareVarId: 'info_tweets',
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
  init: ({ commit, dispatch }, compareVarId) => {
    commit('setCompareVarId', compareVarId)
    dispatch('loadCompare')
  },

  loadCompare: ({ getters, dispatch }) => {
    const compareVarId = getters.getCompareVar.compareVarId

    const compareUrl = `/assets/compare/${compareVarId}.csv`

    // fetching the compare
    fetch(compareUrl)
      .then(res => res.text())
      .then(data => Promise.resolve(fnCompareParser.parse(data)))
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
