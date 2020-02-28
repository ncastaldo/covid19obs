import Vue from 'vue'
import Vuex from 'vuex'

import world from '../assets/map/world.json'

Vue.use(Vuex)

const locations = world.features
  .map(f => ({
    locationId: f.properties.adm0_a3,
    locationName: f.properties.admin
  }))
  .reduce((locations, l) => ({
    ...locations,
    [l.locationId]: l
  }), {})

const state = {
  locations,
  locationId: null
}

const getters = {
  getLocation: ({ locationId, locations }) =>
    locationId in locations
      ? locations[locationId]
      : null
}

const mutations = {
  setLocationId: (state, locationId) => { state.locationId = locationId }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters
})
