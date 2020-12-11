<template>
  <div>
    <div class="d-flex align-center justify-center mb-4">
      <Flag
        flagId="ID"
        width="60"
        outlined
        class="mr-5"
      />
      <h1>
        Indonesia
      </h1>
    </div>
    <div>
      This note analyses the infodemic trends in Indonesia in the Jan - Nov 2020 period, with reference to Twitter posts in English only.
      <br>
      Our analysis cannot be considered representative of infodemic trends related to posts written in Bahasa Indonesia, but its methodology can be extended to multilingual domains with the help of native speaker local analysts. Such content targets the most cosmopolitan and best educated share of the Indonesian population. The infodemic profile might be very different in principle for contents in the local mother tongue.
      <br><br>
      <ul>
        <li>
          <b>Coverage level: <u>High</u></b><br>
          An average of more than 40,000 tweets per day. Between 22nd Jan and 16th Nov 2020: 10.6 million tweets with self-declared location associated with Indonesia, 1.6 million tweets contain URLs linking to news sources, of which 242,000 were successfully identified as either reliable or unreliable by crossing the URL domain with our database of news domain reliability, none of which were written in Bahasa Indonesia.
        </li>
        <br>
        <li>
          <b>Infodemic Risk: <u>Low - Decreasing</u></b><br>
          A low average IRI, measuring the infodemic risk from an exposure perspective (how many users are potentially exposed to unreliable news?) as 17%, a value which steadily dropped in time from 40% (January) to 11% (November).
          <br>
          A low - low/medium dynIRI, a measure of the infodemic risk from social media engagement (how many users are observed propagating unreliable news?), which for Indonesia fluctuates around an average of 25%, corresponding to the 39th percentile worldwide.
        </li>
      </ul>
      <br>
      The Infodemic in Indonesia is in line with most countries in South-Eastern Asia. The country has a low infodemic risk during the period of observation, and moreover that such risk declines as the pandemic aggravates. This does not imply that infodemic threats are not active, but only that the online conversation in English focuses upon relatively reliable and certified sources. Better understanding the nature and characteristics of existing infodemic threats may be useful to timely anticipate possible future infodemic bursts.
      <br>
      <PolicyText initial="true">
        The combination of high information flows and low risks makes of Indonesia a country whose current infodemic profile is not critical. However, infodemic risk has to be monitored constantly because the situation might change quickly in a turbulent period such as in the middle of a pandemic crisis.
      </PolicyText>
    </div>
    <div class="py-4 text-center">
      <v-btn
        href="/assets/reports/IDN_report.pdf"
        target="_blank"
      >
        Download Full Report
        <v-icon class="ml-2">
          mdi-download
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
