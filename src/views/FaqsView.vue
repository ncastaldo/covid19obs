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
      <div class="text-left py-2">
        <DropDownText>
          <template #question>
            What is the COVID-19 Infodemic Observatory?
          </template>
          <template #answer>
            It is an <b>interactive dashboard</b> where we present estimates of how much a country is potentially exposed to misinformation or disinformation about COVID-19, by estimating the <b>infodemic risk</b> as the online exposure to potentially misinformative messages by social media users on a given day in a specific country, and many other indices.
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            What are the indices of the COVID-19 Infodemic Observatory?
          </template>
          <template #answer>
            <ul>
              <li>
                <b>Infodemic Risk Index</b>, or <b>IRI</b> in short.<br>
                It is estimated indirectly on the basis of the number of followers of users who tweeted, retweeted or quoted unreliable news about COVID-19. The risk is calculated by comparing the maximal potential outreach of unreliable information against that of all news. If a misleading piece of information is shared by an influencer with a large number of followers, it will cause a great increment of the IRI.
              </li><li>
                <b>Dynamic Infodemic Risk Index</b>, or <b>Dynamic IRI</b>.<br>
                It is estimated directly from users' online endorsement and engagement to evaluate at which rate an user interacts with online messages pointing to potentially unreliable sources of misinformation or disinformation about COVID-19. The risk is calculated by counting the number of retweets and replies of unreliable news against that of all news. If a misleading piece of information is re-shared by a large number of users, it will cause a great increment of the Dynamic IRI.
              </li><li>
                <b>News Unreliability Indices</b>.<br>
                Characterize the relative volume of unreliable content with respect to the overall volume of messages pointing to sources of information. It shows what types of news about COVID-19 are produced in a country. The subdivision into reliable and unreliable news is further divided into: mainstream media, science, satire, clickbait, political, fake and conspiracy so that it is possible to investigate what categories of news are dominating the online discourse.
              </li><li>
                <b>Social Media Indices</b>.<br>
                <ul>
                  <li>
                    <u>Tweet types</u>. Messages posted in Twitter include both stand-alone messages (Tweets) and special social interactions encoding endorsement and engagement (Retweets, Replies). The total number of tweets of different types are indicators of how much in the country there is a tendency of actively creating content (higher number of Tweets) or of interacting around content (higher number of Retweets and Replies) when discussing about COVID-19.
                  </li><li>
                    <u>Local/Foreign</u>. Not all messages circulating, and successfully classified on our side, are using the local language. We therefore provide statistics over how many tweets in our analysis are written in one of the official languages of the country (Local) or another language (Foreign). A more accurate view on a country's infodemic is available when the fraction of local messages is high.
                  </li><li>
                    <u>Verified/Unverified</u>. Messages are also classified in terms of their originators. On Twitter, when an account is of public interest (e.g. the World Health Organization or the former President of the United States of America Barack Obama) it is actively Verified by Twitter. Conversely, unverified users instead can belong either to real people who publicly share their names (such as physicians, professors, students, so forth so on), anonymous accounts, or fictitious accounts which are potentially malicious (e.g., spreading false statements or engaging with real users sharing unreliable information). We report the fraction of messages by verified users in a country, as a healthy online discussion has preferably a high volume of messages from verified accounts.
                  </li>
                  <ul />
                </ul>
              </li>
            </ul>
          </template>
        </DropDownText>

        <DropDownText>
          <template #question>
            Can I trust these indicators? What is the Coverage level?
          </template>
          <template #answer>
            Our indicators are based on an automated large daily collection of Twitter messages. Our platform collects almost <b>5 million tweets every day</b>, among which about 2.5 million are correctly associated with a country through geo-localization techniques.

            The level of coverage – i.e. <i>the amount of messages that we collect at a given time in a given region</i> – varies from country to country.
            To facilitate the interpretation of what level of trust can be put into our measures for a specific country, we indicate with a dedicated icon/box the level of coverage of our database for that country.
            <br>
            We excluded from our dashboard all countries with <u>LOW COVERAGE</u>
            [<IndexCircles
              total="3"
              size="medium"
              active="1"
              color="rgb(31, 121, 179)"
            />], where, on average, we collect less than 100 messages per day.
            <br>
            We then assign a <u>GOOD COVERAGE</u> [<IndexCircles
              total="3"
              size="medium"
              active="2"
              color="rgb(31, 121, 179)"
            />] quality to countries with more than 100 messages/day and less than 1000 messages/day.
            <br>We assign a <u>HIGH COVERAGE</u> [<IndexCircles
              total="3"
              size="medium"
              active="3"
              color="rgb(31, 121, 179)"
            />] if the country has more than 1000 messages/day.
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            What is online engagement and how do you estimate it?
          </template>
          <template #answer>
            People engage with content and pieces of news they are interested in, find relevant and believe might be also relevant for their peers.
            <br>
            In a social media such as Twitter, the first form of engagement is <b>the action of fully reading the tweet</b>.
            Multiple messages are skimmed through a Twitter session but only a fraction of them are actually fully read and assimilated.
            For estimating how much people collectively engaged with a misinformative tweet, we would need to know how many views had in total that message.
            Since this information is not provided by Twitter, we use as a proxy <u>the total number of followers of the user</u> who sent the message.
            Although this largely over-estimates the total collective engagement, it is appropriate to evaluate the relative engagement of misinformative tweets we need to compute the Infodemic Risk Index.
            <br>
            A second, stronger, form of engagement is <b>the interaction with the tweet by liking, retweeting or quoting it</b>.
            This interactive engagement is what produces the Twitter discourse and propagates information through the social network.
            The Twitter Stream API does not provide us with information about likes, since we capture each tweet when it is written, and it has zero likes.
            We can however <u>track the number of retweets and replies</u>, which we use as a proxy for engagement in computing the Dynamic Infodemic Risk Index.
          </template>
        </DropDownText>

        <DropDownText>
          <template #question>
            How do you know if a tweet is sharing reliable information?
          </template>
          <template #answer>
            A large number of these messages contain links to news or other sources (e.g., Youtube videos) which we identify as reliable or unreliable thanks to a large database of almost 4,000 web domains we prepared by integrating nine independent sources – both of scientific and journalistic origin – that label different web domains in terms of news reliability and fact-checking. These web domains cover a significant fraction of the overall web traffic in 127 countries around the world, the ones we consider in the COVID-19 Infodemic Observatory.
            We homogenized these sources, identifying a source as <u>RELIABLE</u> if it is i) scientific, ii) governamental, or iii) a main-stream online news media with negligible political bias. A source is instead considered as potentially <u>UNRELIABLE</u> if it has a large political bias or it is known to spread satirical content, fake news or hoaxes, false narratives or conspiracy theories.
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            Can you make an example of news sources of the different categories?
          </template>
          <template #answer>
            We further distinguish classes of information sources into:

            <ul>
              <li>
                <b>Reliable.</b><br>
                <ul>
                  <li>
                    <u>MainStream Media:</u> recognized and politically unbiased mainstream media (<i>bbc.co.uk, nytimes.com, ...</i>)
                  </li>
                  <li>
                    <u>Science:</u> Recognized scientific sources (<i>who.int, cdc.gov, …</i>)
                  </li>
                </ul>
              </li>
              <li>
                <b>Unreliable</b><br>
                <ul>
                  <li>
                    <u>Satire:</u> using humour and irony to expose and criticize news (<i>cracked.com, ...</i>)
                  </li><li>
                    <u>Clickbait:</u> false advertisement designed to attract attention (<i>mirror.co.uk, ...</i>)
                  </li><li>
                    <u>Political:</u> known politically biased media (<i>vox.com, thesun.co.uk, ...</i>)
                  </li><li>
                    <u>Fake:</u> spreading fake news and hoaxes (<i>breitbart.com, ...</i>)
                  </li><li>
                    <u>Conspiracy:</u> spreading false narratives and conspiracy theories (<i>zerohedge.com, ...</i>)
                  </li>
                </ul>
              </li>
            </ul>
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            How do you collect all this information?
          </template>
          <template #answer>
            All social media data used here to estimate Infodemic Risk Indices and the News Unreliability Indices refer to messages posted in the popular microblogging platform Twitter. We use the <b>public Twitter API</b> to continuously collect tweets containing the words <i>coronavirus, ncov, #Wuhan, covid19, covid-19, sarscov2, covid</i>. This set of medically focused keywords and hashtags includes the different names of the sars-cov-2 virus and of the COVID-19 disease, including the early tentative ones, as well as the name of the city where the first cases were recorded. Collected data include stand-alone messages (Tweets) and special social interactions encoding endorsement and engagement (Retweets, Replies).
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            I have some concerns about privacy. Should I?
          </template>
          <template #answer>
            This platform aligns to the European Union privacy standards. Our data gathering and processing activities are <b>fully GDPR compliant</b>. The analysis involves:
            passive gathering of public Twitter data elaborate in aggregated form, compliant with the Twitter Terms of Service;
            crossing of the URLs contained in such data with public data registered on online databases that identify web domains as possible news sources;
            analysis of time-series obtained aggregating these data over countries where we have high coverage and consequently, very large user-bases, further ensuring k- anonymity privacy.

            Twitter is the only owner of the individual's data elaborated for the Research.
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            What are the epidemic indices?
          </template>
          <template #answer>
            In order to provide a full view on the COVID-19 infodemics, we also provide epidemiological information aggregated at country level by <a
              target="_blank"
              href="https://ourworldindata.org/"
            >https://ourworldindata.org/</a>
            The indicators are:
            <ul>
              <li>
                <b> Daily Cases</b>: the number of new cases of positivity to sars-cov-2 registered that day;
              </li>
              <li>
                <b>Daily Deaths</b>: the number of people deceased due to COVID-19 registered that day.
              </li>
            </ul>
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            How can knowing the Infodemic Risk be useful for me?
          </template>
          <template #answer>
            Our Infodemic Risk Indices provide a way of tracking how much users have been <b>potentially exposed to misinformative news</b> (IRI) and how much they <b>actively propagate potential misinformation</b> (dynIRI).
            These behaviors change over time during the evolution of the COVID-19 pandemic and vary strongly depending on the country.
            <br>
            Thanks to the mapping in time and space of these quantities, a member of the general public can <u>understand with how much care she can consume news from online media in her country</u>.
            At the same time, a decision maker can <u>track the infodemic profile</u> and be informed about what is the fraction of the population who are keeping themselves informed though official or scientific media and <u>identify moments in time when a burst of misinformation got diffused in the local news ecosystem</u>.
          </template>
        </DropDownText>
      </div>
    </Article>
  </div>
</template>

<script>
import DropDownText from '../components/DropDownText'

export default {
  components: {
    DropDownText
  }
}
</script>

<style>

</style>
