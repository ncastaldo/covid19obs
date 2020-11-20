import { csvParse } from 'd3-dsv'
import { format } from 'd3-format'
import { interpolateRgbBasis } from 'd3-interpolate'
import { scaleSequentialLog, scaleSequential } from 'd3-scale'

import * as interpolators from 'd3-scale-chromatic'

import rawVariableList from '../assets/variables.json'

/* * * VARIABLES * * */

const getFnDefined = varInfo => value =>
  value !== null && !isNaN(value) && value !== undefined &&
  (varInfo.minValue === null || value >= varInfo.minValue) &&
  (varInfo.maxValue === null || value <= varInfo.maxValue)

const getFnFormat = varInfo => format(varInfo.formatType)

const getFnColorInterpolator = varInfo => varInfo.colorInterpolator
  ? interpolators[varInfo.colorInterpolator]
  : interpolateRgbBasis(varInfo.colorRange)

const variableList = rawVariableList.map(v => ({
  ...v,
  fnDefined: getFnDefined(v),
  fnFormat: getFnFormat(v),

  domain: v.fixedDomain || v.baseDomain || [1, 10],

  // used in legend too
  fnColorInterpolator: getFnColorInterpolator(v)
}))

const variables = variableList
  .reduce((acc, v) => ({
    ...acc,
    [v.id]: v
  }), {})

// color scale from variable

const getColorScale = (varInfo, domain) => {
  const colorScale = varInfo.scaleType === 'scaleLog'
    ? scaleSequentialLog()
    : scaleSequential()

  colorScale.interpolator(varInfo.fnColorInterpolator)

  colorScale.domain(varInfo.fixedDomain || domain)

  return colorScale
}

/* * * DATA PARSER * * */
const compareTextParser = (text) => csvParse(text, ({ variable, iso, ...dateValues }) => ({
  variable,
  iso,
  ...Object.entries(dateValues)
    .map(([date, value]) => [date, value.length ? +value : null])
    .reduce((acc, [date, value]) => ({ ...acc, [date]: value }), {})
}))

const lastUpdatesTextParser = (text) => csvParse(text, ({ variable, iso, ...rest }) => ({
  variable,
  iso,
  dateString: Object.keys(rest)[0],
  value: Object.values(rest)[0]
}))

/* * * DOWNLOAD * * */
function fnDownload (filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export {
  variableList,
  variables,

  getColorScale,

  compareTextParser,
  lastUpdatesTextParser,

  fnDownload
}
