<template>
  <div class="d-flex align-center justify-center flex-wrap">
    <v-menu
      v-for="c in continents"
      :key="c.continentId"
      :offsetY="true"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          icon
          v-on="on"
        >
          <v-icon
            :color="c.continentColor"
            large
          >
            mdi-circle
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="l in c.locations"
          :key="l.locationId"
        >
          <v-list-item-title>{{ l.locationName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const fnFlagUrl = id => `https://flagcdn.com/32x24/${id.toLowerCase()}.png`
// const fnFlagUrl = id => `https://www.countryflags.io/${id}/flat/64.png`

export default {
  computed: {
    ...mapGetters({
      allContinents: 'location/getContinents'
    }),
    continents () {
      return this.allContinents.filter(c => c.continentId !== '_WORLD_CONTINENT')
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
  },
  methods: {
    onError (e) {
      e.target.src = 'assets/static_img/flag.svg'
    }
  }
}
</script>

<style>

.overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-select__selections input {
  display: none;
}

/*img {
  border: 1px solid #000;
}*/

</style>
