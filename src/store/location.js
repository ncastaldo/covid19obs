import { locations, geometries, regions } from '../plugins/location'

const state = {
  locationId: null,
  locationIdList: null
}

const mutations = {
  setLocationId: (state, locationId) => { state.locationId = locationId },
  setLocationIdList: (state, locationIdList) => { state.locationIdList = locationIdList }
}

const getters = {
  getLocations: () => Object.values(locations),
  getRegions: () => Object.values(regions),

  getLocation: ({ locationId }) => locations[locationId],
  getRegion: (_, getters) => regions[getters.getLocation.regionId],

  getLocationList: ({ locationIdList }) => locationIdList.map(id => locations[id]),

  getLocationInfo: () => locationId => locations[locationId],
  getLocationGeometry: () => locationId => geometries[locationId],

  getRegionLocations: () => regionId => regionId !== '_WORLD_REGION'
    ? Object.values(locations)
      .filter(l => l.regionId === regionId)
      .sort((a, b) => a.locationName > b.locationName ? 1 : -1)
    : []
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

  setRegionId: ({ dispatch }, regionId) => {
    const region = regions[regionId]
    const locationId = region.mainLocationId
    console.log(locationId)
    dispatch('setLocationId', locationId)
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
