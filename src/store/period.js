const state = {
  periods: null,
  periodId: null,

  fastDateIdRange: null,
  dateIdRange: null
}

const mutations = {
  setPeriods: (state, periods) => { state.periods = periods },
  setPeriodId: (state, periodId) => { state.periodId = periodId },

  setFastDateIdRange: (state, fastDateIdRange) => { state.fastDateIdRange = fastDateIdRange },
  setDateIdRange: (state, dateIdRange) => { state.dateIdRange = dateIdRange }
}

const getters = {
  getPeriods: ({ periods }) => Object.values(periods),
  getPeriod: ({ periods, periodId }) => periods[periodId],

  // getFastDateIdRange: ({ fastDateIdRange }) => fastDateIdRange,
  getDateIdRange: ({ dateIdRange }) => dateIdRange,

  getDateTweets: (_, getters, __, rootGetters) => {
    const period = getters.getPeriod
    const tmp = rootGetters['timeseries/getFullTimeseries']
      // +(new Date(Date.UTC(2019, 1))) === +(new Date('2019-02'))
      // value: +d.info_tweets
      .map(d => ({ dateId: +(new Date(+d.date)), value: +d.info_tweets }))
      .filter(({ dateId }) => dateId >= +period.from && dateId <= +period.to)

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
    const dateIdRange = [+period.from, +period.to]
    commit('setFastDateIdRange', dateIdRange)
    commit('setDateIdRange', dateIdRange)
  },

  // may be substituted directly with mutation
  setPeriodId: ({ commit, dispatch, getters }, periodId) => {
    commit('setPeriodId', periodId)

    const period = getters.getPeriod
    const dateIdRange = [+period.from, +period.to]
    dispatch('setDateIdRange', dateIdRange)
  },

  setDateIdRange: ({ commit, dispatch }, dateIdRange) => {
    commit('setFastDateIdRange', dateIdRange)
    commit('setDateIdRange', dateIdRange)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
