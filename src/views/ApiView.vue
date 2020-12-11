<template>
  <div>
    <NavLinks />
    <Article>
      <div class="text-center">
        <h1>API</h1>
        <h2 class="thin-font">
          API data download instructions
        </h2>
      </div>
      <div class="text-left">
        <div class="py-2">
          The observatory provides an <b>Application Program Interface (API)</b> to access our data and re-use it for third-party applications.
          <br>
          The endpoint for the API requires only to specify the ISO3 code of the country of interest and query the address:

          <div class="code">
            http://{{ host }}/assets/timeseries/[ISO3].csv
          </div>

          <br>
          <h4>Online download</h4>
          The first way to download the data is by <b>selecting</b> or <b>searching</b> the country of your interest in the form below. Upon selection, a link to the source will appear and you will be able to download the data.

          <div class="d-flex mt-2">
            <v-autocomplete
              v-model="value"
              class="text-center"
              label="Country"
              :items="apiLocations"
              item-value="locationId"
              item-text="locationName"
            />
            <v-spacer />
          </div>
          Download link: <b><a
            :show="link"
            :href="link"
            target="download"
          >{{ link }}</a></b>

          <br>
          <br>
          <h4>Usage with python</h4>

          This is a sample python3 script that can be used to download all the available infodemic data, in machine-readable format, about Italy:

          <div class="code">
            import urllib<br>
            import urllib.request<br>

            ISO3 = "ITA"<br>
            <br>
            url = 'http://{{ host }}/assets/timeseries/' + ISO3 + '.csv'
            <br>
            urllib.request.urlretrieve(url, 'infodemic_' + ISO3 + '.csv')
          </div>
          <br>
          <h4>Usage with cURL</h4>

          This is a sample bash script, based on cURL, that can be used to download all the available infodemic data, in machine-readable format, about Italy:
          <div class="code">
            #!/bin/bash<br>

            ISO3 = "ITA"<br>

            url = 'http://{{ host }}/assets/timeseries/' + ${ISO3} + '.csv'<br>

            curl -O ${url} > 'infodemic_' + ${ISO3} + '.csv')
            <div />
          </div>
        </div>
      </div>
    </Article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      host: location.host,
      value: null
    }
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations'
    }),
    apiLocations () {
      return this.locations.map(l => ({
        locationName: `${l.locationId} - ${l.locationName}`,
        locationId: l.locationId
      })).sort((a, b) => a.locationId > b.locationId ? 1 : -1)
    },
    link () {
      if (!this.value) return null
      return `http://${this.host}/assets/timeseries/${this.value}.csv`
    }
  }
}
</script>

<style scoped>

.code {
  padding: 8px;
  padding-left: 12px;
  margin-top:8px;
  margin-bottom: 8px;
  background: rgba(31, 121, 179, 0.1);
  font-family: "Courier New", Courier, monospace;
  word-break: break-all;
}

</style>
