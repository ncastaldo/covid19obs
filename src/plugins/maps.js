import { feature } from 'topojson-client'

const whoWorldUrl = '/assets/static_maps/detailed_2013.json'
const kosovoUrl = '/assets/static_maps/Kosovo.json'

const getWorldMap = () => Promise.all([
  fetch(whoWorldUrl).then((res) => res.json()).then((world) => feature(world, world.objects.detailed_2013)),
  fetch(kosovoUrl).then((res) => res.json()).then((kosovo) => feature(kosovo, kosovo.objects.Kosovo))
])
  .then(([worldMap, kosovoMap]) => {
    const kosovoFeature = kosovoMap.features[0]
    // extending kFeature
    kosovoFeature.properties = {
      ...kosovoFeature.properties,
      ISO_3_CODE: 'XKX',
      CNTRY_TERR: 'Kosovo (in accordance with UN Security Council resolution 1244 (1999))'
    }

    worldMap.features = [...worldMap.features, kosovoFeature]

    return worldMap
  })

const masklineUrl = '/assets/static_maps/maskline_detailed_2013.json'

const getMasklineMap = () =>
  fetch(masklineUrl)
    .then((res) => res.json())
    .then((world) => feature(world, world.objects.maskline_detailed_2013))

const maskpolyUrl = '/assets/static_maps/maskpoly_detailed_2013.json'

const getMaskpolyMap = () =>
  fetch(maskpolyUrl)
    .then((res) => res.json())
    .then((world) => feature(world, world.objects.maskpoly_detailed_2013))

export {
  getWorldMap,
  getMasklineMap,
  getMaskpolyMap
}
