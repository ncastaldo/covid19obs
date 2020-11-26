<template>
  <div>
    <NavLinks />
    <v-container>
      <v-row class="align-center justify-center">
        <v-btn
          v-for="l in locations"
          :key="l.locationId"
          :outlined="l.locationId === currentLocation.locationId"
          height="50"
          width="210"
          class="mx-3 my-2 col-lg-3 col-md-4 col-sm-6 col-12"

          @click="currentLocation = l"
        >
          <Flag
            :flagId="l.flagId"
            outlined
            width="40"
          />
          <h3 class="mx-3 center-text">
            {{ l.locationName }}
          </h3>
        </v-btn>
      </v-row>
    </v-container>
    <Article>
      <component :is="currentLocation.component" />
    </Article>
  </div>
</template>

<script>

import IDNcaseStudy from '../components/case_studies/IDNcaseStudy'
import BRAcaseStudy from '../components/case_studies/BRAcaseStudy'
import ESPcaseStudy from '../components/case_studies/ESPcaseStudy'
import FRAcaseStudy from '../components/case_studies/FRAcaseStudy'
import SGPcaseStudy from '../components/case_studies/SGPcaseStudy'
import VENcaseStudy from '../components/case_studies/VENcaseStudy'

const locations = [
  {
    locationId: 'IDN',
    locationName: 'Indonesia',
    flagId: 'ID',
    component: IDNcaseStudy
  },
  {
    locationId: 'BRA',
    locationName: 'Brazil',
    flagId: 'BR',
    component: BRAcaseStudy
  },
  {
    locationId: 'ESP',
    locationName: 'Spain',
    flagId: 'ES',
    component: ESPcaseStudy
  },
  {
    locationId: 'FRA',
    locationName: 'France',
    flagId: 'FR',
    component: FRAcaseStudy
  },
  {
    locationId: 'SGP',
    locationName: 'Singapore',
    flagId: 'SG',
    component: SGPcaseStudy
  },
  {
    locationId: 'VEN',
    locationName: 'Venezuela',
    flagId: 'VE',
    component: VENcaseStudy
  }
]

export default {
  data () {
    return {
      locations,
      currentLocation: null
    }
  },
  created () {
    this.currentLocation = locations[0]
  }
}
</script>
