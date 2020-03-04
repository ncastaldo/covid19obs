<template>
  <v-card>
    <div class="pt-2">
      <b>{{ dateString }}</b>
    </div>
    <v-card-actions>
      <v-slider
        v-model="privateDateIndex"
        class="ma-0"
        :tick-labels="dates"
        min="0"
        label=""
        hide-details
        :max="dates.length - 1"
        step="1"
        tick-size="0"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { debounce } from 'lodash'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DateSlider',
  data () {
    return {
      privateDateIndex: 0
    }
  },
  computed: {
    ...mapGetters({
      dates: 'getDates',
      dateIndex: 'getDateIndex'
    }),
    dateString () {
      return this.dates[this.privateDateIndex].toLocaleDateString()
    }
  },
  watch: {
    privateDateIndex: debounce(function (value) {
      this.setDateIndex(value)
    }, 250)
  },
  mounted () {
    this.privateDateIndex = this.dateIndex
  },
  methods: {
    ...mapMutations({
      setDateIndex: 'setDateIndex'
    })
  }
}
</script>

<style scoped>

.v-input__slot {
  padding: 0
}

</style>
