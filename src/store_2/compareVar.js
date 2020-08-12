import { scaleSequentialLog } from 'd3-scale'
import { interpolateReds, interpolatePurples } from 'd3-scale-chromatic'

const compareVarList = [
  {
    compareVarId: 'epi_confirmed',
    compareVarName: 'Confirmed cases',
    compareVarColorScale: scaleSequentialLog().interpolator(interpolateReds)
  },
  {
    compareVarId: 'epi_dead',
    compareVarName: 'Deaths',
    compareVarColorScale: scaleSequentialLog().interpolator(interpolatePurples)
  }]

const compareVars = compareVarList
  .reduce((compareVars, ml) => ({
    ...compareVars,
    [ml.compareVarId]: ml
  }), {})

const state = {
  compareVarId: 'epi_confirmed',
  compareVars
}

const mutations = {
  setCompareVarId: (state, compareVarId) => { state.compareVarId = compareVarId }
}

const getters = {
  getCompareVars: ({ compareVars }) => Object.values(compareVars),
  getCompareVar: ({ compareVars, compareVarId }) => compareVars[compareVarId]
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
