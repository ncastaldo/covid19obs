const state = {
  ready: false,

  allLocations: null,
  allGeometries: null,
  locations: null,
  regions: null,
  locationId: null,
  locationIdList: null
}

const mutations = {
  setReady: (state, ready) => { state.ready = ready },

  setAllLocations: (state, allLocations) => { state.allLocations = allLocations },
  setAllGeometries: (state, allGeometries) => { state.allGeometries = allGeometries },
  setLocations: (state, locations) => { state.locations = locations },
  setRegions: (state, regions) => { state.regions = regions },

  setLocationId: (state, locationId) => { state.locationId = locationId },
  setLocationIdList: (state, locationIdList) => { state.locationIdList = locationIdList }
}

const getters = {
  isReady: ({ ready }) => ready,

  getLocations: ({ locations }) => Object.values(locations),
  getAllLocations: ({ allLocations }) => Object.values(allLocations),

  getRegions: ({ regions }) => Object.values(regions),

  getLocation: ({ locations, locationId }) => locations[locationId],
  getRegion: ({ regions }, getters) => regions[getters.getLocation.regionId],

  getLocationList: ({ locations, locationIdList }) => locationIdList.map(id => locations[id]),

  getLocationInfo: ({ locations }) => locationId => locations[locationId],
  getLocationGeometry: ({ allGeometries }) => locationId => allGeometries[locationId],

  getRegionLocations: ({ locations }) => regionId => regionId !== '_WORLD_REGION'
    ? Object.values(locations)
      .filter(l => l.regionId === regionId)
      .sort((a, b) => a.locationName > b.locationName ? 1 : -1)
    : []
}

const actions = {
  init: ({ commit }, {
    locationId, locationIdList,
    allLocations, allGeometries, locations, regions
  }) => {
    commit('setAllLocations', Object.freeze(allLocations))
    commit('setAllGeometries', Object.freeze(allGeometries))
    commit('setLocations', Object.freeze(locations))
    commit('setRegions', Object.freeze(regions))

    commit('setLocationId', locationId)
    commit('setLocationIdList', locationIdList)

    commit('setReady', true)
  },

  setLocationId: ({ commit, dispatch }, locationId) => {
    commit('setLocationId', locationId)
    dispatch('timeseries/loadTimeseries', {}, { root: true })
  },

  setRegionId: ({ dispatch, getters }, regionId) => {
    const region = getters.getRegions[regionId]
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
