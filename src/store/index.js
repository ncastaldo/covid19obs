import Vue from 'vue'
import Vuex from 'vuex'

import location from './location'
import period from './period'
import month from './month'
import timeseries from './timeseries'
import layer from './layer'

import makeCompare from './compare'
import view from './view'

import { getWorldMap } from '../plugins/maps'
import { getLocationProps } from '../plugins/location'

Vue.use(Vuex)

const configUrl = '/assets/config.json'

const computeConfig = (config) => {
  const initialConfig = {
    // LOCATIONS
    locationId: '_WORLD',
    locationIdList: ['USA', 'CHN', 'ITA', 'ESP', 'DEU', 'FRA', 'IDN'],

    // COMPARE
    firstCompareId: 'info_iri',
    secondCompareId: 'epi_cases',

    // LAYER
    layerId: 'info_iri'
  }

  // MONTHS
  initialConfig.monthList = config.months.map(d => new Date(d))
  // monthId is a timestamp
  initialConfig.monthId = +initialConfig.monthList[initialConfig.monthList.length - 1]

  // DATES
  initialConfig.dates = config.dates.map(d => new Date(d))

  // PERIODS
  initialConfig.periodList = config.periods.map(p => ({
    periodId: p.periodId,
    periodName: p.periodName,
    from: new Date(p.from),
    to: new Date(p.to)
  }))
  initialConfig.periodId = initialConfig.periodList[initialConfig.periodList.length - 1].periodId

  return initialConfig
}

const actions = {
  init: ({ dispatch, commit }) =>
    Promise.all([
      fetch(configUrl).then(result => result.json()).then(computeConfig),
      getWorldMap().then(getLocationProps)
    ])
      .then(([a, b]) => ({ ...a, ...b }))
      .then(config => {
        dispatch('location/init', config)
        dispatch('period/init', config)
        dispatch('month/init', config)
        dispatch('layer/init', config)
        dispatch('timeseries/init')
        dispatch('compare/first/init', config.firstCompareId)
        dispatch('compare/second/init', config.secondCompareId)
      })
      .then(() => { commit('setReady', true) })

}

export default new Vuex.Store({
  strict: true,
  state: { ready: false },
  mutations: { setReady: (state, ready) => { state.ready = ready } },
  getters: { isReady: ({ ready }) => ready },
  actions,
  modules: {
    location,
    period,
    month,
    timeseries,
    layer,
    view,
    'compare/first': makeCompare(),
    'compare/second': makeCompare()
  }
})
