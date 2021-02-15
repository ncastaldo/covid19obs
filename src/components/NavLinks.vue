<template>
  <v-container>
    <v-row>
      <router-link
        v-for="(route, i) in routes"
        :key="i"
        active-class="active"
        exact
        :to="route.link"
      >
        <h2 class="route-title mx-4 thin-font">
          {{ route.title }}
        </h2>
      </router-link>
    </v-row>
  </v-container>
</template>

<script>
import { routes } from '../plugins/router'

export default {
  data () {
    return {
      routes
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;}

a .route-title{
  color: black;
}

a.active .route-title,
a:hover .route-title{
  color: rgb(31, 121, 179);
  text-decoration: underline;
}

</style>>
