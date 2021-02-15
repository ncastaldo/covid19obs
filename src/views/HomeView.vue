<template>
  <div>
    <HomeControl />
    <Timeseries />
  </div>
</template>

<script>

import HomeControl from '../components/HomeControl'
import Timeseries from '../components/Timeseries'

export default {
  components: {
    HomeControl,
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
