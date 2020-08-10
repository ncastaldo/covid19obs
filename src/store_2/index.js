import Vue from 'vue'
import Vuex from 'vuex'

import timeseries from './timeseries'
import view from './view'
import mapLayer from './mapLayer'

import worldMap from '../assets/map/world.json'

import { timeMonth } from 'd3-time'

Vue.use(Vuex)

const MONTHS = [new Date(2020, 1 - 1, 1), new Date(2020, 8 - 1, 1)]

const INITIAL_STATE = {
  locationId: '_WORLD',
  periodIdRange: [+new Date(2020, 1 - 1, 1), +new Date(2020, 1 - 1, 1)]
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

const periodList = timeMonth.range(...MONTHS)
  .map(date => ({
    periodId: +date,
    periodName: date.toLocaleString('en', { month: 'long' }).toUpperCase()
  }))

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
  periodIdRange: INITIAL_STATE.periodIdRange
}

const mutations = {
  setReady: (state, ready) => { state.ready = ready },

  setLocationId: (state, locationId) => { state.locationId = locationId },
  setPeriodIdRange: (state, periodIdRange) => { state.periodIdRange = periodIdRange }
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
  getPeriodRange: ({ periods, periodIdRange }) => periodIdRange.map(id => periods[id])
}

const actions = {
  setLocationId: ({ commit, dispatch }, locationId) => {
    commit('setLocationId', locationId)
    dispatch('timeseries/loadTimeseries')
  },
  setPeriodIdRange: ({ commit, dispatch }, periodIdRange) => {
    commit('setPeriodIdRange', periodIdRange)
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
