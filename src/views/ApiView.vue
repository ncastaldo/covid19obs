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
      <div class="text-justify">
        <div class="py-2">
          The observatory provides an <b>Application Program Interface (API)</b> to access our data and re-use it for third-party applications.
          <br>
          The endpoint for the API requires only to specify the ISO3 code of the country of interest and query the address:

          <div class="code">
            https://tycho.fbk.eu/assets/timeseries/[ISO3].csv
          </div>
          <br>
          <h4>Usage with python</h4>

          This is a sample python3 script that can be used to download all the available infodemic data, in machine-readable format, about Italy:

          <div class="code">
            import urllib<br>
            import urllib.request<br>

            ISO3 = "ITA"<br>
            <br>
            url = 'https://tycho.fbk.eu/assets/timeseries/' + ISO3 + '.csv'
            <br>
            urllib.request.urlretrieve(url, 'infodemic_' + ISO3 + '.csv')
          </div>
          <br>
          <h4>Usage with cURL</h4>

          This is a sample bash script, based on cURL, that can be used to download all the available infodemic data, in machine-readable format, about Italy:
          <div class="code">
            #!/bin/bash<br>

            ISO3 = "ITA"<br>

            url = 'https://tycho.fbk.eu/assets/timeseries/' + ${ISO3} + '.csv'<br>

            curl -O ${url} > 'infodemic_' + ${ISO3} + '.csv')
            <div />
          </div>
        </div>
      </div>
    </Article>
  </div>
</template>

<script>
export default {

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
}

</style>
