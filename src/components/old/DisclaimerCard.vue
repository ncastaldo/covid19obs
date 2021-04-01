<template>
  <v-card>
    <v-card-title>
      Disclaimer
    </v-card-title>
    <v-divider class="pb-1" />
    <v-card
      flat
      class="text-left pb-1 mx-1"
    >
      <v-card-title class="subtitle-1 py-2">
        Fact-Checking Methodology
      </v-card-title>
      <v-card-text>
        <p>The classification of reliable vs potentially unreliable news sources is based on joining the work of different classifiers:</p>
        <ul>
          <li
            v-for="(v, i) in sources"
            :key="i"
          >
            {{ v.text }}
            <a
              v-if="v.link"
              :href="`${v.link}`"
              target="_blank"
            >
              Link
            </a>
          </li>
        </ul>
        <br>
        <p class="mb-1">
          A few sources have been manually classified and annotated according to Wikipedia and other trusted sources.<br>
          When two classifiers do not agree on the classification of the same source, we pick the potentially more harmful classification, in terms of lower priority:
        </p>
        <v-simple-table
          dense
          style="max-width: 500px"
          class="pt-1 pb-4 mx-auto"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Priority
                </th>
                <th class="text-left">
                  Category
                </th>
                <th class="text-left">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in factTypes"
                :key="i"
              >
                <td>{{ i+1 }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.type }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <p class="mb-0">
          For instance, if news from xyz.com is classified by two distinct data sources as POLITICAL and MSM, our algorithm will assign the label 'POLITICAL'. Note that this does not means that it is fake: it is just potentially unreliable according to one or more expert classifiers.<br>
          OTHER here refers to URLs pointing to content not verifiable automatically (eg. videos), while SHADOW refers to shortened URLs poitning to dead links. In both cases, it is not possible to assess their reliability/unreliability and they are classified as UNKNOWN, and consequently excluded from the analysis.
        </p>
      </v-card-text>
    </v-card>
    <v-card
      flat
      class="text-left pt-0 pb-1 mx-1"
    >
      <v-card-title class="subtitle-1 py-2">
        Work with us
      </v-card-title>
      <v-card-text>
        <p class="mb-0">
          We are fully transparent about our methodology but we are aware that, as all algorithms, our method is very accurate but not perfect. If you are a journalist or a news media, we kindly invite you to get in touch with us to enhance the classification. We thank the community of journalists who already got in touch with us for this purpose.
        </p>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>

const sources = [
  {
    text: 'M. Zimdar for the Washingtoin Post (2016).',
    link: 'https://washingtonpost.com/posteverything/wp/2016/11/18/my-fake-news-list-went-viral-but-made-up-stories-are-only-part-of-the-problem/'
  },
  {
    text: 'C. Silverman for BuzzFeed News (2017).',
    link: 'https://buzzfeednews.com/article/craigsilverman/inside-the-partisan-fight-for-your-news-feed'
  },
  {
    text: 'Fake News Watch (2015).',
    link: 'https://web.archive.org/web/20180213181029/http://www.fakenewswatch.com/'
  },
  {
    text: 'PolitiFact (2017).',
    link: 'https://politifact.com/article/2017/apr/20/politifacts-guide-fake-news-websites-and-what-they/'
  },
  {
    text: 'Bufale.net (2018).',
    link: 'https://bufale.net/the-black-list-la-lista-nera-del-web/'
  },
  {
    text: 'Starbird et al, ICWSM (2018)'
  },
  {
    text: 'Fletcher et al, Factsheets, Reuters Institute and U. of Oxford (2018).',
    link: 'https://reutersinstitute.politics.ox.ac.uk/our-research/measuring-reach-fake-news-and-online-disinformation-europe'
  },
  {
    text: 'Grinberg et al, Science 363, 374 (2019).'
  },
  {
    text: 'MediaBiasFactCheck (2020).',
    link: 'https://mediabiasfactcheck.com/'
  }
]

const factTypes = [
  {
    category: 'SCIENCE',
    type: 'Reliable'
  },
  {
    category: 'MAINSTREAM MEDIA',
    type: 'Reliable'
  },
  {
    category: 'SATIRE',
    type: 'Unreliable'
  },
  {
    category: 'CLICKBAIT',
    type: 'Unreliable'
  },
  {
    category: 'OTHER',
    type: 'Unknown'
  },
  {
    category: 'SHADOW',
    type: 'Unknown'
  },
  {
    category: 'POLITICAL',
    type: 'Unreliable'
  },
  {
    category: 'FAKE/HOAX',
    type: 'Unreliable'
  },
  {
    category: 'CONSPIRACY/JUNKSCI',
    type: 'Unreliable'
  }
]

export default {
  data () {
    return {
      sources,
      factTypes
    }
  }
}

/*

FACT-CHECKING METHODOLOGY

The classification of reliable vs potentially unreliable news sources is based on joining the work of different classifiers:

M. Zimdar for the Washingtoin Post (2016). https://www.washingtonpost.com/posteverything/wp/2016/11/18/my-fake-news-li st-went-viral-but-made-up-stories-are-only-part-of-the-problem/

C. Silverman for BuzzFeed News (2017). https://www.buzzfeednews.com/article/craigsilverman/inside-the-partisan-fight-fo r-your-news-feed

Fake News Watch (2015). https://web.archive.org/web/20180213181029/http://www.fakenewswatch.com/

PolitiFact (2017). https://www.politifact.com/article/2017/apr/20/politifacts-guide-fake-news-website
s-and-what-they/

Bufale.net (2018). https://www.bufale.net/the-black-list-la-lista-nera-del-web/

Starbird et al, ICWSM (2018)

Fletcher et al, Factsheets, Reuters Institute and U. of Oxford (2018).
https://reutersinstitute.politics.ox.ac.uk/our-research/measuring-reach-fake-news-a
nd-online-disinformation-europe

Grinberg et al, Science 363, 374 (2019)

MediaBiasFactCheck (2020). https://mediabiasfactcheck.com/

A few sources have been manually classified and annotated according to Wikipedia and other trusted sources.

When two classifiers do not agree on the classification of the same source, we pick the potentially more harmful classification, in terms of lower priority:

category;priority;type
SCIENCE;1;RELIABLE
MAINSTREAM MEDIA;2;RELIABLE
SATIRE;3;UNRELIABLE
CLICKBAIT;4;UNRELIABLE
OTHER;5;UNKNOWN
SHADOW;6;UNKNOWN
POLITICAL;7;UNRELIABLE
FAKE/HOAX;8;UNRELIABLE
CONSPIRACY/JUNKSCI;9;UNRELIABLE

For instance, if news from xyz.com is classified by two distinct data sources as POLITICAL and MSM, our algorithm will assign the label 'POLITICAL'. Note that this does not means that it is fake: it is just potentially unreliable according to one or more expert classifiers.

OTHER here refers to URLs pointing to content not verifiable automatically (eg. videos), while SHADOW refers to shortened URLs poitning to dead links. In both cases, it is not possible to assess their reliability/unreliability and they are classified as UNKNOWN, and consequently excluded from the analysis.

WORK WITH US

We are fully transparent about our methodology but we are aware that, as all algorithms, our method is very accurate but not perfect. If you are a journalist or a news media, we kindly invite you to get in touch with us to enhance the classification. We thank the community of journalists who already got in touch with us for this purpose.
*/
</script>
