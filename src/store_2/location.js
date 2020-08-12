
/**
 * LOCATIONS INIT
 */

const state = {
  locations: null,
  locationId: null
}

const mutations = {
  setLocations: (state, locations) => { state.locations = locations },
  setLocationId: (state, locationId) => { state.locationId = locationId }
}

const getters = {
  getLocations: ({ locations }) => Object.values(locations),
  getLocation: ({ locations, locationId }) => locations[locationId]
}

const actions = {
  init: ({ commit }, { features, locationId }) => {
    const locationList = features
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

    console.log(locations)

    commit('setLocations', locations)
    commit('setLocationId', locationId)
  },

  setLocationId: ({ commit, dispatch }, locationId) => {
    commit('setLocationId', locationId)
    dispatch('timeseries/loadTimeseries', {}, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
