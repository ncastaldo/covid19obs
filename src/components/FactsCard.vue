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
      disable-sort
      mobile-breakpoint="0"
      :items-per-page="5"
      :footer-props="{
        'items-per-page-options': [5, 10, 20]
      }"
      @mouseover:row="onMouseover"
    >
      <template v-slot:item.title="{ item }">
        <span class="pr-1">
          {{ item.title }}
        </span>
        <span>
          <a
            :href="item.url"
            target="_blank"
          >
            Link
          </a>
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

const headers = [
  {
    value: 'rank',
    text: 'Rank',
    width: 80
  },
  {
    value: 'count',
    text: 'Tweets',
    width: 100
  },
  {
    value: 'domain',
    text: 'Domain',
    width: 100
  },
  {
    value: 'title',
    text: 'Title [if available]',
    width: 300
  }
]

export default {
  data () {
    return {
      headers: headers
    }
  },
  computed: {
    ...mapGetters({
      factTable: 'getFactTable'
    })
  },
  methods: {
    onMouseover (e) {
      console.log('a', e)
    }
  }
}
</script>
