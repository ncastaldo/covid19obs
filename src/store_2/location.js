import WORLD from '../assets/map/world.json'

import { schemeCategory10 } from 'd3-scale-chromatic'

const fnContinentId = c => c
  ? c.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '_').toUpperCase()
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

locationList.push({
  locationId: '_WORLD',
  locationName: 'World',
  continentId: '_WORLD_CONTINENT',
  continentName: 'World',
  geometry: null
})

const continentMapping = {
  _WORLD: schemeCategory10[7],
  ASIA: schemeCategory10[2],
  SOUTH_AMERICA: schemeCategory10[3],
  AFRICA: schemeCategory10[4],
  EUROPE: schemeCategory10[0],
  NORTH_AMERICA: schemeCategory10[1],
  OCEANIA: schemeCategory10[5],
  SEVEN_SEAS_OPEN_OCEAN: schemeCategory10[6]
}

const continents = locationList
  .filter(({ continentId }) => continentId)// not the world
  .reduce((acc, { continentId, continentName, ...rest }) => ({
    ...acc,
    [continentId]: {
      continentId,
      continentName,
      color: continentMapping[continentId],
      locations: [
        ...(continentId in acc ? acc[continentId].locations : []),
        rest
      ]
    }
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
  getContinent: ({ continents }, getters) => continents[getters.getLocation.continentId],

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
