import WHO_WORLD from '../assets/map/detailed_2013.json'
import WHO_MASKLINE from '../assets/map/maskline_detailed_2013.json'
import WHO_MASKPOLY from '../assets/map/maskpoly_detailed_2013.json'

import KOSOVO from '../assets/map/Kosovo.json'

import { feature } from 'topojson-client'

const worldMap = feature(WHO_WORLD, WHO_WORLD.objects.detailed_2013)
const masklineMap = feature(WHO_MASKLINE, WHO_MASKLINE.objects.maskline_detailed_2013)
const maskpolyMap = feature(WHO_MASKPOLY, WHO_MASKPOLY.objects.maskpoly_detailed_2013)

const kosovoMap = feature(KOSOVO, KOSOVO.objects.Kosovo)
const kosovoFeature = kosovoMap.features[0]

// extending kFeature
kosovoFeature.properties = {
  ...kosovoFeature.properties,
  ISO_3_CODE: 'XKX',
  CNTRY_TERR: 'Kosovo (in accordance with UN Security Council resolution 1244 (1999))'
}

worldMap.features = [...worldMap.features, kosovoFeature]

export {
  worldMap,
  masklineMap,
  maskpolyMap
}
