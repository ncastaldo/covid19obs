<template>
  <div id="app">
    <v-app>
      <Header />
      <Map />
      <TimeChart />
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header'
import Map from './components/Map'
import TimeChart from './components/TimeChart'

export default {
  name: 'App',
  components: {
    Header,
    Map,
    TimeChart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
