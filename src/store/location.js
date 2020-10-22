import WORLD from '../assets/map/world.json'

import { schemeCategory10 } from 'd3-scale-chromatic'

const regionMapping = {
  _WORLD: { color: schemeCategory10[7], name: 'World', mainLocationId: '_WORLD' },
  ASIA: { color: schemeCategory10[2], name: 'Asia', mainLocationId: 'CHN' },
  SOUTH_AMERICA: { color: schemeCategory10[3], name: 'South America', mainLocationId: 'BRA' },
  AFRICA: { color: schemeCategory10[4], name: 'Africa', mainLocationId: 'NGA' },
  EUROPE: { color: schemeCategory10[0], name: 'Europe', mainLocationId: 'ITA' },
  NORTH_AMERICA: { color: schemeCategory10[1], name: 'North America', mainLocationId: 'USA' },
  OCEANIA: { color: schemeCategory10[5], name: 'Oceania', mainLocationId: 'NZL' },
  SEVEN_SEAS_OPEN_OCEAN: { color: schemeCategory10[6], name: 'Seven Seas', mainLocationId: 'MUS' }
}

const fnRegionId = c => c
  ? c.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '_').toUpperCase()
  : ''

const locationList = WORLD.features
  .map(f => ({
    locationId: f.properties.ADM0_A3, // adm0_a3,
    locationName: f.properties.ADMIN, // admin,
    regionId: fnRegionId(f.properties.CONTINENT),
    flagId: f.properties.WB_A2,
    geometry: f.geometry
  }))
  .map(l => ({
    ...l,
    regionName: regionMapping[l.regionId].name,
    regionColor: regionMapping[l.regionId].color,
    mainLocationId: regionMapping[l.regionId].mainLocationId
  }))
  .sort((a, b) => a.locationName >= b.locationName ? 1 : -1)

locationList.push({
  locationId: '_WORLD',
  locationName: 'World',
  regionId: '_WORLD_CONTINENT',
  regionName: 'World',
  regionColor: '#444',
  flagId: '',
  geometry: null
})

const locations = locationList
  .reduce((locations, l) => ({
    ...locations,
    [l.locationId]: l
  }), {})

const regions = locationList
  .reduce((acc, { regionId, regionName, regionColor, mainLocationId, ...rest }) => ({
    ...acc,
    [regionId]: {
      regionId,
      regionName,
      regionColor,
      mainLocationId,
      locations: [
        ...(regionId in acc ? acc[regionId].locations : []),
        rest
      ]
    }
  }), {})

const state = {
  locations,
  regions,
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
  getRegions: ({ regions }) => Object.values(regions),

  getLocation: ({ locations, locationId }) => locations[locationId],
  getRegion: ({ regions }, getters) => regions[getters.getLocation.regionId],

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
