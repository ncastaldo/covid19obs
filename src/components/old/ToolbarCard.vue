<template>
  <v-card class="pa-1">
    <v-row
      class="px-2"
      align="center"
    >
      <div class="title font-weight-light ml-2 px-2">
        Global tweets statistics:
      </div>
      <v-card
        v-for="l in labels"
        :key="l.id"
        class="my-1 pa-2 mx-2"
        flat
        outlined
      >
        <span>
          {{ l.name }}:
        </span>
        <span class="font-weight-bold">
          {{ l.value }}
        </span>
      </v-card>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      labels: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      fetch('/assets/general.json')
        .then(res => res.json())
        .then(data => { this.labels = data })
    }
  }
}
</script>

<style>

</style>
