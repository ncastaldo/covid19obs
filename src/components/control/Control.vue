<template>
  <div>
    <LocationDisplay />
    <LocationSelector2 />
    <!--v-dialog
      v-model="mapDialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn>
          <v-icon
            large
            v-bind="attrs"
            v-on="on"
          >
            mdi-map
          </v-icon>
        </v-btn>
      </template>

      <Location :height="500" />
    </v-dialog-->
  </div>
</template>

<script>
import LocationDisplay from './LocationDisplay'
import LocationSelector2 from './LocationSelector2'
import { mapGetters } from 'vuex'

export default {
  components: {
    LocationDisplay,
    LocationSelector2
  },
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  },
  data () {
    return {
      mapDialog: false
    }
  }
}
</script>

<style>

</style>
