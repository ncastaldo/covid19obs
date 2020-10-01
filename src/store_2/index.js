import Vue from 'vue'
import Vuex from 'vuex'

import location from './location'
import period from './period'

import timeseries from './timeseries'
import tweets from './tweets'

import layer from './layer'

import makeCompare from './compare'

import view from './view'

import { utcMonth } from 'd3-time'

Vue.use(Vuex)

const MONTHS = utcMonth.range(
  new Date(Date.UTC(2020, 0, 1)), // first day of year -> Jan
  new Date(Date.UTC(2020, 9, 1)) // exclusive, CHANGE IT TO LAST MONTH - 1
)

const INITIAL_STATE = {
  locationId: '_WORLD', // will be added

  locationIdList: ['USA', 'CHN', 'ITA', 'ESP', 'DEU', 'FRA', 'IDN'],

  periodList: MONTHS,
  periodIdRange: [
    +MONTHS[MONTHS.length - 2],
    +MONTHS[MONTHS.length - 1]
  ],

  periodId: +MONTHS[MONTHS.length - 1],

  firstCompareVarId: 'info_tweets',
  secondCompareVarId: 'info_risk_index'
}

const state = {}

const mutations = {
  setReady: (state, ready) => { state.ready = ready }
}

const getters = {
  isReady: ({ ready }, getters) => getters['tweets/getTweetsDict'] !== null
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  modules: {
    location,
    period,

    timeseries,
    tweets,
    layer,

    'compare/first': makeCompare(),
    'compare/second': makeCompare(),

    view
  },
  plugins: [
    store => {
      store.dispatch('location/init', INITIAL_STATE)
      store.dispatch('period/init', INITIAL_STATE)
      store.dispatch('tweets/init')
      store.dispatch('timeseries/init')
      store.dispatch('compare/first/init', INITIAL_STATE.firstCompareVarId)
      store.dispatch('compare/second/init', INITIAL_STATE.secondCompareVarId)
    }
  ]
})
