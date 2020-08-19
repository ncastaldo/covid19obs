import WORLD from '../assets/map/world.json'

import { schemeCategory10 } from 'd3-scale-chromatic'

const fnContinentId = c => c
  ? c.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '_').toLowerCase()
  : ''

const locationList = WORLD.features
  .map(f => ({
    locationId: f.properties.ADM0_A3, // adm0_a3,
    locationName: f.properties.ADMIN, // admin,
    continentId: fnContinentId(f.properties.CONTINENT),
    continentName: f.properties.CONTINENT,
    flagId: f.properties.WB_A2,
    geometry: f.geometry
  }))

const continentMapping = {
  asia: schemeCategory10[2],
  south_america: schemeCategory10[3],
  africa: schemeCategory10[4],
  europe: schemeCategory10[0],
  north_america: schemeCategory10[1],
  oceania: schemeCategory10[5],
  seven_seas_open_ocean: schemeCategory10[6]
}

const continentList = locationList.map(({ continentId, continentName }) => ({ continentId, continentName }))
  .filter(({ continentId }) => continentId)// not the world
  .filter((l, i, array) => array.findIndex(t => t.continentId === l.continentId) === i)
  .map((c, i) => ({ ...c, color: continentMapping[c.continentId] }))

console.log(continentList.map(c => c.continentId))

locationList.push({
  locationId: '_WORLD',
  locationName: 'World',
  geometry: null
})

const continents = continentList
  .reduce((continents, c) => ({
    ...continents,
    [c.continentId]: c
  }), {})

const locations = locationList
  .reduce((locations, l) => ({
    ...locations,
    [l.locationId]: {
      ...l,
      continentColor: l.continentId in continents
        ? continents[l.continentId].color : '#444'
    }
  }), {})

const state = {
  locations,
  continents,
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
  getContinents: ({ continents }) => Object.values(continents),

  getLocation: ({ locations, locationId }) => locations[locationId],
  getLocationList: ({ locations, locationIdList }) => locationIdList.map(id => locations[id]),

  getLocationInfo: ({ locations }) => locationId => locations[locationId]
}

const actions = {
  init: ({ commit }, { locationId, locationIdList }) => {
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
