const state = {
  months: null,
  monthId: null
}

const mutations = {
  setMonths: (state, months) => { state.months = months },
  setMonthId: (state, monthId) => { state.monthId = monthId }
}

const getters = {
  getMonths: ({ months }) => Object.values(months),
  getMonth: ({ months, monthId }) => months[monthId]
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const actions = {
  init: ({ commit }, { monthList, monthId }) => {
    const months = monthList
      .map((date, i, array) => ({
        monthId: +date,
        monthName: capitalize(date.toLocaleString('en', { month: 'long', year: 'numeric' })),
        monthISO: date.toISOString().slice(0, 7), // 2020-08###
        index: i,
        from: +date,
        to: i < array.length - 1 ? +array[i + 1] : Number.POSITIVE_INFINITY
      }))
      .reduce((months, m) => ({
        ...months,
        [m.monthId]: m
      }), {})
    commit('setMonths', months)
    commit('setMonthId', monthId)
  },

  // may be substituted directly with mutation
  setMonthId: ({ commit, dispatch }, monthId) => {
    commit('setMonthId', monthId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
