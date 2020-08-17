import Vue from 'vue'
import Vuex from 'vuex'

import location from './location'
import periodRange from './periodRange'

import timeseries from './timeseries'
import mapLayer from './mapLayer'

import makeCompare from './compare'

import period from './period'

import view from './view'

import { utcMonth } from 'd3-time'

Vue.use(Vuex)

const MONTHS = utcMonth.range(
  new Date(2020, 0, 1), // first day of year -> Jan
  new Date()
)

const INITIAL_STATE = {
  locationId: '_WORLD', // will be added

  locationIdList: ['USA', 'CHN', 'ITA', 'ESP', 'DEU', 'FRA', 'IDN'],

  periodList: MONTHS,
  periodIdRange: [
    +MONTHS[MONTHS.length - 2],
    +MONTHS[MONTHS.length - 1]
  ],

  periodId: MONTHS[MONTHS.length - 1],

  firstCompareVarId: 'info_tweets',
  secondCompareVarId: 'info_risk_index'
}

const state = {
  ready: false
}

const mutations = {
  setReady: (state, ready) => { state.ready = ready }
}

const getters = {
  isReady: ({ ready }) => ready
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  modules: {
    location,
    periodRange,

    timeseries,
    mapLayer,

    'compare/first': makeCompare(),
    'compare/second': makeCompare(),

    period,

    view
  },
  plugins: [
    store => {
      store.dispatch('location/init', INITIAL_STATE)
      store.dispatch('periodRange/init', INITIAL_STATE)
      store.dispatch('timeseries/init')
      store.dispatch('compare/first/init', INITIAL_STATE.firstCompareVarId)
      store.dispatch('compare/second/init', INITIAL_STATE.secondCompareVarId)
      store.dispatch('period/init', INITIAL_STATE)
      store.commit('setReady', true)
    }
  ]
})
