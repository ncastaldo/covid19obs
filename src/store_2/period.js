const state = {
  periods: null,
  periodId: null,
  periodIdRange: null
}

const mutations = {
  setPeriods: (state, periods) => { state.periods = periods },
  setPeriodId: (state, periodId) => { state.periodId = periodId },
  setPeriodIdRange: (state, periodIdRange) => { state.periodIdRange = periodIdRange }
}

const getters = {
  getPeriods: ({ periods }) => Object.values(periods),
  getPeriod: ({ periods, periodId }) => periods[periodId],
  getPeriodRange: ({ periods, periodIdRange }) => periodIdRange.map(id => periods[id])
}

// same as periodRange
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const actions = {
  init: ({ commit }, { periodList, periodId, periodIdRange }) => {
    const periods = periodList
      .map((date, i, array) => ({
        periodId: +date,
        periodName: capitalize(date.toLocaleString('en', { month: 'long', year: 'numeric' })),
        periodISO: date.toISOString().slice(0, 7), // 2020-08###
        from: +date,
        to: i < array.length - 1 ? +array[i + 1] : Number.POSITIVE_INFINITY
      }))
      .reduce((periods, p) => ({
        ...periods,
        [p.periodId]: p
      }), {})
    commit('setPeriods', periods)
    commit('setPeriodId', periodId)
    commit('setPeriodIdRange', periodIdRange)
  },

  // may be substituted directly with mutation
  setPeriodId: ({ commit, dispatch }, periodId) => {
    commit('setPeriodId', periodId)
  },

  // may be substituted directly with mutation
  setPeriodIdRange: ({ commit, dispatch }, periodIdRange) => {
    commit('setPeriodIdRange', periodIdRange)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
