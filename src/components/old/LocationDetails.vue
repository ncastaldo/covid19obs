<template>
  <div class="title">
    <span class="pr-3 font-weight-bold">{{ locationName }}</span>
    <span class="pr-3 font-weight-light">{{ locationValue }}</span>
  </div>
</template>

<script>
import { format } from 'd3-format'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getLocationById: 'getLocationById',
      locationFocus: 'location/getLocationFocus',
      locationInfo: 'location/getLocationInfo',
      locationMapping: 'location/getLocationMapping'
    }),
    fnFormat () {
      const f = 'detailsFormat' in this.locationInfo
        ? this.locationInfo.detailsFormat
        : this.locationInfo.format
      return format(f)
    },
    locationName () {
      return this.locationFocus
        ? this.getLocationById(this.locationFocus.locationId).locationName
        : ''
    },
    locationValue () {
      if (!this.locationFocus) { return '' }
      const fallback = this.locationInfo.fallback
      const id = this.locationFocus && this.locationFocus.locationId
        ? this.locationFocus.locationId
        : null
      return id in this.locationMapping && this.locationMapping[id].value !== null
        ? this.fnFormat(this.locationMapping[id].value)
        : fallback
    }
  }
}
</script>

<style>

</style>
