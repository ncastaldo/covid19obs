import { select } from 'd3-selection'

const barsMouseover = (d, i, ns) => select(ns[i]).style('fill-opacity', 0.7)
const barsMouseout = (d, i, ns) => select(ns[i]).style('fill-opacity', null)

const circlesMouseover = (d, i, ns) => select(ns[i]).style('opacity', 1)
const circlesMouseout = (d, i, ns) => select(ns[i]).style('opacity', null)

export {
  barsMouseover,
  barsMouseout,
  circlesMouseover,
  circlesMouseout
}
