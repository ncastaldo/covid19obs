import WORLD from '../assets/map/world.json'

import { schemeCategory10 } from 'd3-scale-chromatic'

const continentMapping = {
  _WORLD: { color: schemeCategory10[7], name: 'World' },
  ASIA: { color: schemeCategory10[2], name: 'Asia' },
  SOUTH_AMERICA: { color: schemeCategory10[3], name: 'South America' },
  AFRICA: { color: schemeCategory10[4], name: 'Africa' },
  EUROPE: { color: schemeCategory10[0], name: 'Europe' },
  NORTH_AMERICA: { color: schemeCategory10[1], name: 'North America' },
  OCEANIA: { color: schemeCategory10[5], name: 'Oceania' },
  SEVEN_SEAS_OPEN_OCEAN: { color: schemeCategory10[6], name: 'Seven Seas' }
}

const fnContinentId = c => c
  ? c.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '_').toUpperCase()
  : ''

const locationList = WORLD.features
  .map(f => ({
    locationId: f.properties.ADM0_A3, // adm0_a3,
    locationName: f.properties.ADMIN, // admin,
    continentId: fnContinentId(f.properties.CONTINENT),
    flagId: f.properties.WB_A2,
    geometry: f.geometry
  }))
  .map(l => ({
    ...l,
    continentName: continentMapping[l.continentId].name,
    continentColor: continentMapping[l.continentId].color
  }))
  .sort((a, b) => a.locationName >= b.locationName ? 1 : -1)

locationList.push({
  locationId: '_WORLD',
  locationName: 'World',
  continentId: '_WORLD_CONTINENT',
  continentName: 'World',
  continentColor: '#444',
  flagId: '',
  geometry: null
})

const locations = locationList
  .reduce((locations, l) => ({
    ...locations,
    [l.locationId]: l
  }), {})

const continents = locationList
  .reduce((acc, { continentId, continentName, continentColor, ...rest }) => ({
    ...acc,
    [continentId]: {
      continentId,
      continentName,
      continentColor,
      locations: [
        ...(continentId in acc ? acc[continentId].locations : []),
        rest
      ]
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
