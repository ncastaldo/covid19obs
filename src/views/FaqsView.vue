<template>
  <div>
    <NavLinks />
    <Article>
      <div class="text-center">
        <h1>FAQs</h1>
        <h2 class="thin-font">
          Frequently Asked Questions
        </h2>
      </div>
      <div class="text-justify">
        <div class="py-2">
          <b>What is the COVID-19 Infodemic Observatory?</b>
          <br>
          It is an interactive dashboard where we present estimates of how much a country is potentially exposed to misinformation or disinformation about COVID-19, by estimating the infodemic risk as the online exposure to potentially misinformative messages by social media users on a given day in a specific country, and many other indices.
        </div>
        <div class="py-2">
          <b>What are the indices of the COVID-19 Infodemic Observatory?</b>
          <ul>
            <li>
              <u>Infodemic Risk Index, or IRI in short.</u><br>
              It is estimated indirectly on the basis of the number of followers of users who tweeted, retweeted or quoted unreliable news about COVID-19. The risk is calculated by comparing the maximal potential outreach of unreliable information against that of all news. If a misleading piece of information is shared by an influencer with a large number of followers, it will cause a great increment of the IRI.
            </li><li>
              <u>Dynamic Infodemic Risk Index, or Dynamic IRI.</u><br>
              It is estimated directly from users' online endorsement and engagement to evaluate at which rate an user interacts with online messages pointing to potentially unreliable sources of misinformation or disinformation about COVID-19. The risk is calculated by counting the number of retweets and replies of unreliable news against that of all news. If a misleading piece of information is re-shared by a large number of users, it will cause a great increment of the Dynamic IRI.
            </li><li>
              <u>News Unreliability Indices.</u><br>
              Characterize the relative volume of unreliable content with respect to the overall volume of messages pointing to sources of information. It shows what types of news about COVID-19 are produced in a country. The subdivision into reliable and unreliable news is further divided into: mainstream media, science, satire, clickbait, political, fake and conspiracy so that it is possible to investigate what categories of news are dominating the online discourse.
            </li><li>
              <u>Social Media Indices.</u><br>
              <ul>
                <li>
                  <i>Tweet types. </i>Messages posted in Twitter include both stand-alone messages (Tweets) and special social interactions encoding endorsement and engagement (Retweets, Replies). The total number of tweets of different types are indicators of how much in the country there is a tendency of actively creating content (higher number of Tweets) or of interacting around content (higher number of Retweets and Replies) when discussing about COVID-19.
                </li><li>
                  <i>Local/Foreign. </i>Not all messages circulating, and successfully classified on our side, are using the local language. We therefore provide statistics over how many tweets in our analysis are written in one of the official languages of the country (Local) or another language (Foreign). A more accurate view on a country's infodemic is available when the fraction of local messages is high.
                </li><li>
                  <i>Verified/Unverified. </i>Messages are also classified in terms of their originators. On Twitter, when an account is of public interest (e.g. the World Health Organization or the former President of the United States of America Barack Obama) it is actively Verified by Twitter. Conversely, unverified users instead can belong either to real people who publicly share their names (such as physicians, professors, students, so forth so on), anonymous accounts, or fictitious accounts which are potentially malicious (e.g., spreading false statements or engaging with real users sharing unreliable information). We report the fraction of messages by verified users in a country, as a healthy online discussion has preferably a high volume of messages from verified accounts.
                </li>
                <ul />
              </ul>
            </li>
          </ul>
        </div>
        <div class="py-2">
          <b>When is a country at high infodemic risk?</b>
          <br>

          The Infodemic Risk Index (IRI) ranges between 0 (Lowest Risk) to 1 (Highest Risk), with intermediate cases:

          Low Risk: IRI between 0 and 0.25
          Low/Medium Risk: IRI between 0.26 and 0.5
          Medium/High Risk: IRI between 0.51 and 0.75
          High Risk: IRI between 0.76 and 1

          For instance, in a region with high IRI users will have a chance larger than 75% of reading a tweet linking to a news source with potentially misleading information about COVID-19.
        </div>
        <div class="py-2">
          <b>Why two infodemic risk indices and what does it mean for a country to have a high infodemic risk?
          </b>
          <br>

          The two indices provide two opposite perspectives on the spreading of the infodemics. The IRI focuses on the production of misinformation while the Dynamic IRI on the engagement associated with it. A high value or IRI means that potential misinformation is being transmitted by a number of highly relevant accounts, and the infodemics can be potentially reduced by targeting those influencers (infodemic equivalent of quarantine). A high value of Dynamic IRI means that a large number of users are interacting and retransmitting the potential misinformative content, and the infodemic can be potentially reduced by increasing awareness of all users on the importance of carefully checking the sources and selective re-posting behavior (infodemic equivalent of wearing a mask).
        </div>
        <div class="py-2">
          <b>Can I trust these indicators? What is the Coverage level?</b>
          <br>

          Our indicators are based on an automated large daily collection of Twitter messages. Our platform collects almost 5 million tweets every day, among which about 2.5 million are correctly associated with a country through geo-localization techniques.

          The level of coverage – i.e. the amount of messages that we collect at a given time in a given region – varies from country to country.
          To facilitate the interpretation of what level of trust can be put into our measures for a specific country, we indicate with a dedicated icon/box the level of coverage of our database for that country.
          We excluded from our dashboard all countries with LOW COVERAGE, where, on average, we collect less than 100 messages per day. We then assign a GOOD COVERAGE quality to countries with more than 100 messages/day and less than 1000 messages/day. We assign a HIGH COVERAGE icon if the country has more than 1000 messages/day.
        </div>
        <div class="py-2">
          <b>How do you know if a tweet is sharing reliable information?</b>
          <br>

          A large number of these messages contain links to news or other sources (e.g., Youtube videos) which we identify as reliable or unreliable thanks to a large database of almost 4,000 web domains we prepared by integrating nine independent sources – both of scientific and journalistic origin – that label different web domains in terms of news reliability and fact-checking. These web domains cover a significant fraction of the overall web traffic in 127 countries around the world, the ones we consider in the COVID-19 Infodemic Observatory.
          We homogenized these sources, identifying a source as RELIABLE if it is i) scientific, ii) governamental, or iii) a main-stream online news media with negligible political bias. A source is instead considered as potentially UNRELIABLE if it has a large political bias or it is known to spread satirical content, fake news or hoaxes, false narratives or conspiracy theories.
        </div>
        <div class="py-2">
          <b>
            Can you make an example of news sources of the different categories?
          </b>
          <br>
          We further distinguish classes of information sources into:

          - Reliable
          MainStream Media: recognized and politically unbiased mainstream media (bbc.co.uk, nytimes.com, ...)
          Science: Recognized scientific sources (who.int, cdc.gov, …)

          - Unreliable,
          Satire: using humour and irony to expose and criticize news (cracked.com,...)
          Clickbait: false advertisement designed to attract attention (mirror.co.uk,...)
          Political: known politically biased media (vox.com, thesun.co.uk,...)
          Fake: spreading fake news and hoaxes (breitbart.com,...)
          Conspiracy: spreading false narratives and conspiracy theories (zerohedge.com)
        </div><div class="py-2">
          <b>How do you collect all this information?</b>
          All social media data used here to estimate Infodemic Risk Indices and the News Unreliability Indices refer to messages posted in the popular microblogging platform Twitter. We use the public Twitter API to continuously collect tweets containing the words coronavirus, ncov, #Wuhan, covid19, covid-19, sarscov2, covid. This set of medically focused keywords and hashtags includes the different names of the sars-cov-2 virus and of the COVID-19 disease, including the early tentative ones, as well as the name of the city where the first cases were recorded. Collected data include stand-alone messages (Tweets) and special social interactions encoding endorsement and engagement (Retweets, Replies).
        </div><div class="py-2">
          <b>I have some concerns about privacy. Should I?</b>
          <br>
          This platform aligns to the European Union privacy standards. Our data gathering and processing activities are fully GDPR compliant. The analysis involves:
          passive gathering of public Twitter data elaborate in aggregated form, compliant with the Twitter Terms of Service;
          crossing of the URLs contained in such data with public data registered on online databases that identify web domains as possible news sources;
          analysis of time-series obtained aggregating these data over countries where we have high coverage and consequently, very large user-bases, further ensuring k- anonymity privacy.

          Twitter is the only owner of the individual's data elaborated for the Research.
        </div><div class="py-2">
          <b>What are the epidemic indices?</b>
          <br>
          In order to provide a full view on the COVID-19 infodemics, we also provide epidemiological information aggregated at country level by https://ourworldindata.org/
          The indicators are:
          Daily Cases: the number of new cases of positivity to sars-cov-2 registered that day;
          Daily Deaths: the number of people deceased due to COVID-19 registered that day.
        </div>
      </div>
    </Article>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
