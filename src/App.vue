<template>
  <v-app
    id="app"
  >
    <!--Header /-->
    <Content />
    <!--TimeChart /-->
  </v-app>
</template>

<script>
import Content from './components/Content'

export default {
  name: 'App',
  components: {
    // Header,
    Content
    // TimeChart
  }
}
</script>

<style>
body {
    overflow: hidden;
    height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;/*
  margin-top: 60px;*/
}
</style>
