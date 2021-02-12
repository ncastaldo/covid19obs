<template>
  <div>
    <v-menu
      offset-y
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          outlined
          :color="color"
          v-on="on"
        >
          <v-badge
            :color="color"
            :content="model.length || '0'"
            overlap
            inline
            tile
          >
            <span
              class="mr-2"
              style="color: #1E1E1E"
            >{{ name }}</span>
          </v-badge>
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
          active-class="active-location"
        >
          <v-list-item
            v-for="l in locations"
            :key="l.locationId"
            :color="color"
          >
            <v-list-item-title>
              <Flag
                width="30"
                class="pr-2"
                :flagId="l.flagId"
              />
              {{ l.locationName }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>

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
      // console.log(this.locations)
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

.active-location {
  font-weight: 600;
}

</style>
