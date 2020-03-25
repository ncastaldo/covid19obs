<template>
  <v-row
    align="center"
  >
    <v-col class="flex-grow-1 mx-2">
      <v-row align="center">
        <v-btn
          icon
          class="mr-2"
          @click="onPlayClick"
        >
          <v-icon>{{ playIcon }}</v-icon>
        </v-btn>
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
          @mousedown="stopInterval"
        />
      </v-row>
    </v-col>
    <v-col class="flex-grow-0 mx-2">
      <div class="subtitle font-weight-light">
        {{ dateString }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { debounce } from 'lodash'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DateSlider',
  data () {
    return {
      privateDateIndex: 0,
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      dates: 'getDates',
      dateIndex: 'getDateIndex'
    }),
    dateString () {
      return this.dates[this.privateDateIndex].toLocaleDateString()
    },
    playIcon () {
      return this.interval
        ? 'mdi-pause'
        : this.privateDateIndex >= this.dates.length - 1
          ? 'mdi-restart'
          : 'mdi-play'
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
    }),
    onPlayClick () {
      this.interval ? this.stopInterval() : this.startInterval()
    },
    startInterval () {
      if (this.privateDateIndex >= this.dates.length - 1) {
        this.privateDateIndex = 0
      }
      this.interval = setInterval(() => this.moveDateIndex(), 500)
    },
    stopInterval: function () {
      this.interval && clearInterval(this.interval)
      this.interval = null
    },
    moveDateIndex () {
      this.privateDateIndex += 1
      this.privateDateIndex >= this.dates.length - 1 && this.stopInterval()
    }
  }
}
</script>

<style scoped>

.v-input__slot {
  padding: 0
}

</style>
