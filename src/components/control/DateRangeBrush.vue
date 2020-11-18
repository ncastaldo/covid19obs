<template>
  <DateBrushChart
    id="date-range-brush"
    :height="120"
    :dateData="dateTweets"
    :bandDomain="bandDomain"
    :config="config"
    @endBandDomain="onEndBandDomain"
    @brushBandDomain="onBrushBandDomain"
  />
</template>

<script>
import DateBrushChart from '../graphics/DateBrushChart'
import { mapGetters, mapActions, mapMutations } from 'vuex'

import { throttle } from 'lodash'

export default {
  components: {
    DateBrushChart
  },
  computed: {
    ...mapGetters({
      dateIdRange: 'period/getDateIdRange',
      dateTweets: 'period/getDateTweets'
    }),
    config () {
      return {
        bandMinStep: null,
        bandMaxStep: 10000,
        color: 'rgb(31, 121, 179)',
        formatType: '~s'
      }
    },
    dateTweetsIdRange () {
      return [
        this.dateTweets[0],
        this.dateTweets[this.dateTweets.length - 1]
      ].map(d => d.dateId)
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
    }, 20)
  }
}
</script>

<style>

</style>
