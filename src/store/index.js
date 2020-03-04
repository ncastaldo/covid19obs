import Vue from 'vue'
import Vuex from 'vuex'

import { utcDay } from 'd3-time'
import { dsv } from 'd3-fetch'

// static file
import world from '../assets/map/world.json'

Vue.use(Vuex)

const locations = world.features
  .map(f => ({
    locationId: f.properties.adm0_a3,
    locationName: f.properties.admin,
    geometry: f.geometry,
    timeseries: []
  }))
  .reduce((locations, l) => ({
    ...locations,
    [l.locationId]: l
  }), {})

const state = {
  ready: false,

  locations,
  locationId: null,

  dates: [],
  dateIndex: null
}

const getters = {
  isReady: ({ ready }) => ready,

  getLocations: ({ locations }) => Object.values(locations),
  getLocation: ({ locationId, locations }) =>
    locationId in locations
      ? locations[locationId]
      : null,

  getDates: ({ dates }) => dates,
  getDateIndex: ({ dateIndex }) => dateIndex
}

const mutations = {
  setReady: (state, ready) => {
    console.log(state)
    state.ready = ready
  },
  setLocationId: (state, locationId) => { state.locationId = locationId },

  setDateIndex: (state, dateIndex) => { state.dateIndex = dateIndex },
  setDates: (state, dates) => { state.dates = dates },

  setLocationTimeseries: (state, { locationId, timeseries }) => {
    state.locations[locationId] = { ...state.locations[locationId], timeseries }
  }
}

const actions = {
  init: ({ getters, commit }) => {
    const promises = getters.getLocations.map((location) =>
      dsv(';', `/assets/infodemics/infodemics_${location.locationId}.csv`)
        .then(data => {
          commit('setLocationTimeseries', { locationId: location.locationId, timeseries: data })
          if (!getters.getDates.length) {
            commit('setDates', data.map(d => utcDay(new Date(d.date))))
          }
        })
        .catch(() => {
          location.timeseries = []
        })
        .finally(() => {
          Promise.resolve()
        }))
    Promise.all(promises).then(() => commit('setReady', true))
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  actions,
  plugins: [
    store => {
      store.dispatch('init')
    }
  ]
})
