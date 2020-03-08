<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col class="py-0">
          <ToolbarCard />
        </v-col>
      </v-row>
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
            <v-col class="mb-4 flex-grow-0">
              <DateSlider />
            </v-col>
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
      </v-row>
      <v-row>
        <v-col cols="12">
          <DescriptionCard />
        </v-col>
        <v-col cols="12">
          <TableCard />
        </v-col>
        <v-col cols="12">
          <DataSourcesCard />
        </v-col>
        <v-col cols="12">
          <ContactsCard />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import DateSlider from './DateSlider'
import MapCard from './MapCard'

import ToolbarCard from './ToolbarCard'
import TimeseriesCard from './TimeseriesCard'
import DescriptionCard from './DescriptionCard'
import TableCard from './TableCard'
import ContactsCard from './ContactsCard'
import DataSourcesCard from './DataSourcesCard'

import timeseriesConfig from '../assets/timeseries.json'

const tabs = timeseriesConfig.map((_, i) => 0)

export default {
  components: {
    ToolbarCard,
    DateSlider,
    MapCard,
    TimeseriesCard,
    TableCard,
    DescriptionCard,
    DataSourcesCard,
    ContactsCard
  },
  data () {
    return {
      timeseriesConfig,
      tabs
    }
  }
}
</script>
