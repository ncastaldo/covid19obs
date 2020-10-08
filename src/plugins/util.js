import { csvParse } from 'd3-dsv'

import { scaleSequentialLog, scaleSequential } from 'd3-scale'

import * as interpolators from 'd3-scale-chromatic'

import variableList from '../assets/variables.json'

const variables = variableList
  .reduce((acc, v) => ({
    ...acc,
    [v.id]: v
  }), {})

const getFnDefined = varInfo => value =>
  value !== null && !isNaN(value) && value !== undefined &&
  (varInfo.minValue === null || value >= varInfo.minValue) &&
  (varInfo.maxValue === null || value <= varInfo.maxValue)

const getColorScale = (varInfo, domain) => {
  const colorScale = varInfo.scaleType === 'scaleLog'
    ? scaleSequentialLog()
    : scaleSequential()

  varInfo.colorInterpolator
    ? colorScale.interpolator(interpolators[varInfo.colorInterpolator])
    : colorScale.range(varInfo.colorRange)

  colorScale.domain(varInfo.fixedDomain || domain)

  return colorScale
}

const compareTextParser = (text) => csvParse(text, ({ variable, iso, ...dateValues }) => ({
  variable,
  iso,
  ...Object.entries(dateValues)
    .map(([date, value]) => [date, value.length ? +value : null])
    .reduce((acc, [date, value]) => ({ ...acc, [date]: value }), {})
})
)

export {
  variableList,
  variables,
  getFnDefined,
  getColorScale,
  compareTextParser
}
