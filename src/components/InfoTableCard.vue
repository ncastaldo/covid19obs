<template>
  <v-card>
    <v-card-title>
      Top Countries Infodemic Summary
    </v-card-title>
    <v-divider class="pb-1" />
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="items"
      mobile-breakpoint="0"
      :items-per-page="5"
      :footer-props="{
        'items-per-page-options': [5, 10, 20]
      }"
    />
  </v-card>
</template>

<script>

import { dsvFormat } from 'd3-dsv'

const filePath = '/assets/table/infodemic_table.csv'
const headers = [
  {
    value: 'rank',
    text: 'Rank',
    width: 80
  },
  {
    value: 'country',
    text: 'Country',
    width: 170
  },
  {
    value: 'tweets_day',
    text: 'Avg. tweets/day',
    width: 160
  },
  {
    value: 'risk_index',
    text: 'Risk index',
    width: 150
  },
  {
    value: 'reliability',
    text: 'Native reliability',
    width: 160
  },
  {
    value: 'reliability_exposure',
    text: 'Exposure reliable news',
    width: 190
  },
  {
    value: 'bot_unverified',
    text: 'Unv. bot pollution',
    width: 160
  }
]

const fnDataParser = dsvFormat(',')

export default {
  data () {
    return {
      headers: headers,
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
        })
        .catch(e => { console.log(`NO file found at ${filePath}`) })
    }
  }
}
</script>

<style scoped>

</style>
