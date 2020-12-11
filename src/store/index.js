import Vue from 'vue'
import Vuex from 'vuex'

import location from './location'
import period from './period'

import month from './month'

import timeseries from './timeseries'

import layer from './layer'

import makeCompare from './compare'

import view from './view'

Vue.use(Vuex)

const getInitialConfig = (config) => {
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

const getters = {
  isReady: (_, getters) => getters['tweets/getTweetsDict'] !== null
}

export default function (config) {
  const initialConfig = getInitialConfig(config)

  return new Vuex.Store({
    strict: true,
    getters,
    modules: {
      location,
      period,

      month,

      timeseries,
      layer,

      'compare/first': makeCompare(),
      'compare/second': makeCompare(),

      view
    },
    plugins: [
      store => {
        store.dispatch('location/init', initialConfig)
        store.dispatch('period/init', initialConfig)
        store.dispatch('month/init', initialConfig)
        store.dispatch('layer/init', initialConfig.layerId)
        store.dispatch('timeseries/init')
        store.dispatch('compare/first/init', initialConfig.firstCompareId)
        store.dispatch('compare/second/init', initialConfig.secondCompareId)
      }
    ]
  })
}
