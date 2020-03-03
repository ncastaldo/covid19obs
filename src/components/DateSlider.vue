<template>
  <v-card>
    <div class="pt-2">
      <b>{{ dateString }}</b>
    </div>
    <v-card-actions>
      <v-slider
        class="ma-0"
        :tick-labels="dates"
        min="0"
        label=""
        hide-details
        :max="dates.length - 1"
        step="1"
        tick-size="0"
        @end="onEnd"
        @input="onInput"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
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
    dateIndex (value) {
      this.privateDateIndex = value
    }
  },
  methods: {
    ...mapMutations({
      setDateIndex: 'setDateIndex'
    }),
    onInput (value) {
      this.privateDateIndex = value
    },
    onEnd (value) {
      this.setDateIndex(value)
    }
  }
}
</script>

<style scoped>

.v-input__slot {
  padding: 0
}

</style>
