import { schemeCategory10 } from 'd3-scale-chromatic'

import validCountries from '../assets/validCountries.json'
const validCountriesSet = new Set(validCountries)

const regionMapping = {
  _WORLD_REGION: { color: schemeCategory10[7], name: 'World', mainLocationId: '_WORLD', order: 7 },
  EURO: { color: schemeCategory10[0], name: 'European (EURO)', mainLocationId: 'ITA', order: 3 },
  AFRO: { color: schemeCategory10[3], name: 'African (AFRO)', mainLocationId: 'NGA', order: 0 },
  AMRO: { color: schemeCategory10[4], name: 'Americas (AMRO)', mainLocationId: 'USA', order: 1 },
  WPRO: { color: schemeCategory10[6], name: 'Western Pacific (WPRO)', mainLocationId: 'AUS', order: 5 },
  EMRO: { color: schemeCategory10[1], name: 'Eastern Mediterranean (EMRO)', mainLocationId: 'IRN', order: 2 },
  SEARO: { color: schemeCategory10[2], name: 'South-East Asia (SEARO)', mainLocationId: 'THA', order: 4 },
  _NOT_WHO_MEMBER: { color: schemeCategory10[5], name: 'Not WHO Member', mainLocationId: 'ASM', order: 6 }
}

const getLocationProps = worldMap => {
  const allLocationList = worldMap.features
    .map(f => ({
      locationId: f.properties.ISO_3_CODE,
      locationName: f.properties.CNTRY_TERR,
      regionId: f.properties.WHO_STATUS === 'Member state'
        ? f.properties.WHO_REGION
        : '_NOT_WHO_MEMBER',
      flagId: f.properties.ISO_2_CODE,
      geometry: f.geometry
    }))
    .map(l => ({
      ...l,
      active: validCountriesSet.has(l.locationId),
      regionName: regionMapping[l.regionId].name,
      regionColor: regionMapping[l.regionId].color
    }))

  const locationList = allLocationList
    .filter(l => l.active)
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

  return {
    allLocations,
    allGeometries,
    locations,
    regions
  }
}

export { getLocationProps }
