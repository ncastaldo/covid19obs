const state = {
  periods: null,
  periodId: null
}

const mutations = {
  setPeriods: (state, periods) => { state.periods = periods },
  setPeriodId: (state, periodId) => { state.periodId = periodId }
}

const getters = {
  getPeriods: ({ periods }) => Object.values(periods),
  getPeriod: ({ periods, periodId }) => periods[periodId]
}

// same as periodRange
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const actions = {
  init: ({ commit }, { periodList, periodId }) => {
    const periods = periodList
      .map((date, i, array) => ({
        periodId: date.toISOString().slice(0, 7), // 2020-08###,
        periodName: capitalize(date.toLocaleString('en', { month: 'long', year: 'numeric' }))
      }))
      .reduce((periods, p) => ({
        ...periods,
        [p.periodId]: p
      }), {})
    console.log(periodList)
    commit('setPeriods', periods)
    commit('setPeriodId', periodId.toISOString().slice(0, 7))
  },

  // may be substituted directly with mutation
  setPeriodId: ({ commit, dispatch }, periodId) => {
    commit('setPeriodId', periodId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
