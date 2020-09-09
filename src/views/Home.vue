<template>
  <div>
    <Control />

    <v-container>
      <v-row>
        <v-col
          md="12"
          sm="12"
        >
          <Timeseries />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Control from '../components/Control'
import Timeseries from '../components/Timeseries'

export default {
  components: {
    Control,
    Timeseries
  }

}
</script>

<style>

.display__icon {
  width: 45px;
  text-align: center;
}

</style>
