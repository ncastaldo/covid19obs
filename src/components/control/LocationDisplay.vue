<template>
  <span class="headline">
    <span class="font-italic font-weight-light">Location > </span>
    {{ location.locationName }}
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      location: 'getLocation'
    })
  }
}
</script>

<style>

</style>
