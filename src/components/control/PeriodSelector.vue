<template>
  <v-card
    flat
    class="pa-1"
    color="#f4f4f4"
  >
    <div class="d-flex align-center justify-space-between flex-wrap">
      <div class="display__icon mx-2">
        <v-icon large>
          mdi-calendar
        </v-icon>
      </div>
      <v-select
        v-model="period"
        class="mx-2"
        label="Period"
        :items="periods"
        item-value="periodId"
        item-text="periodName"
      >
        <template
          v-slot:selection="data"
        >
          <h3>
            {{ data.item.periodName }}
          </h3>
        </template>
      </v-select> <v-spacer />
      <div>
        Brush on the blue bars!
        <v-icon class="ml-2">
          mdi-cursor-default-click-outline
        </v-icon>
      </div>
      <v-spacer />
      <div class="d-flex align-center thin-font mx-3">
        <h3
          class="thin-font mx-1"
        >
          <i>from {{ fastDateRange[0] }}</i>
        </h3>
        <h3
          class="thin-font mx-1"
        >
          <i>to {{ fastDateRange[1] }}</i>
        </h3>
      </div>
    </div>
    <DateBrushChart
      id="date-range-brush"
      :height="60"
      :dateData="dateTweets"
      :bandDomain="bandDomain"
      :config="config"
      @endBandDomain="onEndBandDomain"
      @brushBandDomain="onBrushBandDomain"
    />
  </v-card>
</template>

<script>
import DateBrushChart from '../graphics/DateBrushChart'
import { mapGetters, mapActions, mapMutations } from 'vuex'

import { timeFormat } from 'd3-time-format'
import { throttle } from 'lodash'

const fnDateFormat = timeFormat('%d/%m/%y')

export default {
  components: {
    DateBrushChart
  },
  computed: {
    ...mapGetters({
      dateIdRange: 'period/getDateIdRange',
      dateTweets: 'period/getDateTweets',
      periods: 'period/getPeriods'
    }),
    fastDateRange () {
      return this.$store.state.period.fastDateIdRange
        .map(d => new Date(d))
        .map(fnDateFormat)
    },
    period: {
      get () { return this.$store.getters['period/getPeriod'] },
      // using dispatch in the setter, to load new data
      set (periodId) { this.$store.dispatch('period/setPeriodId', periodId) }
    },
    config () {
      return {
        bandMinStep: null,
        bandMaxStep: 10000,
        color: 'rgb(31, 121, 179)',
        padding: { bottom: 30, top: 2 },
        formatType: '~s'
      }
    },
    dateTweetsIdRange () {
      return this.dateTweets.length ? [
        this.dateTweets[0],
        this.dateTweets[this.dateTweets.length - 1]
      ].map(d => d.dateId) : this.dateIdRange
    },
    bandDomain () {
      return [
        Math.max(this.dateIdRange[0], this.dateTweetsIdRange[0]),
        Math.min(this.dateIdRange[1], this.dateTweetsIdRange[1])
      ]
    }
  },
  methods: {
    ...mapMutations({
      setFastDateIdRange: 'period/setFastDateIdRange'
    }),
    ...mapActions({
      setDateIdRange: 'period/setDateIdRange'
    }),
    onEndBandDomain (bd) {
      this.setDateIdRange(bd || this.dateTweetsIdRange)
    },
    onBrushBandDomain: throttle(function (bd) {
      bd && this.setFastDateIdRange(bd)
    }, 40)
  }
}

</script>
