import Vue from 'vue'
import Vuex from 'vuex'

import { utcDay } from 'd3-time'
import { dsvFormat } from 'd3-dsv'

// static file
import world from '../assets/map/world.json'

Vue.use(Vuex)

const locations = world.features
  .map(f => ({
    locationId: f.properties.ADM0_A3, // adm0_a3,
    locationName: f.properties.ADMIN, // admin,
    geometry: f.geometry,
    timeseries: null
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
  dateIndex: 0
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

const fnDataParser = dsvFormat(';')

const actions = {
  init: ({ getters, commit }) => {
    const promises = getters.getLocations.map(async (location) => {
      try {
        const res = await fetch(`/assets/infodemics/infodemics_${location.locationId}.csv`)
        if (res.headers.get('content-type').includes('text/csv')) {
          const timeseries = fnDataParser.parse(await res.text())
          commit('setLocationTimeseries', { locationId: location.locationId, timeseries })
          if (!getters.getDates.length) {
            commit('setDates', timeseries.map(ts => utcDay(new Date(ts.date))))
          }
        } else {
          console.log(`No infodemic data for ${location.locationId}`)
        }
      } catch (_) {
        console.log('Problems resolving infodemic data from the public folder...')
      }
      return Promise.resolve()
    })
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
