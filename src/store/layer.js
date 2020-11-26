
import { variableList, variables, getColorScale, lastUpdatesTextParser, fnDateFormat } from '../plugins/util'

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
  layerId: null,
  layers,

  layerDateString: null,

  layerVariableInfo: {},
  layerFullData: []
}

const mutations = {
  setLayerId: (state, layerId) => { state.layerId = layerId },

  setLayerVariableInfo: (state, layerVariableInfo) => { state.layerVariableInfo = layerVariableInfo },
  setLayerFullData: (state, layerFullData) => { state.layerFullData = layerFullData }
}

const getters = {
  getLayers: ({ layers }) => Object.values(layers),
  getLayer: ({ layers, layerId }) => layers[layerId],

  getLayerDateString: ({ layerFullData }) => layerFullData
    ? fnDateFormat(new Date(layerFullData[0].dateString)) : 'Invalid',

  getLayerVariableInfo: ({ layerVariableInfo }) => layerVariableInfo,

  getLayerData: ({ layerFullData, layerVariableInfo }, _, __, rootGetters) => {
    if (!layerFullData || !layerVariableInfo) return []

    // const monthISO = rootGetters['month/getMonth'].monthISO

    return layerFullData
      .map(({ iso, variable, value }) => ({
        iso,
        value: +value// rest[monthISO] // it should exist
      }))
      .map(d => ({
        ...d,
        // modify value to be defined
        value: layerVariableInfo.fnDefined(d.value) ? d.value : null
      }))
  },

  // used in legend too
  getLayerDomain: ({ layerVariableInfo }, getters) => {
    if (!layerVariableInfo || !getters.getLayerData.length) return [1, 10]

    if (layerVariableInfo.fixedDomain) return layerVariableInfo.fixedDomain
    return extent(getters.getLayerData, d => d.value)
  },

  getLayerDict: ({ layerVariableInfo }, getters) => {
    if (!layerVariableInfo || !getters.getLayerData.length) return {}

    const colorScale = getColorScale(layerVariableInfo, getters.getLayerDomain)

    return getters.getLayerData
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
  init: ({ commit, dispatch }, layerId) => {
    // just to have something in that variable
    commit('setLayerVariableInfo', variables[layerId])

    // dispatching here!
    dispatch('setLayerId', layerId)
  },

  setLayerId: ({ commit, dispatch }, layerId) => {
    commit('setLayerId', layerId)
    dispatch('loadTweets')
  },

  loadTweets: ({ getters, commit }) => {
    // console.log(rootGetters)
    const layerId = getters.getLayer.layerId
    const layerUrl = `/assets/layers/${layerId}.csv`
    // const layerUrl = `/assets/compare/${layerId}.csv`

    // fetching the compare
    fetch(layerUrl)
      .then(res => res.text())
      .then(data => lastUpdatesTextParser(data))
      .then(layerFullData => {
        commit('setLayerFullData', layerFullData)
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
