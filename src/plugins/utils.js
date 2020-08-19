const getFnDefined = varInfo => value =>
  value !== null && !isNaN(value) &&
  (varInfo.minValue === null || value >= varInfo.minValue) &&
  (varInfo.maxValue === null || value <= varInfo.maxValue)

export { getFnDefined }
