import Vue from 'vue'
import Vuex from 'vuex'

import { utcDay } from 'd3-time'
import { dsvFormat } from 'd3-dsv'

// static file
import world from '../assets/map/world.json'

Vue.use(Vuex)

const locations = {
  _WORLD: {
    locationId: '_WORLD',
    locationName: 'World',
    geometry: null
  },
  ...world.features
    .map(f => ({
      locationId: f.properties.ADM0_A3, // adm0_a3,
      locationName: f.properties.ADMIN, // admin,
      geometry: f.geometry
    }))
    .reduce((locations, l) => ({
      ...locations,
      [l.locationId]: l
    }), {})
}

const state = {
  ready: false,
  counter: 0,

  locations,
  locationId: '_WORLD',

  dates: [],
  dateIndex: 0,

  timeseries: null // the current timeseries
}

const getters = {
  isReady: ({ ready }) => ready,
  getCounter: ({ counter }) => counter,

  getLocations: ({ locations }) => Object.values(locations),
  getLocation: ({ locationId, locations }) =>
    locationId in locations
      ? locations[locationId]
      : null, // error in this case

  getDates: ({ dates }) => dates,
  getDateIndex: ({ dateIndex }) => dateIndex,

  getTimeseries: ({ timeseries }) => timeseries
}

const mutations = {
  setReady: (state, ready) => { state.ready = ready },
  incrementCounter: (state) => { state.counter = state.counter === 10 ? 0 : state.counter + 1 },

  setLocationId: (state, locationId) => { state.locationId = locationId },

  setDateIndex: (state, dateIndex) => { state.dateIndex = dateIndex },
  setDates: (state, dates) => { state.dates = dates },

  setTimeseries: (state, timeseries) => { state.timeseries = timeseries }
}

const fnDataParser = dsvFormat(';')

const actions = {
  init: ({ getters, commit }) => {
    fetch('/assets/infodemics_iso3/infodemics__WORLD.csv')
      .then(res => res.text())
      .then(data => Promise.resolve(fnDataParser.parse(data)))
      .then(ts => {
        commit('setTimeseries', ts)
        commit('setDates', ts.map(ts => utcDay(new Date(ts.date))))
        commit('setDateIndex', ts.length - 1)
        return Promise.resolve()
      })
      .then(() => commit('setReady', true))
  },
  setLocationId: ({ getters, commit }, locationId) => {
    commit('incrementCounter')
    const c = getters.getCounter
    commit('setLocationId', locationId)
    fetch(`/assets/infodemics_iso3/infodemics_${locationId || '_WORLD'}.csv`)
      .then(res => {
        if (res.headers.get('content-type').includes('text/csv')) { return res.text() }
        return Promise.reject(Error)
      })
      .then(data => Promise.resolve(fnDataParser.parse(data)))
      .then(ts => {
        // check equality
        getters.getCounter === c && commit('setTimeseries', ts)
      })
      .catch(e => {
        console.log(`No data for locationId: ${locationId}`)
        commit('setTimeseries', [])
      })
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
