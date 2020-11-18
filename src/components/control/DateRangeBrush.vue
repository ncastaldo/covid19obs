<template>
  <DateBrushChart
    id="date-range-brush"
    :height="120"
    :dateData="dateTweets"
    :bandDomain="bandDomain"
    :config="config"
    @endBandDomain="setDateIdRange"
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
        bandMinStep: 0,
        bandMaxStep: 10000,
        color: 'rgb(31, 121, 179)',
        formatType: '~s'
      }
    },
    bandDomain () {
      return [
        Math.max(this.dateIdRange[0], this.dateTweets[0].dateId),
        Math.max(this.dateIdRange[1], this.dateTweets[1].dateId)
      ]
    }
  },
  methods: {
    ...mapActions({
      setDateIdRange: 'period/setDateIdRange'
    })
  }
}
</script>

<style>

</style>
