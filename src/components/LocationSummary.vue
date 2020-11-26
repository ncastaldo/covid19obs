<template>
  <div v-if="summary">
    <div class="d-flex align-center">
      <Flag
        v-if="location.locationId !== '_WORLD'"
        width="50"
        class="mr-4"
        :flagId="location.flagId"
      />
      <h1 class="thin-font">
        {{ location.locationName }}
      </h1>
      <v-spacer />
      <div class="text-right">
        <h2 class="thin-font">
          Avg. Coverage:
        </h2>
        <h5>{{ fnDateFormat(new Date(2020, 0, 22)) }} - {{ lastDateString }}</h5>
      </div>
      <span class="ml-2">
        <IndexCircles
          total="3"
          size="30"
          :active="locationSummary.info_tweets_mean > 1000 ? 3 : 2"
          color="rgb(31, 121, 179)"
        />
      </span>
    </div>
    <v-divider class="mb-2" />
    <div class="d-flex align-end flex-wrap">
      <table>
        <tr
          v-for="row in rows"
          :key="row.id"
        >
          <th class="text-left">
            <span class=" mr-3">
              {{ row.name }}
            </span>
          </th>
          <th class="text-right">
            <span class=" thin-font mr-2">
              <i>{{ row.fnFormat(locationSummary[row.id]) }}</i>
            </span>
          </th>
          <th class="text-right">
            <span class="mr-2">
              {{ row.fnLabel(locationSummary[row.id]) }}
            </span>
          </th>

          <th>
            <IndexCircles
              class="mr-2"
              total="10"
              :active="Math.ceil(locationSummary[row.id] * 10)"
              :color="row.fnColor(locationSummary[row.id])"
            />
          </th>
        </tr>
      </table>
      <v-spacer />
      <div class="text-right d-flex flex-column">
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
