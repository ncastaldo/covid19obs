<template>
  <v-card>
    <v-card-title>
      Top 20 Potentially Ureliable News
    </v-card-title>
    <v-divider class="pb-1" />
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="factTable"
      mobile-breakpoint="0"
      :items-per-page="5"
      :footer-props="{
        'items-per-page-options': [5, 10, 20]
      }"
    >
      <template v-slot:item.url="{ item }">
        <span><a
          :href="item.url"
          target="_blank"
        >{{ item.url }}</a></span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      headers: ['Rank', 'Tweets', 'Domain', 'URL'].map((c, i) => ({
        align: 'left',
        text: c,
        value: ['rank', 'count', 'domain', 'url'][i],
        width: [80, 100, 160, 400][i]
      }))
    }
  },
  computed: {
    ...mapGetters({
      factTable: 'getFactTable'
    })
  }
}
</script>
