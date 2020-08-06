import { scaleSequentialLog } from 'd3-scale'
import { interpolateBlues, interpolateReds, interpolatePurples } from 'd3-scale-chromatic'

const mapLayerList = [{
  mapLayerId: 'info_tweets',
  mapLayerName: 'Collected tweets',
  mapLayerColorScale: scaleSequentialLog().interpolator(interpolateBlues)
},
{
  mapLayerId: 'epi_confirmed',
  mapLayerName: 'Confirmed cases',
  mapLayerColorScale: scaleSequentialLog().interpolator(interpolateReds)
},
{
  mapLayerId: 'epi_dead',
  mapLayerName: 'Deaths',
  mapLayerColorScale: scaleSequentialLog().interpolator(interpolatePurples)
}]

const mapLayers = mapLayerList
  .reduce((mapLayers, ml) => ({
    ...mapLayers,
    [ml.mapLayerId]: ml
  }), {})

const state = {
  mapLayerId: 'epi_confirmed',
  mapLayers
}

const mutations = {
  setMapLayerId: (state, mapLayerId) => { state.mapLayerId = mapLayerId }
}

const getters = {
  getMapLayers: ({ mapLayers }) => Object.values(mapLayers),
  getMapLayer: ({ mapLayers, mapLayerId }) => mapLayers[mapLayerId]
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
