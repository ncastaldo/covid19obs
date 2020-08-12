<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="pb-3"
      >
        <Compare />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Compare from '../components/Compare'

export default {
  components: {
    Compare
  }
}
</script>
