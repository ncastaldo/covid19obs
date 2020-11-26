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
      label="Region"
      :items="regions"
      item-value="regionId"
      item-text="regionName"
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
      v-if="locations.length "
      class="flex-grow-1 d-flex align-center justify-space-between"
    >
      <v-select
        v-model="location"
        class="mx-2"
        label="Country"
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
          <Flag
            width="30"
            class="pr-2"
            :flagId="data.item.flagId"
          />
          {{ data.item.locationName }}
        </template>
      </v-select>
      <Flag
        width="50"
        class="mx-2"
        :flagId="location.flagId"
      />
    </div>
    <v-spacer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      regions: 'location/getRegions',
      getRegionLocations: 'location/getRegionLocations'
    }),
    locations () {
      return this.getRegionLocations(this.region.regionId)
    },
    location: {
      get () { return this.$store.getters['location/getLocation'] },
      set (locationId) { this.$store.dispatch('location/setLocationId', locationId) }
    },
    region: {
      get () { return this.$store.getters['location/getRegion'] },
      set (regionId) { this.$store.dispatch('location/setRegionId', regionId) }
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
