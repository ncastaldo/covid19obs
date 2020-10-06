import { scaleSequentialLog } from 'd3-scale'
import { interpolateBlues, interpolateReds, interpolatePurples } from 'd3-scale-chromatic'

import { dsvFormat } from 'd3-dsv'
import { mean, max } from 'd3-array'

const fnCompareParser = dsvFormat(',')

const layerList = [{
  layerId: 'info_tweets',
  layerName: 'Collected tweets',
  layerColor: 'rgb(31, 121, 179)',
  layerColorScale: scaleSequentialLog(interpolateBlues)
},
{
  layerId: 'epi_confirmed',
  layerName: 'Confirmed cases',
  layerColor: interpolateReds(0.8),
  layerColorScale: scaleSequentialLog(interpolateReds)
},
{
  layerId: 'epi_dead',
  layerName: 'Deaths',
  layerColor: interpolatePurples(0.8),
  layerColorScale: scaleSequentialLog(interpolatePurples)
}]

const layers = layerList
  .reduce((layers, { layerId, layerName, layerColor }) => ({
    ...layers,
    [layerId]: { layerId, layerName, layerColor }
  }), {})

const layerColorScales = layerList
  .reduce((layers, { layerId, layerColorScale }) => ({
    ...layers,
    [layerId]: layerColorScale
  }), {})

const state = {
  layerId: 'info_tweets',
  layers,

  layerFullDict: null,
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
    if (!layerFullDict) return null

    const [fromISO, toISO] = rootGetters['period/getPeriodRange'].map(p => p.periodISO)

    const localLayers = Object.values(layerFullDict)
      .map(({ iso, variable, ...rest }) => ({
        iso,
        value: mean(Object.entries(rest)
          .filter(([p]) => p >= fromISO && p <= toISO)
          .map(([_, v]) => +v))
      }))

    layerColorScale.domain([1, max(localLayers, d => d.value)])

    return localLayers
      .reduce((acc, { iso, value }) => ({
        ...acc,
        [iso]: {
          iso,
          value,
          color: value > 0
            ? layerColorScale(value)
            : '#aeaeae'
        }
      }), {})
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

    // fetching the compare
    fetch(layerUrl)
      .then(res => res.text())
      .then(data => fnCompareParser.parse(data))
      .then(layerInfo => layerInfo.reduce((acc, { iso, ...rest }) => ({
        ...acc,
        [iso]: { iso, ...rest }
      }), {}))
      .then(layerFullDict => {
        commit('setLayerColorScale', layerColorScale)
        commit('setLayerFullDict', layerFullDict)
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
