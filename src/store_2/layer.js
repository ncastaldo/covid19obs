import { scaleSequentialSymlog } from 'd3-scale'
import { interpolateBlues, interpolateReds, interpolatePurples } from 'd3-scale-chromatic'

import { dsvFormat } from 'd3-dsv'
import { mean, extent } from 'd3-array'

const fnCompareParser = dsvFormat(',')

const layerList = [{
  layerId: 'info_tweets',
  layerName: 'Collected tweets',
  layerColorScale: scaleSequentialSymlog(interpolateBlues)
},
{
  layerId: 'epi_confirmed',
  layerName: 'Confirmed cases',
  layerColorScale: scaleSequentialSymlog(interpolateReds)
},
{
  layerId: 'epi_dead',
  layerName: 'Deaths',
  layerColorScale: scaleSequentialSymlog(interpolatePurples)
}]

const layers = layerList
  .reduce((layers, { layerId, layerName, ...rest }) => ({
    ...layers,
    [layerId]: { layerId, layerName }
  }), {})

const layerColorScales = layerList
  .reduce((layers, { layerId, layerColorScale }) => ({
    ...layers,
    [layerId]: layerColorScale
  }), {})

const state = {
  layerId: 'info_tweets',
  layers,

  layerFullDict: {},
  layerColorScale: null // to update accordingly
}

const mutations = {
  setLayerId: (state, layerId) => { state.layerId = layerId },

  setLayerFullDict: (state, layerFullDict) => { state.layerFullDict = layerFullDict },
  setLayerColorScale: (state, layerColorScale) => { state.layerColorScale = layerColorScale }
}

const getters = {
  getLayers: ({ layers }) => Object.values(layers),
  getLayer: ({ layers, layerId }) => layers[layerId],

  getLayerDict: ({ layerFullDict, layerColorScale }, getters, __, rootGetters) => {
    const [fromISO, toISO] = rootGetters['period/getPeriodRange'].map(p => p.periodISO)

    const localLayers = Object.values(layerFullDict)
      .map(({ iso, variable, ...rest }) => ({
        iso,
        value: mean(Object.entries(rest)
          .filter(([p]) => p >= fromISO && p <= toISO)
          .map(([_, v]) => +v))
      }))

    layerColorScale.domain(extent(localLayers, d => d.value))

    console.log(layerColorScale(localLayers[0].value))
    console.log(localLayers.map(l => l.value))

    return localLayers
      .reduce((acc, { iso, value }) => ({
        ...acc,
        [iso]: {
          iso,
          value,
          color: layerColorScale(value)
        }
      }), {})
  },

  getLayerDomain: (_, getters) => {
    return extent(Object.values(getters.getLayerDict), d => d.value)
  },

  getLayerPeriods: ({ layerFullDict }, _, __, rootGetters) => {
    const periods = rootGetters['period/getPeriods']
    const locationId = rootGetters['location/getLocation'].locationId
    return periods
      .map(({ periodId, periodISO }) => ({
        periodId,
        value: layerFullDict && locationId in layerFullDict
          ? +layerFullDict[locationId][periodISO]
          : 1
      }))
  }
}

// TODO dedicate new url and files
// in order to select month

const actions = {
  init: ({ dispatch }) => {
    dispatch('loadTweets')
  },

  setLayerId: ({ commit, dispatch }, layerId) => {
    commit('setLayerId', layerId)
    dispatch('loadTweets')
  },

  loadTweets: ({ getters, commit }) => {
    // console.log(rootGetters)
    const layerId = getters.getLayer.layerId

    const layerUrl = `/assets/compare/${layerId}.csv`
    const layerColorScale = layerColorScales[layerId]

    console.log(layerUrl)

    // fetching the compare
    fetch(layerUrl)
      .then(res => res.text())
      .then(data => fnCompareParser.parse(data))
      .then(layerInfo => layerInfo.reduce((acc, { iso, ...rest }) => ({
        ...acc,
        [iso]: { iso, ...rest }
      }), {}))
      .then(layerFullDict => {
        commit('setLayerFullDict', layerFullDict)
        commit('setLayerColorScale', layerColorScale)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
