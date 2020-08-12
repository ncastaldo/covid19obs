import Vue from 'vue'
import Vuex from 'vuex'

import location from './location'
import periodRange from './periodRange'
import timeseries from './timeseries'

import view from './view'
import mapLayer from './mapLayer'

import WORLD from '../assets/map/world.json'

import { timeMonth } from 'd3-time'

Vue.use(Vuex)

const MONTHS = timeMonth.range(
  new Date(2020, 0, 1), // first day of year -> Jan
  new Date() // now
)

const INITIAL_STATE = {
  features: WORLD.features,
  locationId: '_WORLD', // will be added
  periodList: MONTHS,
  periodIdRange: [
    +MONTHS[MONTHS.length - 2],
    +MONTHS[MONTHS.length - 1]
  ]
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
    view,
    mapLayer
  },
  plugins: [
    store => {
      store.dispatch('location/init', INITIAL_STATE)
      store.dispatch('periodRange/init', INITIAL_STATE)
      store.dispatch('timeseries/init')
      store.commit('setReady', true)
    }
  ]
})
