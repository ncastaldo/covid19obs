<template>
  <v-card>
    <v-card-title>
      Top countries infodemic summary
    </v-card-title>
    <v-divider class="pb-1" />
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :footer-props="{
        'items-per-page-options': [5, 10, 20]
      }"
    />
  </v-card>
</template>

<script>

import { dsvFormat } from 'd3-dsv'

const filePath = '/assets/table/country_infodemics_summary_top.csv'

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
          this.headers = this.items.columns.map((c, i) => ({
            align: 'left',
            text: c,
            value: c,
            width: i === 0 ? 80 : 140
          }))
        })
        .catch(e => { console.log(`NO file found at ${filePath}`) })
    }
  }
}
</script>

<style scoped>

</style>
