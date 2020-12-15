// import WORLD from '../assets/map/world.json'

import { worldMap } from './maps'

import { schemeCategory10 } from 'd3-scale-chromatic'

const regionMapping = {
  _WORLD_REGION: { color: schemeCategory10[7], name: 'World', mainLocationId: '_WORLD', order: 7 },
  EURO: { color: schemeCategory10[0], name: 'EURO (European)', mainLocationId: 'ITA', order: 3 },
  AFRO: { color: schemeCategory10[3], name: 'AFRO (African)', mainLocationId: 'NGA', order: 0 },
  AMRO: { color: schemeCategory10[4], name: 'AMRO (Americas)', mainLocationId: 'USA', order: 1 },
  WPRO: { color: schemeCategory10[6], name: 'WPRO (Western Pacific)', mainLocationId: 'AUS', order: 5 },
  EMRO: { color: schemeCategory10[1], name: 'EMRO (Eastern Mediterranean)', mainLocationId: 'IRN', order: 2 },
  SEARO: { color: schemeCategory10[2], name: 'SEARO (South-East Asia)', mainLocationId: 'THA', order: 4 },
  _NOT_WHO_MEMBER: { color: schemeCategory10[5], name: 'Not WHO Member', mainLocationId: 'JEY', order: 6 }
}

const allLocationList = worldMap.features
  .map(f => ({
    locationId: f.properties.ISO_3_CODE, // ADM0_A3, // adm0_a3,
    locationName: f.properties.CNTRY_TERR, // ADMIN, // admin,
    regionId: f.properties.WHO_REGION, // fnRegionId(f.properties.CONTINENT),
    flagId: f.properties.ISO_2_CODE, // WB_A2,
    active: true, // f.properties.ACTIVE === 1,
    // geoBounds: [f.properties.GEO_BOUNDS.slice(0, 2), f.properties.GEO_BOUNDS.slice(2, 4)],
    // geoCentroid: f.properties.GEO_CENTROID,
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
  .sort((a, b) => regionMapping[a.regionId].order > regionMapping[b.regionId].order ? 1 : -1)
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
  allLocations,
  allGeometries,
  locations,
  regions
}
