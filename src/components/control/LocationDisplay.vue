<template>
  <div class="d-flex align-center py-2">
    <div class="display__icon pr-3">
      <img :src="flagUrl">
    </div>
    <h2>{{ location.locationName }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const fnFlagUrl = id => `https://flagcdn.com/32x24/${id.toLowerCase()}.png`
// const fnFlagUrl = id => `https://www.countryflags.io/${id}/flat/64.png`

export default {
  computed: {
    ...mapGetters({
      location: 'location/getLocation'
    }),
    flagUrl () {
      return this.location && this.location.flagId && this.location.flagId !== '-99'
        ? fnFlagUrl(this.location.flagId)
        : null
    }
  }
}
</script>

<style scoped>

/*img {
  border: 1px solid #000;
}*/

</style>
