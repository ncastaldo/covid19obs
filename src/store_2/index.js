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
    id: '2020Q1',
    name: '2020 - 1st Quarter',
    from: new Date('2020-01-01'),
    to: '20200331'
  },
  {
    id: '2020Q2',
    name: '2020 - 2nd Quarter'
  },
  {
    id: '2020Q3',
    name: '2020 - 3rd Quarter'
  }
]

const periods = periodList
  .reduce((periods, p) => ({
    ...periods,
    [p.id]: p
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

  setLocationId: (state, locationId) => { state.locationId = locationId }
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
    }))
}

const actions = {
  setLocationId: ({ commit, dispatch }, locationId) => {
    commit('setLocationId', locationId)
    dispatch('timeseries/loadTimeseries')
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
