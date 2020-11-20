<template>
  <div>
    <div class="d-flex align-center">
      <h1 class="thin-font">
        {{ location.locationName }}
      </h1>
      <v-spacer />
      <h3>
        {{ Number(locationSummary.info_tweets_mean).toFixed(2) }} tweets/day
      </h3>
    </div>
    <v-divider />
    <div class="d-flex align-center">
      <h2 class="thin-font">
        Coverage Level: {}
      </h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { csvParse } from 'd3-dsv'

const url = '/assets/summary.csv'

export default {
  data () {
    return {
      summary: null
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
    coverageLevel () {
      return this.locationSummary.info_tweets_last || ''
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
        }))
      }, {})
  }
}
</script>
