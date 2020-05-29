import { extent } from 'd3-array'

import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

// static file
import _locationInfos from '../assets/locationDicts.json'

const locationInfos = _locationInfos
  .reduce((acc, cur) => ({
    ...acc,
    [cur.id]: cur
  }), {})

const locationInfoId = _locationInfos[0].id

const state = {
  locationInfos,
  locationInfoId,

  locationDict: null,
  locationMappings: null,

  locationFocus: null
}

const getters = {
  getLocationInfos: ({ locationInfos }) => Object.values(locationInfos),
  getLocationInfo: ({ locationInfos, locationInfoId }) =>
    locationInfoId in locationInfos
      ? locationInfos[locationInfoId]
      : null, // error in this case

  getLocationDict: ({ locationDict }) => locationDict,

  getLocationMapping: (_, getters, __, rootGetters) => {
    const fnColorScale = d3Scale[getters.getLocationInfo.scaleColorType]()
      .interpolator(d3ScaleChromatic[getters.getLocationInfo.interpolator])

    const fnGetInBounds = value => getters.getLocationInfo.bounds
      ? value >= getters.getLocationInfo.bounds[0] && value <= getters.getLocationInfo.bounds[1]
        ? value : null
      : value
    const fnGetValue = list => list !== null ? fnGetInBounds(list[rootGetters.getDateIndex]) : null
    const fnGetColor = value => value !== null ? fnColorScale(value) : null

    const locationDict = getters.getLocationDict || {}
    const locationIds = Object.keys(locationDict)

    const domain = extent(Object.values(locationDict).map(fnGetValue))
    fnColorScale.domain(domain)
    return locationIds
      .map(locationId => [locationId, fnGetValue(locationDict[locationId])])
      .reduce((acc, [locationId, value]) => ({
        ...acc,
        [locationId]: {
          locationId,
          value,
          color: fnGetColor(value)
        }
      }), {})
  },

  getLocationFocus: ({ locationFocus }) => locationFocus
}

const mutations = {
  setLocationInfoId: (state, locationInfoId) => { state.locationInfoId = locationInfoId },
  setLocationDict: (state, { _WORLD, ...rest }) => { state.locationDict = rest },

  setLocationFocus: (state, locationFocus) => { state.locationFocus = locationFocus }
}

const actions = {
  setLocationInfoId: async ({ commit }, locationInfoId) => {
    const locationDict = await fetch(`/assets/map_dicts/${locationInfoId}.json`)
      .then(res => res.json())
    // updating the locationInfoId only aftert the fetch of the data
    commit('setLocationInfoId', locationInfoId)
    commit('setLocationDict', locationDict)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
