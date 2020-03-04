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
        @mouseup="() => updateIndex(privateDateIndex)"
        @end="updateIndex"
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
  mounted () {
    this.privateDateIndex = this.dateIndex
  },
  methods: {
    ...mapMutations({
      setDateIndex: 'setDateIndex'
    }),
    updateIndex (value) {
      this.setDateIndex(this.privateDateIndex)
    }
  }
}
</script>

<style scoped>

.v-input__slot {
  padding: 0
}

</style>
