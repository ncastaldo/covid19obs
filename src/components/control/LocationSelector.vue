<template>
  <div class="d-flex align-center justify-space-between flex-wrap">
    <div class="display__icon mx-2">
      <v-icon large>
        mdi-map
      </v-icon>
    </div>
    <v-select
      v-model="region"
      class="mx-2"
      :items="regions"
      item-value="regionId"
      item-text="regionName"
      return-object
    >
      <template
        v-slot:selection="data"
      >
        <h3>
          {{ data.item.regionName }}
        </h3>
      </template>
    </v-select>
    <div
      v-if="locations"
      class="flex-grow-1 d-flex align-center justify-space-between"
    >
      <v-select
        v-model="location"
        class="mx-2"
        :items="locations"
        item-value="locationId"
        item-text="locationName"
      >
        <template
          v-slot:selection="data"
        >
          <h3
            class="overflow"
          >
            {{ data.item.locationName }}
          </h3>
        </template>
        <template
          v-slot:item="data"
        >
          <img
            width="30"
            :src="`https://flagcdn.com/${data.item.flagId.toLowerCase()}.svg`"
            class="pr-2"
            @error="onError"
          >
          {{ data.item.locationName }}
        </template>
      </v-select>
      <img
        width="50"
        class="mx-2"
        :src="`https://flagcdn.com/${location.flagId.toLowerCase()}.svg`"
        @error="onError"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const fnFlagUrl = id => `https://flagcdn.com/32x24/${id.toLowerCase()}.png`
// const fnFlagUrl = id => `https://www.countryflags.io/${id}/flat/64.png`

export default {
  computed: {
    ...mapGetters({
      regions: 'location/getRegions'
    }),
    locations () {
      return this.region.regionId !== '_WORLD_CONTINENT'
        ? this.region.locations.slice()
          .sort((a, b) => a.locationName > b.locationName ? 1 : -1)
        : null
    },
    location: {
      get () { return this.$store.getters['location/getLocation'] },
      // using dispatch in the setter, to load new data
      set (locationId) { this.$store.dispatch('location/setLocationId', locationId) }
    },
    region: {
      get () { return this.$store.getters['location/getRegion'] },
      // returns the object
      set (region) {
        // getting the first location, for _WORLD it is the WORLD itself
        const locationId = region.mainLocationId
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
