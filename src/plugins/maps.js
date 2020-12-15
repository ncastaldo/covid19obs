import WHO_WORLD from '../assets/map/detailed_2013.json'
import WHO_MASKLINE from '../assets/map/maskline_detailed_2013.json'
import WHO_MASKPOLY from '../assets/map/maskpoly_detailed_2013.json'

import { feature } from 'topojson-client'

const worldMap = feature(WHO_WORLD, WHO_WORLD.objects.detailed_2013)
const masklineMap = feature(WHO_MASKLINE, WHO_MASKLINE.objects.maskline_detailed_2013)
const maskpolyMap = feature(WHO_MASKPOLY, WHO_MASKPOLY.objects.maskpoly_detailed_2013)

export {
  worldMap,
  masklineMap,
  maskpolyMap
}
