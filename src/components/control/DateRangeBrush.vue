<template>
  <DateBrushChart
    id="date-range-brush"
    :height="120"
    :periodData="dateTweets"
    :bandDomain="dateIdRange"
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
        bandMaxStep: 2,
        color: 'rgb(31, 121, 179)',
        formatType: '~s'
      }
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
