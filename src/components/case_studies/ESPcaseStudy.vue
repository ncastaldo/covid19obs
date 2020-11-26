<template>
  <div>
    <div class="d-flex align-center justify-center mb-4">
      <Flag
        flagId="ES"
        width="60"
        outlined
        class="mr-5"
      />
      <h1>
        Spain
      </h1>
    </div>
    <div>
      This note analyses the infodemic trends in Spain in the Jan - Nov 2020 period.
      <br>
      Our analysis provides a comprehensive view of the infodemic trends related to posts written in both local and foreign languages in the country territory as about 72% of tweets are written in Spanish. The infodemic profile might be very different in principle for contents in the local mother tongue and in the foreign language.
      <br>
      <br>
      <ul>
        <li>
          <b>Coverage level: <u>High</u></b><br>
          An average of more than 90,000 tweets per day. Between 22nd Jan and 23rd Nov 2020: 24.5 million tweets with self-declared location associated with Spain, 4.3 million tweets contain URLs linking to news sources, of which 1,170,000 were successfully identified as either reliable or unreliable by crossing the URL domain with our database of news domain reliability, 848,000 of which were written in Spanish.
        </li>
        <br>
        <li>
          <b>Infodemic Risk: <u>Low</u></b><br>
          A low (6%) current and average value of IRI during the period considered. The infodemic risk from an exposure perspective (how many users are potentially exposed to unreliable news?) initially grew in time up to a level of 4% (February) and then grew up to 7% (April) and then stabilized  to the current value of 6% (November).
          <br>
          A low/medium dynIRI, a measure of the infodemic risk from social media engagement (how many users are observed propagating unreliable news?), which for Spain fluctuates around an average of 26%, corresponding to the 51th percentile worldwide.
        </li>
      </ul>
      <br>
      Together with Italy, Spain represents the positive example of Southern Europe. The country has a low infodemic risk in the period of observation, created largely by influential verified accounts that are widely endorsed by the twitter user base, as is suggested by the higher value of dynIRI.
      <br>
      <br>
      <PolicyText>
        The combination of high information flows and low risks makes Spain an exemplary country whose current infodemic profile is not critical. The most outstanding criticality is the ample credit given to influential verified accounts that could negatively influence the overall level of infodemic risk despite the fact that it has remained constantly low so far.
      </PolicyText>
    </div>
    <div class="py-4 text-center">
      <v-btn
        href="/assets/reports/ESP_report.pdf"
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
