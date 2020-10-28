// import WORLD from '../assets/map/world.json'

import WHO_WORLD from '../assets/map/topojson-WHO-final.json'

import { feature } from 'topojson-client'

import { schemeCategory10 } from 'd3-scale-chromatic'

const world = feature(WHO_WORLD, WHO_WORLD.objects['geojson-WHO-final'])

const regionMapping = {
  _WORLD_REGION: { color: schemeCategory10[7], name: 'World', mainLocationId: '_WORLD' },
  EURO: { color: schemeCategory10[0], name: 'EURO', mainLocationId: 'ITA' },
  AFRO: { color: schemeCategory10[3], name: 'AFRO', mainLocationId: 'NGA' },
  AMRO: { color: schemeCategory10[4], name: 'AMRO', mainLocationId: 'USA' },
  WPRO: { color: schemeCategory10[6], name: 'WPRO', mainLocationId: 'AUS' },
  EMRO: { color: schemeCategory10[1], name: 'EMRO', mainLocationId: 'IRN' },
  SEARO: { color: schemeCategory10[2], name: 'SEARO', mainLocationId: 'THA' },
  _NOT_WHO_MEMBER: { color: schemeCategory10[5], name: 'Not WHO', mainLocationId: 'JEY' }
}

const allLocationList = world.features
  .map(f => ({
    locationId: f.properties.ISO_A3, // ADM0_A3, // adm0_a3,
    locationName: f.properties.WHO_NAME, // ADMIN, // admin,
    regionId: f.properties.WHO_REGION, // fnRegionId(f.properties.CONTINENT),
    flagId: f.properties.ISO_A2, // WB_A2,
    active: f.properties.ACTIVE === 1,
    geoBounds: [f.properties.GEO_BOUNDS.slice(0, 2), f.properties.GEO_BOUNDS.slice(2, 4)],
    geoCentroid: f.properties.GEO_CENTROID,
    geometry: f.geometry
  }))

const locationList = allLocationList
  .filter(l => l.active)
  .map(l => ({
    ...l,
    regionName: regionMapping[l.regionId].name,
    regionColor: regionMapping[l.regionId].color
  }))
  .sort((a, b) => a.locationName >= b.locationName ? 1 : -1)

locationList.push({
  locationId: '_WORLD',
  locationName: 'World',
  regionId: '_WORLD_REGION',
  regionName: 'World',
  regionColor: '#444',
  flagId: '',
  geometry: null
})

const allLocations = allLocationList
  .reduce((locations, { geometry, ...rest }) => ({
    ...locations,
    [rest.locationId]: rest
  }), {})

// all geometries
const allGeometries = allLocationList
  .reduce((geometries, { locationId, geometry }) => ({
    ...geometries,
    [locationId]: geometry
  }), {})

const locations = locationList
  .reduce((locations, { geometry, ...rest }) => ({
    ...locations,
    [rest.locationId]: rest
  }), {})

const regions = locationList
  .reduce((acc, { regionId, regionName, regionColor }) => ({
    ...acc,
    [regionId]: {
      regionId,
      regionName,
      regionColor,
      mainLocationId: regionMapping[regionId].mainLocationId
    }
  }), {})

export {
  allLocations, allGeometries,
  locations,
  regions
}
