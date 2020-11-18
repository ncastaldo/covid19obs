<template>
  <DateBrushChart
    id="date-range-brush"
    :height="120"
    :dateData="dateTweets"
    :bandDomain="bandDomain"
    :config="config"
    @endBandDomain="onEndBandDomain"
  />
</template>

<script>
import DateBrushChart from '../graphics/DateBrushChart'
import { mapGetters, mapActions } from 'vuex'

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
    ...mapActions({
      setDateIdRange: 'period/setDateIdRange'
    }),
    onEndBandDomain (bd) {
      console.log(bd)
      this.setDateIdRange(bd || this.dateTweetsIdRange)
    }
  }
}
</script>

<style>

</style>
