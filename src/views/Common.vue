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
        class="pt-0"
      >
        <v-col
          cols="12"
        >
          <div
            class="pb-1"
          >
            <v-row class="px-2 pb-xs-0 pb-sm-2">
              <v-col class="col-12 col-sm-4 col-md-3 py-0">
                <LocationDictSelect />
              </v-col>
              <v-col class="col-12 col-sm-8 col-md-9 py-0">
                <DateSlider />
              </v-col>
            </v-row>
            <LocationLegendChart :height="45" />
          </div>
          <HybridMapChart :height="300" />
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
          cols="12"
          class="pt-1 pb-3"
        >
          <InfoTableCard />
        </v-col>

        <v-col
          cols="12"
          class="pb-3"
        >
          <PartnersCard />
        </v-col>

        <v-col
          cols="12"
          class="pb-3"
        >
          <DescriptionCard />
        </v-col>
        <v-col
          cols="12"
          class="pb-3"
        >
          <DisclaimerCard />
        </v-col>
        <v-col
          cols="12"
          class="pb-3"
        >
          <DataSourcesCard />
        </v-col>

        <v-col
          cols="12"
          class="pb-3"
        >
          <PressCard />
        </v-col>
        <v-col
          cols="12"
          class="pb-3"
        >
          <ContactsCard />
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

import HybridMapChart from '../components/HybridMapChart'
// import SelectorMapChart from '../components/SelectorMapChart'

import PressCard from '../components/PressCard'
import ContactsCard from '../components/ContactsCard'

import LocationDictSelect from '../components/LocationDictSelect'
import DateSlider from '../components/DateSlider'
// import LocationDetails from '../components/LocationDetails'
import LocationLegendChart from '../components/LocationLegendChart'

import ToolbarCard from '../components/ToolbarCard'
import TimeseriesCard from '../components/TimeseriesCard'

import LocationCard from '../components/LocationCard'

import PartnersCard from '../components/PartnersCard'
import InfoTableCard from '../components/InfoTableCard'
import DataSourcesCard from '../components/DataSourcesCard'
import DisclaimerCard from '../components/DisclaimerCard'
import DescriptionCard from '../components/DescriptionCard'

import FactsCard from '../components/FactsCard'

import timeseriesConfig from '../assets/timeseries.json'

const tabs = timeseriesConfig.map((_, i) => 0)

export default {
  directives: { Sticky },
  components: {
    ToolbarCard,
    LocationCard,
    // MapCard,

    LocationDictSelect,
    DateSlider,
    // LocationDetails,
    HybridMapChart,
    // SelectorMapChart,
    LocationLegendChart,

    PressCard,
    ContactsCard,
    InfoTableCard,
    DataSourcesCard,
    DisclaimerCard,
    DescriptionCard,

    PartnersCard,

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
