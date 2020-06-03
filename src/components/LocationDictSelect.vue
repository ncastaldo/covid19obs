<template>
  <v-select
    v-model="locationInfoId"
    :items="locationInfos"
    item-text="name"
    item-value="id"
    hide-details
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      locationInfoId: null
    }
  },
  computed: {
    ...mapGetters({
      locationInfos: 'location/getLocationInfos',
      locationInfo: 'location/getLocationInfo'
    })
  },
  watch: {
    locationInfoId (value) {
      this.setLocationInfoId(value)
    }
  },
  created () {
    this.locationInfoId = this.locationInfos[0].id
  },
  methods: {
    ...mapActions({
      setLocationInfoId: 'location/setLocationInfoId'
    })
  }
}

</script>
