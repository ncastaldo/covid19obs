<template>
  <v-card>
    <v-card-title>
      Table
    </v-card-title>
    <v-divider class="pb-1" />
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="items"
      :items-per-page="5"
    />
  </v-card>
</template>

<script>

import { dsvFormat } from 'd3-dsv'

const filePath = '/assets/table/table.csv'

const fnDataParser = dsvFormat(';')

export default {
  data () {
    return {
      headers: [],
      items: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      fetch(filePath)
        .then(res => res.text())
        .then(data => {
          this.items = fnDataParser.parse(data)
          this.headers = this.items.columns.map(c => ({
            align: 'left',
            text: c,
            value: c,
            width: 200
          }))
        })
        .catch(e => { console.log(`NO file found at ${filePath}`) })
    }
  }
}
</script>

<style scoped>

</style>
