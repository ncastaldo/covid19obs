const state = {
  periods: null,
  periodId: null,

  dateIdRange: null
}

const mutations = {
  setPeriods: (state, periods) => { state.periods = periods },
  setPeriodId: (state, periodId) => { state.periodId = periodId },

  setDateIdRange: (state, dateIdRange) => { state.dateIdRange = dateIdRange }
}

const getters = {
  getPeriods: ({ periods }) => Object.values(periods),
  getPeriod: ({ periods, periodId }) => periods[periodId],

  getDateIdRange: ({ dateIdRange }) => dateIdRange,

  getDateTweets: ({ dateIdRange }, _, __, rootGetters) => {
    const tmp = rootGetters['timeseries/getFullTimeseries']
      // +(new Date(Date.UTC(2019, 1))) === +(new Date('2019-02'))
      // value: +d.info_tweets
      .map(d => ({ dateId: +(new Date(+d.date)), value: +d.info_tweets }))
      .filter(({ dateId }) => dateId >= dateIdRange[0] && dateId <= dateIdRange[1])

    return Object.values(tmp)
  }
}

const actions = {
  init: ({ commit }, { periodId, periodList }) => {
    const periods = periodList
      .map((period, i, array) => ({
        periodId: period.periodId,
        periodName: period.periodName,
        index: i,
        from: period.from,
        to: period.to
      }))
      .reduce((periods, p) => ({
        ...periods,
        [p.periodId]: p
      }), {})

    commit('setPeriods', periods)
    commit('setPeriodId', periodId)

    const period = periods[periodId]
    commit('setDateIdRange', [+period.from, +period.to])
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
