<template>
  <v-container>
    <ToolbarCard class="mb-3" />
    <div sticky-container>
      <div
        v-sticky
        sticky-z-index="4"
        sticky-offset="stickyOffset"
      >
        <LocationCard />
      </div>
      <v-row
        no-gutters
        class="pt-3"
      >
        <v-col
          cols="12"
        >
          <SelectorMapChart :height="300" />
        </v-col>
        <v-col
          cols="12"
          class="pt-3"
        >
          <v-row no-gutters>
            <v-col
              v-for="(section, i) in timeseriesConfig"
              :key="section.id"
              cols="12"
              class="pb-3"
            >
              <v-tabs
                v-model="tabs[i]"
                height="35"
                show-arrows
                grow
              >
                <v-tab
                  v-for="chart in section.charts"
                  :key="chart.id"
                >
                  {{ chart.label }}
                </v-tab>
              </v-tabs>
              <TimeseriesCard
                :id="section.id"
                :chartConfig="section.charts[tabs[i]]"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col
          v-if="false"
          class="pt-2"
        >
          <FactsCard />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

import Sticky from 'vue-sticky-directive'

import SelectorMapChart from '../components/SelectorMapChart'

import ToolbarCard from '../components/ToolbarCard'
import TimeseriesCard from '../components/TimeseriesCard'

import LocationCard from '../components/LocationCard'

import FactsCard from '../components/FactsCard'

import timeseriesConfig from '../assets/timeseries.json'

const tabs = timeseriesConfig.map((_, i) => 0)

export default {
  directives: { Sticky },
  components: {
    ToolbarCard,
    LocationCard,
    // MapCard,
    SelectorMapChart,
    TimeseriesCard,
    FactsCard
  },
  data () {
    return {
      timeseriesConfig,
      tabs,
      stickyOffset: { top: 60 }
    }
  }
}
</script>
