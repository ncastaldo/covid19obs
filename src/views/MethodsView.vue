<template>
  <div>
    <Article>
      <div class="text-center">
        <h1>Methods</h1>
        <h2 class="thin-font" />
      </div>
      <div class="text-left">
        <DropDownText>
          <template #question>
            Data Collection
          </template>
          <template #answer>
            We followed a methodology for collecting social media data consolidated over the years.
            We focused on <b>Twitter</b>, which is well-known for providing access to publicly available messages upon specific requests through their application programming interface (API).
            <br>
            We identified a set of <i>hashtags</i> and <i>keywords</i> gaining collective attention since the first recorded cases of COVID-19, namely:
            <ul>
              <i>
                <li>coronavirus</li>
                <li>ncov</li>
                <li>#Wuhan</li>
                <li>covid19</li>
                <li>covid-19</li>
                <li>sarscov2</li>
                <li>covid</li>
              </i>
            </ul>
            This set includes the official name of the virus and the disease, including the early tentative ones, as well as the name of the city where the first cases of COVID-19 were recorded.
            We estimate the recall rate for these keywords to be higher than 16% and probably in the 40%-60% range at the time of recording.
            <div class="py-1" />
            We used the Filter API to collect the data in real time, and aggregate the results daily.
            Our choice allowed us to monitor, without interruptions and regardless of the language, all the tweets posted about COVID-19 since <i>22 January 2020</i>, when China reported more than 6,000 cases, calling for the attention of the international community.
            <div class="py-1" />
            The Stream API has the advantage of providing all the messages satisfying our selection criteria and posted to the platform in the period of observation, provided that their volume is not larger than 1% of the overall – unfiltered – volume of posted messages.
            Above 1% of the overall flow of information, the Filter API provides a sample of filtered tweets and communicates an estimate of the number of lost messages.
            Note that this choice is the most reliable to date: in fact, it was recently shown that biases affecting Sample API (which samples data based on rate limits), for instance, are not found in REST and Filter APIs.
            <br>
            We estimate that until <i>24 Feb 2020</i> we lost approximately 60,000 tweets out of millions, capturing more than 99.5% of all messages posted.
            The global attention towards COVID-19 increased the volume of messages after 25 Feb 2020: however, Twitter restrictions allowed us to get no more than 4.5 million messages per day, on average.
            In total, we have collected between January and October 2020 more than billion tweets.
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            Geocoding
          </template>
          <template #answer>
            The <i>user’s self-declared location field</i> was used for geocoding with <i>ArcGIS API</i>.
            For approximately 56% of users we had a response in terms of latitude and longitude.
            <div class="py-1" />
            A large portion, about 10% of these answers were however associated with a small number (~1600) of wrongly attributed locations that were removed.
            These errors were mostly caused by the use of non-toponyms in the location field such as "<i>Home</i>" or "<i>Somewhere</i>", or other pieces of information (Instagram, Website URLs, …), which were wrongly associated with real locations.
            We identified these errors by isolating single locations associated with a large number of different unique user-defined location strings.
            Finally, we also filtered out names of continents that were correctly geocoded but do not match the country-based granularity we set for our analysis.
            The reliability of our method was tested by comparing geocoded and georeferenced data for the USA.
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            Source Reliability Rating
          </template>
          <template #answer>
            We collected <i>manually checked web domains</i> from multiple publicly available databases, including scientific and journalistic ones.
            <br>
            Specifically, we considered data shared by the sources listed in:
            <ul>
              <div class="pt-1" />
              <li>
                <i>Zimdar, M. My fake news list went viral but made up stories are only part of the problem.</i>
                <br>The Washington Post
                [ <a
                  target="_blank"
                  href="https://www.washingtonpost.com/posteverything/wp/2016/11/18/my-fake-news-list-went-viral-but-made-up-stories-are-only-part-of-the-problem"
                >Link</a> ]
                (18 November 2016)
              </li>
              <div class="pt-1" />
              <li>
                <i>Silverman, C. Inside the partisan fight for your news feed.</i>
                <br>BuzzFeed News
                [ <a
                  target="_blank"
                  href="https://www.buzzfeednews.com/article/craigsilverman/inside-the-partisan-fight-for-your-news-feed"
                >Link</a> ]
                (8 August 2017)
              </li>
              <div class="pt-1" />
              <li>
                <i>Fake News Watch</i>
                <br>
                [ <a
                  target="_blank"
                  href="https://web.archive.org/web/20180213181029/http://www.fakenewswatch.com/"
                >Link</a> ]
                (2015)
              </li>
              <div class="pt-1" />
              <li>
                <i>Politifacts guide to fake news and what they peddle.</i>
                <br>
                Politifacts.com.
                [ <a
                  target="_blank"
                  href="https://www.politifact.com/article/2017/apr/20/politifacts-guide-fake-news-websites-and-what-they/"
                >Link</a> ]
                (20 April 2017)
              </li>
              <div class="pt-1" />
              <li>
                <i>The black list. La lista nera del web.</i>
                <br>
                Bufale.net
                [ <a
                  target="_blank"
                  href="https://www.bufale.net/the-black-list-la-lista-nera-del-web/"
                >Link</a> ]
                (2018)
              </li>
              <div class="pt-1" />
              <li>
                <i>Starbird, K. et al. Ecosystem or echo-system?
                  Exploring content sharing across alternative media domains.</i>
                <br>
                In 12th International AAAI Conference on Web and Social Media 365–374
                (AAAI, 2018)
              </li>
              <div class="pt-1" />
              <li>
                <i>Fletcher, R. et al. Measuring the Reach of ‘Fake News’ and Online Disinformation in Europe</i>
                <br>
                [ <a
                  target="_blank"
                  href="https://reutersinstitute.politics.ox.ac.uk/our-research/measuring-reach-fake-news-and-online-disinformation-europe"
                >Link</a> ]
                (Reuters Institute, 2018)
              </li>
              <div class="pt-1" />
              <li>
                <i>Grinberg, N. et al. Fake news on Twitter during the 2016 US presidential election.</i>
                <br>
                Science 363, 374–378 (2019).
              </li>
              <div class="pt-1" />
              <li>
                <i>MediaBiasFactCheck</i>
                <br>
                [ <a
                  target="_blank"
                  href="https://mediabiasfactcheck.com"
                >Link</a> ]
                (2020)
              </li>
              <div class="pt-1" />
            </ul>
            We found a total of 4,988 domains, reduced to 4,417 after removing hard duplicates across databases.
            Note that a domain is considered a hard duplicate if its name and its classification coincide across databases.
            <div class="py-1" />
            A second level of filtering was applied to domains which are classified differently across databases (e.g., xyz.com might be classified as FAKE/HOAX in a database and as SATIRE in another database).
            To deal with these cases, we adopted our own classification method, by assigning to each category a “<i>Harm Score</i>” between 1 and 9.
            <br>
            When two or more domains were soft duplicates, we kept the classification with the highest Harm Score, as a conservative choice.
            This phase of processing reduced the overall database to 3,920 unique domains.
            <div class="py-1" />
            The Harm Score classifies sources in terms of their potential contribution to the manipulative and mis-informative character of an infodemic.
            As a general principle, <i>the more systematic and intentionally harmful the knowledge manipulation and data fabrication, the higher the Harm Score (HS).</i>
            <div class="py-1" />
            <ul>
              <li>
                <b>SCIENTIFIC</b> content has the lowest level of HS due to the rigorous process of validation carried out through scientific methods.
              </li><div class="pt-1" />
              <li>
                <b>MAINSTREAM MEDIA</b> content has the second lowest level of HS due to its constant scrutiny in terms of fact checking and media accountability.
              </li><div class="pt-1" />
              <li>
                <b>SATIRE</b> is an unreliable source of news, but due to its explicit goal of distorting or mis-representing information according to specific cultural codes of humor and social critique, is generally identified with ease as an unreliable source.
              </li><div class="pt-1" />
              <li>
                <b>CLICKBAIT</b> is a more dangerous source (and thus ranking higher in HS) due to its intent to pass fabricated or mis-represented information and facts for true, with the main purpose of attracting attention and online traffic, that is, for mostly commercial purposes, but without a clear ideological intent.
              </li><div class="pt-1" />
              <li>
                <b>OTHER</b> is a general-purpose category that contains diverse forms of (possibly) misleading or fabricated content, not easily classifiable but likely including bits of ideologically characterized content pursuing systematic goals of social manipulation, and thus ranking higher in HS.
              </li><div class="pt-1" />
              <li>
                <b>SHADOW</b> is a similar category to the previous one, where in addition links are anonymized and often temporary (e.g. bit.ly, dlvr.it,...) , thereby adding an extra element of unaccountability and manipulation that translates into a higher level of HS. Known vanity URL shorteners such usnyti.ms for the New York Times wpo.st for the Washington Post are automatically associated with the source.
              </li><div class="pt-1" />
              <li>
                <b>POLITICAL</b> is a category where we find an ample spectrum of content with varying levels of distortion and manipulation of information, also including mere selective reporting and omission, whose goal is that of building consensus on a polarized political position against others, and therefore directly aiming at conditioning the public discourse and opinion making, with a comparatively higher level of HS with respect to the previous categories. The majority of web domains listed in this category overlaps with ‘left’ and ‘right’ categories as defined by the MediaBiasFactCheck source, while domains labelled as left-center and right-center are considered as MAINSTREAM MEDIA.
              </li><div class="pt-1" />
              <li>
                <b>FAKE/HOAX</b> contains entirely manipulated or fabricated inflammatory content which is intended to be perceived as realistic and reliable and whose goal may also be political but fails to meet the basic rules of plausibility and accountability, thus reaching an even higher level of HS.
              </li><div class="pt-1" />
              <li>
                Finally, the highest level of HS is associated to <b>CONSPIRACY/JUNKSCI</b>, that is, to strongly ideological, inflammatory content that aims at building conceptual paradigms that are entirely alternative and oppositional to tested and accountable knowledge and information, with the intent of building self-referential bubbles where fidelized audiences are simply refusing a priori any kind of knowledge or information that is not legitimized by the alternative source itself or by recognized affiliates, as it is typical in sects of religious or other nature.
              </li>
            </ul>
            <div class="py-1" />
            A third level of filtering concerned poorly defined domains, e.g., the ones explicitly missing top-level domain names, such as .com .org etc, as well as the domains not classifiable by means of our proposed scheme. This action reduced the database to the final number of 3,892 entries.
          </template>
        </DropDownText>
        <DropDownText>
          <template #question>
            Data limitations and possible selection biases
          </template>
          <template #answer>
            The process of gathering and integrating vast sources of user-generated data provides us with the opportunity of analyzing complex collective phenomena in almost real time.
            At the same time, it is also subject to a number of limitations inherent with user-generated content data selection biases that might influence the analysis at different levels.
            In this section, we discuss these limitations in detail, as well as how they affect our results.
            <div class="py-1" />
            <b>Use of Twitter as a data source - Population bias </b>
            <br>
            All Twitter based research has to cope with the intrinsic demographic limitations of Twitter’s penetration: our results apply mostly to <i>well-educated males (65% of Twitter users), between the ages of 25 and 65 (65% of Twitter users)</i>.
            Although our results must be interpreted in the light of these demographic limitations, we believe that our work represents a first step in establishing a robust research agenda for the study of infodemic risk.
            <br>
            Future research should expand our knowledge by working on different demographics from different data sources.
            Furthermore, as the COVID-19 public health emergency spread and raised international concern, Twitter (as well as Facebook and Google) took actions against the diffusion of unreliable/misleading news by attempting to prioritize reliable sources over unreliable ones.
            <div class="py-1" />
            <b>Use of words written with Latin characters in the Twitter Filter API - Data Filtering bias</b>
            <br>
            Latin characters, and particular English, is widespread and often used for hashtags also in messages in languages not using the same alphabet. However, the fact that we used a set of terms shared by Western languages (including English, Spanish, French, Portuguese, German, Italian, and others) to select tweets in the Filter API may exacerbate, in countries where local languages do not use Latin characters, the Twitter bias towards highly educated individuals.
            <div class="py-1" />
            <b>Use of a limited and static list of words in the Twitter Filter API - Data Filtering bias</b>
            <br>
            As discussed above, our analyses do not focus on reconstructing the whole communication network related to the topic but, instead, on <i>estimating the fraction and impact of unreliable news</i>.
            Therefore, our rationale behind the word choice was to include the most commonly used keywords to ensure that, if the discourse abruptly changed its key terms, we were still tracking them.
            This might lower the recall rate, as new terms might be progressively emerging.
            In particular, our dataset only partially includes "<i>#stayathome</i>" or "<i>#staystrong</i>" messages, but eventually our focus is on understanding whether news related to key medical pandemic hashtags are reliable or not, and to what extent they correlate with the epidemic wave.
            <br>
            For this reason, we chose a set of words commonly used in medical discourse, using query expansion when it was crucial for collecting medical-related data (e.g., when the name of the virus and of the disease changed to SARS-CoV-2 and COVID-19 respectively, from the previous 2019-nCov).
            <div class="py-1" />
            An alternative would have been to use automated query expansion techniques to enlarge the set of terms used for filtering.
            Unfortunately, there isn’t yet an agreement on a standard methodology, as each design leads to a different source of bias.
            For example, a possible method would have been to build a hashtag co-occurrence network periodically and to expand the list using more central nodes in such networks.
            <br>
            However, query expansions might have increased the sample at the expense of introducing significant bias in our analysis, as it would have been done, day by day, on a significantly different user base.
            While our choice does not provide a complete picture of the social dynamics during the pandemic, it was specifically designed for the task of gathering tweets containing links to medically related news sources, reliable or not, which is the focus of our paper.
            <div class="py-1" />
            <b>Use of Western-centric fact-checking sites - Data Enrichment bias</b>
            <br>To enhance the specificity and robustness of our multi-language Twitter dataset sample, we collected fact-checking information data from several different and independent sources.
            Since the World-Wide-Web is strongly English-centric, also this collection of sources provides an overabundance of information about content in English.
            The English-centric nature of the resources helping us to identify unreliable news sources likely exacerbates again the intrinsic Twitter demographics limitations towards well-educated English-speaking users, a bias that however could not be amended by any more complete database.
            To assess this limitation, we collected statistics from Amazon Alexa (<a
              href="https://alexa.com/topsites/countries"
              target="_blank"
            >alexa.com/topsites/countries</a>) about web traffic (top 50 most visited websites) for all countries across the globe, matching these lists with the list of domains we used to classify reliable and unreliable sources.
            <div class="py-1" />
            Remarkably, for 127 countries we have at least one domain in the reliable top-50 news source and for 21 (iso2 codes: 'AE', 'AR', 'BB', 'BE', 'CA', 'DK', 'FR', 'KE', 'MX', 'NG', 'PA', 'PE', 'PH', 'PR', 'PT', 'QA', 'SD', 'SE', 'TT', 'US', 'VE') we have at least one domain in the top-50 websites labelled as unreliable (split equally between politically biased and real fake/hoax websites).
            <br>
            In fact, this is a lower bound, because Alexa provided only major domains, disregarding sub-domains that, instead, we classified as well.
            This large presence among the very top tier of websites suggests that our results are robust for multi-language/multi-cultural analysis.
            In our opinion, however, it is not entirely correct to say that fact-checking sites suffer from a Western-centric bias.
            It is the very notion of institutional sources of fact-checking and certification of media bias that is today still largely Western-centric.
            <br>
            An eloquent picture is provided by Reporters Without Borders’ Press Freedom Index (<a
              href="https://rsf.org/en/ranking"
              target="_blank"
            >https://rsf.org/en/ranking</a>), where it is clearly shown that today, apart from the Western world and a few isolated non-Western countries (South Korea, Costa Rica, Jamaica, Uruguay, South Africa, a few small Western African states, and micro states), the media environment of all other countries cannot be considered free, and in such conditions, the possibility of a thorough, transparent fact-checking is basically impossible.
            So, whereas we acknowledge that our study suffers from other sources of bias, we are not sure that this particular one should be classified as such: we are simply considering the only functioning, relatively reliable sources of fact-checking available.
          </template>
        </DropDownText>

        <DropDownText>
          <template #question>
            Observatory Data Pipeline
          </template>
          <template #answer>
            <div style="position: relative">
              <img
                :src="imgSrc"
                class="my-2"
                style="width: 100%; max-height: 140px; text-align: center; object-fit: contain"
              >
            </div>
            The data pipeline of the observatory consists of:
            <ul>
              <li>
                Data <b>gathering</b> from Twitter’s public API
              </li>
              <li>
                Data <b>pre-processing</b> and <b>processing</b>
                <ul>
                  <li>
                    Geolocalization
                  </li>
                  <li>
                    Bot/human detection based on AI-based techniques such as Deep Learning
                  </li>
                  <li>
                    Psycholinguistics analysis (Sentiment, Valence-Arousal-Dominance and BIG5 indicators) based on AI-based techniques such as NLP
                  </li>
                  <li>
                    Reliability classification of media sources based on manually curated database of almost 4,000 web domains
                  </li>
                </ul>
              </li><li>
                Data <b>analysis</b>

                <ul>
                  <li>
                    Temporal and geographical aggregation of processed data.
                  </li>
                  <li>
                    Computation of the infodemic indicators (IRI, dynIRI, News Unreliability indices)
                  </li>
                  <li>
                    Computation of the social media indices and other more detailed indicators used for the case studies.
                  </li>
                  <li>
                    Collection of other data-sources (Epidemic indices from Our World In Data, Economic indices from Stooq and Yahoo! Finance).
                  </li>
                  <li>
                    Alignment and integration of all time series.
                  </li>
                  <li>
                    Computation of daily aggregated statistics for the case studies.
                  </li>
                  <li>
                    Update of the API.
                  </li>
                </ul>
              </li>
              <li>
                Data <b>visualization</b>
                <ul>
                  <li>
                    Computation and data indexing ad-hoc for the visualization
                  </li>
                  <li>
                    Map boundaries, regions names and time periods correction
                  </li>
                  <li>
                    Final visualization showing both dynamic (e.g., timeseries, summaries and choropleth maps) and static data (e.g., reports, images)
                  </li>
                  <li>
                    Modular solution to achieve high scalability and constant UX improvements
                  </li>
                </ul>
              </li>
            </ul>
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
  },
  data () {
    return {
      imgSrc: require('../assets/img/pipeline.png')
    }
  }

}
</script>

<style>

.corpus {
  text-align: justify;
  text-justify: inter-word;
}

</style>
