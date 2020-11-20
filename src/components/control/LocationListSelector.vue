<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        tile
        :color="color"
        dark
        v-on="on"
      >
        <span
          class="mr-2"
        >{{ name }}</span>
        <span>{{ model.length }}</span>
      </v-btn>
    </template>
    <v-list
      class="overflow-y-auto"
      max-height="300"
    >
      <v-list-item
        @click="onClickSelectAll"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ allSelected ? 'Reset' : 'Select All' }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="" />
      <v-list-item-group
        v-model="model"
        multiple
      >
        <v-list-item
          v-for="l in locations"
          :key="l.locationId"
          :color="color"
        >
          <v-list-item-title>{{ l.locationName }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>

const fnFlagUrl = id => `https://flagcdn.com/32x24/${id.toLowerCase()}.png`
// const fnFlagUrl = id => `https://www.countryflags.io/${id}/flat/64.png`

export default {
  props: {
    name: String,
    color: String,
    // array of locations
    locations: {
      type: Array,
      default: () => []
    },
    // array of locationId
    value: Array
  },
  computed: {
    locationMapping () {
      return this.locations.reduce((acc, l, i) => ({
        ...acc,
        [l.locationId]: i
      }), {})
    },
    model: {
      get () { return this.value.map(locationId => this.locationMapping[locationId]) },
      set (indices) { this.$emit('input', indices.map(i => this.locations[i].locationId)) }
    },
    flagUrl () {
      return this.location && this.location.flagId && this.location.flagId !== '-99'
        ? fnFlagUrl(this.location.flagId)
        : null
    },
    allSelected () {
      return this.locations.length === this.value.length
    }
  },
  methods: {
    change (region, locationIndices) {
      const locationIdList = Object.entries(this.regionMapping)
        .filter(([regionId]) => regionId !== region.regionId)
        .map(([regionId, indices], j, regions) => indices.map(idx => regions[j].locations[idx].locationId))
        .flat()

      this.setLocationIdList([
        ...locationIdList,
        ...locationIndices
          .map((idx) => region.locations
            .filter(l => l.idx === idx)
            .map(l => l.locationId)).flat()
      ])
    },
    onError (e) {
      e.target.src = 'assets/static_img/flag.svg'
    },
    onClickSelectAll () {
      console.log(this.locations)
      if (this.allSelected) {
        this.model = []
      } else {
        this.model = this.locations.map((_, i) => i)
      }
    }
  }
}
</script>

<style scoped>

.black {
  color: black
}

</style>
