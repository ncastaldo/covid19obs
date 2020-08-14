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
    compareVarId: 'info_risk_index',
    compareVarName: 'Avg. risk Index',
    color: '#2877b8',
    scaleType: 'scaleLinear',
    minValue: 0
  }]

const compareVars = compareVarList
  .reduce((compareVars, ml) => ({
    ...compareVars,
    [ml.compareVarId]: ml
  }), {})

const state = {
  compareVarId: 'info_tweets',
  compareVars
}

const mutations = {
  setCompareVarId: (state, compareVarId) => { state.compareVarId = compareVarId }
}

const getters = {
  getCompareVars: ({ compareVars }) => Object.values(compareVars),
  getCompareVar: ({ compareVars, compareVarId }) => compareVars[compareVarId]
}

const actions = {
  setCompareVarId: ({ commit, dispatch }, compareVarId) => {
    commit('setCompareVarId', compareVarId)
    dispatch('compare/loadCompare', {}, { root: true })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
