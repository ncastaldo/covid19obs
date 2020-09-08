<template>
  <div class="d-flex align-center py-2">
    <div class="display__icon pr-3">
      <v-icon large>
        mdi-map
      </v-icon>
    </div>
    <v-select
      v-model="continent"
      :items="continents"
      item-value="continentId"
      item-text="continentName"
      return-object
      style="width: 180px"
      color="#444"
    >
      <template
        v-slot:selection="data"
      >
        <h2>{{ data.item.continentName }}</h2>
      </template>
    </v-select>
    <v-select
      v-if="locations"
      v-model="location"
      :items="locations"
      item-value="locationId"
      item-text="locationName"
      style="width: 180px"
      color="#444"
    >
      <template
        v-slot:selection="data"
      >
        <img
          width="40"
          :src="`https://flagcdn.com/${data.item.flagId.toLowerCase()}.svg`"
          class="pr-3"
        >
        <h2>{{ data.item.locationName }}</h2>
      </template>
      <template
        v-slot:item="data"
      >
        <img
          width="30"
          :src="`https://flagcdn.com/${data.item.flagId.toLowerCase()}.svg`"
          class="pr-2"
        >
        {{ data.item.locationName }}
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const fnFlagUrl = id => `https://flagcdn.com/32x24/${id.toLowerCase()}.png`
// const fnFlagUrl = id => `https://www.countryflags.io/${id}/flat/64.png`

export default {
  computed: {
    ...mapGetters({
      continents: 'location/getContinents'
    }),
    locations () {
      return this.continent.continentId !== '_WORLD_CONTINENT'
        ? this.continent.locations.slice()
          .sort((a, b) => a.locationName > b.locationName ? 1 : -1)
        : null
    },
    location: {
      get () { return this.$store.getters['location/getLocation'] },
      // using dispatch in the setter, to load new data
      set (locationId) { this.$store.dispatch('location/setLocationId', locationId) }
    },
    continent: {
      get () { return this.$store.getters['location/getContinent'] },
      // returns the object
      set (continent) {
        // getting the first location, for _WORLD it is the WORLD itself
        const locationId = continent.locations[0].locationId
        this.$store.dispatch('location/setLocationId', locationId)
      }
    },
    flagUrl () {
      return this.location && this.location.flagId && this.location.flagId !== '-99'
        ? fnFlagUrl(this.location.flagId)
        : null
    }
  }
}
</script>

<style scoped>

/*img {
  border: 1px solid #000;
}*/

</style>
