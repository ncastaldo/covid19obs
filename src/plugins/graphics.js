import { select } from 'd3-selection'

const barsMouseover = (event) => select(event.target).style('fill-opacity', 0.7)
const barsMouseout = (event) => select(event.target).style('fill-opacity', null)

const opacityMouseover = (event) => select(event.target).style('opacity', 1)
const opacityMouseout = (event) => select(event.target).style('opacity', null)

export {
  barsMouseover,
  barsMouseout,
  opacityMouseover,
  opacityMouseout
}
