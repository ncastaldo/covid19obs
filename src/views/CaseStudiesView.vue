<template>
  <div>
    <NavLinks />
    <v-container>
      <v-row class="align-center justify-center">
        <v-btn
          v-for="l in locations"
          :key="l.locationId"
          height="80"
          width="210"
          class="mx-3"
          @click="currentLocationId = l.locationId"
        >
          <img
            width="50"
            :src="`https://flagcdn.com/${l.flagId.toLowerCase()}.svg`"
            class="pr-2"
          >
          <h3 class="mx-3">
            {{ l.locationName }}
          </h3>
        </v-btn>
      </v-row>
    </v-container>
    <br>
    <Article>
      <component :is="currentLocationId" />
    </Article>
  </div>
</template>

<script>

const locations = [
  {
    locationId: 'IDN',
    locationName: 'Indonesia',
    flagId: 'ID'
  },
  {
    locationId: 'BRA',
    locationName: 'Brazil',
    flagId: 'BR'
  }]

export default {
  components: {
    IDN: () => import(/* webpackChunkName: "IDNcaseStudy" */'../components/case_studies/IDNcaseStudy'),
    BRA: () => import(/* webpackChunkName: "BRAcaseStudy" */'../components/case_studies/BRAcaseStudy')
  },
  data () {
    return {
      locations,
      currentLocationId: null
    }
  },
  created () {
    this.currentLocationId = locations[0].locationId
  }
}
</script>
