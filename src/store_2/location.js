import WORLD from '../assets/map/world.json'

const state = {
  locations: null,
  locationId: null,
  locationIdList: null
}

const mutations = {
  setLocations: (state, locations) => { state.locations = locations },

  setLocationId: (state, locationId) => { state.locationId = locationId },
  setLocationIdList: (state, locationIdList) => { state.locationIdList = locationIdList }
}

const getters = {
  getLocations: ({ locations }) => Object.values(locations),

  getLocation: ({ locations, locationId }) => locations[locationId],
  getLocationList: ({ locations, locationIdList }) => locationIdList.map(id => locations[id]),

  getContinents: (_, getters) => getters.getLocations
    .map(({ continentId, continentName }) => ({ continentId, continentName }))
    .filter(({ continentId }) => continentId)// not the world
    .filter((l, i, array) => array.findIndex(t => t.continentId === l.continentId) === i),

  getLocationInfo: ({ locations }) => locationId => locations[locationId]
}

const fnContinentId = c => c
  ? c.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '_').toLowerCase()
  : ''

const actions = {
  init: ({ commit }, { locationId, locationIdList }) => {
    const locationList = WORLD.features
      .map(f => ({
        locationId: f.properties.ADM0_A3, // adm0_a3,
        locationName: f.properties.ADMIN, // admin,
        continentId: fnContinentId(f.properties.CONTINENT),
        continentName: f.properties.CONTINENT,
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

    commit('setLocations', locations)
    commit('setLocationId', locationId)
    commit('setLocationIdList', locationIdList)
  },

  setLocationId: ({ commit, dispatch }, locationId) => {
    commit('setLocationId', locationId)
    dispatch('timeseries/loadTimeseries', {}, { root: true })
  },

  // may not be used
  setLocationIdList: ({ commit, dispatch }, locationIdList) => {
    commit('setLocationIdList', locationIdList)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
