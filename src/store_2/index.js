import Vue from 'vue'
import Vuex from 'vuex'

import timeseries from './timeseries'
import view from './view'
import mapLayer from './mapLayer'

import worldMap from '../assets/map/world.json'

Vue.use(Vuex)

const INITIAL_STATE = {
  locationId: '_WORLD',
  periodId: '2020Q3'
}

/**
 * LOCATIONS INIT
 */

// adding the world location
const locationList = worldMap.features
  .map(f => ({
    locationId: f.properties.ADM0_A3, // adm0_a3,
    locationName: f.properties.ADMIN, // admin,
    flagId: f.properties.WB_A2,
    geometry: f.geometry
  }))

locationList.push({
  locationId: '_WORLD',
  locationName: 'World',
  geometry: null
})

const locations = locationList
  .reduce((locations, l) => ({
    ...locations,
    [l.locationId]: l
  }), {})

/**
 * PERIODS INIT
*/

const periodList = [
  {
    periodId: '2020Q1',
    periodName: '2020 - Q1'
  },
  {
    periodId: '2020Q2',
    periodName: '2020 - Q2'
  },
  {
    periodId: '2020Q3',
    periodName: '2020 - Q3'
  }
]

const periods = periodList
  .reduce((periods, p) => ({
    ...periods,
    [p.periodId]: p
  }), {})

/**
 * STATE
 */

const state = {
  ready: false,

  locations,
  locationId: INITIAL_STATE.locationId,

  periods,
  periodId: INITIAL_STATE.periodId
}

const mutations = {
  setReady: (state, ready) => { state.ready = ready },

  setLocationId: (state, locationId) => { state.locationId = locationId },
  setPeriodId: (state, periodId) => { state.periodId = periodId }
}

const getters = {
  isReady: ({ ready }) => ready,

  getLocation: ({ locations, locationId }) => locations[locationId],

  getFeatures: ({ locations }) => Object.values(locations)
    .filter(l => l.locationId !== '_WORLD')
    .map(({ geometry, ...properties }) => ({
      type: 'Feature',
      geometry,
      properties
    })),

  getPeriods: ({ periods }) => Object.values(periods),
  getPeriod: ({ periods, periodId }) => periods[periodId]
}

const actions = {
  setLocationId: ({ commit, dispatch }, locationId) => {
    commit('setLocationId', locationId)
    dispatch('timeseries/loadTimeseries')
  },
  setPeriodId: ({ commit, dispatch }, periodId) => {
    commit('setPeriodId', periodId)
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  actions,
  modules: {
    view,
    timeseries,
    mapLayer
  },
  plugins: [
    store => {
      store.dispatch('timeseries/init')
      store.commit('setReady', true)
    }
  ]
})
