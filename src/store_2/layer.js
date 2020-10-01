import { scaleSequentialLog } from 'd3-scale'
import { interpolateBlues, interpolateReds, interpolatePurples } from 'd3-scale-chromatic'

const layerList = [{
  layerId: 'info_tweets',
  layerName: 'Collected tweets',
  layerColorScale: scaleSequentialLog().interpolator(interpolateBlues)
},
{
  layerId: 'epi_confirmed',
  layerName: 'Confirmed cases',
  layerColorScale: scaleSequentialLog().interpolator(interpolateReds)
},
{
  layerId: 'epi_dead',
  layerName: 'Deaths',
  layerColorScale: scaleSequentialLog().interpolator(interpolatePurples)
}]

const layers = layerList
  .reduce((layers, l) => ({
    ...layers,
    [l.layerId]: l
  }), {})

const state = {
  layerId: 'info_tweets',
  layers
}

const mutations = {
  setLayerId: (state, layerId) => { state.layerId = layerId }
}

const getters = {
  getLayers: ({ layers }) => Object.values(layers),
  getLayer: ({ layers, layerId }) => layers[layerId]
}

const actions = {
  setLayerId: ({ commit, dispatch }, layerId) => {
    commit('setLayerId', layerId)
    dispatch('tweets/loadTweets', {}, { root: true })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
