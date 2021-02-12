<template>
  <div v-if="summary">
    <div class="d-flex align-center flex-wrap justify-space-between">
      <div class="d-flex flex-wrap">
        <Flag
          v-if="location.locationId !== '_WORLD'"
          width="50"
          class="mr-4"
          :flagId="location.flagId"
        />
        <h1 class="thin-font">
          {{ location.locationName }}
        </h1>
      </div>
      <div class="flex-grow-1 text-right">
        <h3 class="thin-font">
          Average Coverage:
        </h3>
        <div class="ml-2">
          <IndexCircles
            total="3"
            size="26"
            :active="locationSummary.info_tweets_mean > 1000 ? 3 : 2"
            color="rgb(31, 121, 179)"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-end mt-2">
      <h5>{{ fnDateFormat(new Date(2020, 0, 22)) }} - {{ lastDateString }}</h5>
    </div>
    <v-divider class="mb-2" />
    <div class="d-flex align-end justify-space-between flex-wrap">
      <div class="d-flex flex-column ">
        <div
          v-for="row in rows"
          :key="row.id"
          class="d-flex justify-space-between flex-wrap py-1"
        >
          <div class="mr-3">
            <b class="mr-3">{{ row.name }}:</b><i>{{ row.fnFormat(locationSummary[row.id]) }}</i>
          </div>
          <div class="d-flex align-center flex-wrap">
            <div class="mr-2">
              <b>{{ row.fnLabel(locationSummary[row.id]) }}</b>
            </div>
            <IndexCircles
              total="10"
              :active="Math.ceil(locationSummary[row.id] * 10)"
              :color="row.fnColor(locationSummary[row.id])"
            />
          </div>
        </div>
      </div>
      <div class="text-right d-flex flex-column flex-grow-1">
        <h3 class="thin-font">
          <i>Date: {{ lastDateString }}</i>
        </h3>
        <v-spacer />
        <h4 class="thin-font">
          Coverage:
          <IndexCircles
            total="3"
            size="medium"
            :active="locationSummary.info_tweets_last > 1000
              ? 3 : locationSummary.info_tweets_last > 100 ? 2 : 1"
            color="rgb(31, 121, 179)"
          />
        </h4>
      </div>
    </div>
    <v-divider class="mt-2" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { csvParse } from 'd3-dsv'

import { format } from 'd3-format'

import { variables, getColorScale, fnDateFormat } from '../plugins/util'

const url = '/assets/summary.csv'

const fnIriColor = getColorScale(variables.info_iri, [0, 1])
const fnNewsColor = getColorScale(variables.info_fact_unreliable_fraction, [0, 1])

const fnFormat = format('.1%')

const fnLabel = d => d < 0.25 ? 'LOW'
  : d < 0.5 ? 'LOW/MEDIUM'
    : d < 0.75 ? 'MEDIUM/HIGH'
      : 'HIGH'

const rows = [{
  id: 'info_iri_last',
  name: 'Infodemic Risk Index',
  fnLabel,
  fnFormat,
  fnColor: fnIriColor
},
{
  id: 'info_dyn_iri_last',
  name: 'Dynamic Infodemic Risk Index',
  fnLabel,
  fnFormat,
  fnColor: fnIriColor
},
{
  id: 'info_fact_unreliable_fraction_last',
  name: 'News Unreliability Index',
  fnLabel,
  fnFormat,
  fnColor: fnNewsColor
}]

export default {
  data () {
    return {
      summary: null,
      rows
    }
  },
  computed: {
    ...mapGetters({
      location: 'location/getLocation'
    }),
    locationSummary () {
      return this.summary
        ? this.summary[this.location.locationId]
        : {}
    },
    lastDateString () {
      return this.locationSummary.date_last
        ? fnDateFormat(new Date(this.locationSummary.date_last))
        : ''
    }
  },
  created () {
    fetch(url)
      .then(res => res.text())
      .then(data => csvParse(data))
      .then(data => {
        this.summary = data.reduce((acc, cur) => ({
          ...acc,
          [cur.iso]: cur
        }), {})
      }, {})
  },
  methods: {
    fnDateFormat
  }
}
</script>
