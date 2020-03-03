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
              <v-row
                no-gutters
                class="fill-height flex-column"
              >
                <v-col class="flex-grow-0">
                  <v-tabs
                    v-model="middleTab"
                    fixed-tabs
                  >
                    <v-tab
                      v-for="chartConfig in chartsConfig.EMO"
                      :key="chartConfig.id"
                    >
                      {{ chartConfig.name }}
                    </v-tab>
                  </v-tabs>
                </v-col>
                <v-col class="flex-grow-1">
                  <TimeseriesCard
                    :id="'middleCard'"
                    class="fill-height"
                    :chartConfig="chartsConfig.EMO[middleTab]"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col class="mt-4" />
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

import chartsConfig from '../assets/chartsConfig.json'

export default {
  components: {
    MapCard,
    TimeseriesCard
    // TimeseriesRouter
  },
  data () {
    return {
      chartsConfig,
      mapContainerSize: null,
      middleTab: 0
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
