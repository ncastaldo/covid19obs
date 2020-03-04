<template>
  <v-content>
    <v-container>
      <v-toolbar ref="toolbar">
        Things...
      </v-toolbar>
      <v-row style="height: 600px">
        <v-col
          md="6"
          xs="12"
        >
          <v-row
            class="fill-height flex-column"
            no-gutters
          >
            <v-col class="mb-4 flex-grow-0">
              <DateSlider />
            </v-col>
            <v-col class="flex-grow-1">
              <MapCard class="fill-height" />
            </v-col>
          </v-row>
        </v-col>
        <v-col

          md="6"
          xs="12"
        >
          <v-row
            v-if="true"
            class="fill-height flex-column"
            no-gutters
          >
            <v-col
              v-for="(section, i) in chartsConfig"
              :key="section.id"
              :class="`fill-height flex-column ${i!==0 ? 'mt-4' : ''}`"
            >
              <v-row
                no-gutters
                class="fill-height flex-column"
              >
                <v-col class="flex-grow-0">
                  <v-tabs
                    v-model="tabs[i]"
                    height="30"
                    fixed-tabs
                  >
                    <v-tab
                      v-for="chart in section.charts"
                      :key="chart.id"
                    >
                      {{ chart.label }}
                    </v-tab>
                  </v-tabs>
                </v-col>
                <v-col class="flex-grow-1">
                  <TimeseriesCard
                    :id="section.id"
                    class="fill-height"
                    :chartConfig="section.charts[tabs[i]]"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-content />
  </v-content>
</template>

<script>

import DateSlider from './DateSlider'
import MapCard from './MapCard'

import TimeseriesCard from './TimeseriesCard'

import chartsConfig from '../assets/chartsConfig.json'

const tabs = chartsConfig.map((_, i) => 0)

export default {
  components: {
    DateSlider,
    MapCard,
    TimeseriesCard
  },
  data () {
    return {
      chartsConfig,
      mapContainerSize: null,
      tabs
    }
  }
}
</script>
