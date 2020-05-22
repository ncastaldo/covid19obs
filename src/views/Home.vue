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
      <v-row style="min-height: 600px">
        <v-col
          cols="12"
          md="6"
          lg="7"
        >
          <v-row
            class="fill-height flex-column"
            no-gutters
          >
            <v-col class="flex-grow-1">
              <MapCard class="fill-height" />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="5"
        >
          <v-row
            v-if="true"
            class="fill-height flex-column"
            no-gutters
          >
            <v-col
              v-for="(section, i) in timeseriesConfig"
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
                    show-arrows
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
        <v-col
          v-if="false"
          class="pt-2"
        >
          <FactsCard />
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col cols="12">
        <DescriptionCard />
      </v-col>
      <v-col cols="12">
        <DisclaimerCard />
      </v-col>
      <v-col cols="12">
        <InfoTableCard />
      </v-col>
      <v-col cols="12">
        <PressCard />
      </v-col>
      <v-col cols="12">
        <DataSourcesCard />
      </v-col>
      <v-col cols="12">
        <ContactsCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Sticky from 'vue-sticky-directive'

import MapCard from '../components/MapCard'

import ToolbarCard from '../components/ToolbarCard'
import TimeseriesCard from '../components/TimeseriesCard'

import LocationCard from '../components/LocationCard'

import DescriptionCard from '../components/DescriptionCard'
import DisclaimerCard from '../components/DisclaimerCard'

import InfoTableCard from '../components/InfoTableCard'
import ContactsCard from '../components/ContactsCard'
import DataSourcesCard from '../components/DataSourcesCard'

import PressCard from '../components/PressCard'

import FactsCard from '../components/FactsCard'

import timeseriesConfig from '../assets/timeseries.json'

const tabs = timeseriesConfig.map((_, i) => 0)

export default {
  directives: { Sticky },
  components: {
    ToolbarCard,
    LocationCard,
    MapCard,
    TimeseriesCard,
    FactsCard,
    DescriptionCard,
    DisclaimerCard,
    PressCard,
    InfoTableCard,
    DataSourcesCard,
    ContactsCard
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
