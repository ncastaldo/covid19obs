const compareVarList = [
  {
    compareVarId: 'info_tweets',
    compareVarName: 'Collected tweets',
    compareVarColor: '#2877b8'
  },
  {
    compareVarId: 'epi_confirmed',
    compareVarName: 'Confirmed cases',
    compareVarColor: '#e34a33'
  },
  {
    compareVarId: 'epi_dead',
    compareVarName: 'Deaths',
    compareVarColor: '#8856a7'
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
