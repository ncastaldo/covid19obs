import Vue from 'vue'
import Vuex from 'vuex'

import location from './location'
import period from './period'

import month from './month'

import timeseries from './timeseries'

import layer from './layer'

import makeCompare from './compare'

import view from './view'

import { utcMonth } from 'd3-time'

Vue.use(Vuex)

const MONTHS = utcMonth.range(
  new Date(Date.UTC(2020, 0, 1)), // first month of year -> Jan
  new Date(Date.UTC(2020, 11, 1)) // exclusive, CHANGE IT TO LAST MONTH - 1
)

const PERIODS = [
  {
    periodId: '2020Q1',
    periodName: '2020 - Q1',
    from: new Date(Date.UTC(2020, 0, 1)), // jan
    to: new Date(Date.UTC(2020, 2, 31)) // mar
  },
  {
    periodId: '2020Q2',
    periodName: '2020 - Q2',
    from: new Date(Date.UTC(2020, 3, 1)), // apr
    to: new Date(Date.UTC(2020, 5, 30)) // jun
  },
  {
    periodId: '2020Q3',
    periodName: '2020 - Q3',
    from: new Date(Date.UTC(2020, 6, 1)), // jul
    to: new Date(Date.UTC(2020, 8, 30)) // sept
  },
  {
    periodId: '2020Q4',
    periodName: '2020 - Q4',
    from: new Date(Date.UTC(2020, 9, 1)), // oct
    to: new Date(Date.UTC(2020, 11, 31)) // dec
  }
]

const INITIAL_STATE = {
  locationId: '_WORLD', // will be added

  locationIdList: ['USA', 'CHN', 'ITA', 'ESP', 'DEU', 'FRA', 'IDN'],

  periodId: PERIODS[PERIODS.length - 1].periodId,
  periodList: PERIODS,

  monthId: +MONTHS[MONTHS.length - 1],
  monthList: MONTHS,

  firstCompareId: 'epi_cases_perM',
  secondCompareId: 'epi_deaths_perM',

  layerId: 'info_tweets'
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

    month,

    timeseries,
    layer,

    'compare/first': makeCompare(),
    'compare/second': makeCompare(),

    view
  },
  plugins: [
    store => {
      store.dispatch('location/init', INITIAL_STATE)
      store.dispatch('period/init', INITIAL_STATE)
      store.dispatch('month/init', INITIAL_STATE)
      store.dispatch('layer/init', INITIAL_STATE.layerId)
      store.dispatch('timeseries/init')
      store.dispatch('compare/first/init', INITIAL_STATE.firstCompareId)
      store.dispatch('compare/second/init', INITIAL_STATE.secondCompareId)
    }
  ]
})
