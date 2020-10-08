
import { variableList, variables, getFnDefined, getColorScale, compareTextParser } from '../plugins/util'

import { extent } from 'd3-array'

const layers = variableList
  .filter(v => v.layer)
  .map(v => ({
    layerId: v.id,
    layerName: v.name
  }))
  .reduce((layers, l) => ({
    ...layers,
    [l.layerId]: l
  }), {})

const state = {
  layerId: 'info_tweets',
  layers,

  layerVariableInfo: null,
  layerFullDict: null
}

const mutations = {
  setLayerId: (state, layerId) => { state.layerId = layerId },

  setLayerVariableInfo: (state, layerVariableInfo) => { state.layerVariableInfo = layerVariableInfo },
  setLayerFullDict: (state, layerFullDict) => { state.layerFullDict = layerFullDict }
}

const getters = {
  getLayers: ({ layers }) => Object.values(layers),
  getLayer: ({ layers, layerId }) => layers[layerId],

  getLayerVariableInfo: ({ layerVariableInfo }) => layerVariableInfo,

  getLayerDict: ({ layerFullDict, layerVariableInfo }, _, __, rootGetters) => {
    if (!layerFullDict) return null

    const fnDefined = getFnDefined(layerVariableInfo)

    const periodISO = rootGetters['period/getPeriod'].periodISO

    const localLayers = Object.values(layerFullDict)
      .map(({ iso, variable, ...rest }) => ({
        iso,
        value: rest[periodISO] // it should exist
      }))
      .map(d => ({
        ...d,
        // modify value to be defined
        value: fnDefined(d.value) ? d.value : null
      }))

    const colorScale = getColorScale(layerVariableInfo, extent(localLayers, d => d.value))

    return localLayers
      .reduce((acc, { iso, value }) => ({
        ...acc,
        [iso]: {
          iso,
          value,
          color: value !== null
            ? colorScale(value)
            : '#aeaeae'
        }
      }), {})
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

    // fetching the compare
    fetch(layerUrl)
      .then(res => res.text())
      .then(data => compareTextParser(data))
      .then(layerFull => layerFull.reduce((acc, { iso, ...rest }) => ({
        ...acc,
        [iso]: { iso, ...rest }
      }), {}))
      .then(layerFullDict => {
        commit('setLayerFullDict', layerFullDict)
        commit('setLayerVariableInfo', variables[layerId])
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
