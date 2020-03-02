<template>
  <v-content>
    <v-container>
      <v-toolbar ref="toolbar">
        Things
      </v-toolbar>
      <v-row>
        <v-col
          cols="6"
        >
          <MapCard :size="mapContainerSize" />
        </v-col>
        <v-col
          cols="6"
        >
          <v-row
            no-gutters
            class="fill-height flex-column"
          >
            <v-col>
              <TimeseriesCard
                :id="'top-card'"
                class="fill-height"
              />
            </v-col>
            <v-col class="mt-4">
              <TimeseriesCard
                :id="'center-card'"
                class="fill-height"
              />
            </v-col>
            <v-col class="mt-4">
              <TimeseriesCard
                :id="'bottom-card'"
                class="fill-height"
              />
            </v-col>
          </v-row>
          <!--SelectionCard />
          <TimeseriesRouter /-->
        </v-col>
      </v-row>
    </v-container>
    <v-content />
  </v-content>
</template>

<script>
import MapCard from './MapCard'
import TimeseriesCard from './TimeseriesCard'

export default {
  components: {
    MapCard,
    TimeseriesCard
    // TimeseriesRouter
  },
  data () {
    return {
      mapContainerSize: null
    }
  },
  created () {
    window.addEventListener('resize', this.updateHeight)
  },
  mounted () {
    this.updateHeight()
  },
  methods: {
    updateHeight () {
      this.mapContainerSize = {
        width: 500, // window.innerWidth - this.$refs.toolbar.clientWidth,
        height: window.innerHeight - this.$refs.toolbar.clientHeight
      }
      console.log(this.mapContainerSize)
    }
  }
}
</script>
