<template>
  <Article>
    <div class="text-center">
      <h1>Press</h1>
    </div>
    <div class="text-left my-2">
      <h2 class="pb-2">
        Manifesto
      </h2>
      <p>
        <b>Fondazione Bruno Kessler</b> (<b>FBK</b>) <a href="https://bit.ly/3sqo1lp" target="_blank"> publicly launches</a> the new <b>Infodemic Observatory</b> for <b>COVID-19</b>.
        This work was advised by the <b>World Health Organization</b> (<b>WHO</b>) to better understand the impact of an infodemic at global scale.
        Following  global WHO conferences in April and June 2020, the scientific community called for research and evidence-based tools to better understand, track and measure the infodemic phenomenon.
        <br>
        Based on artificial intelligence techniques, data science and network science, the Observatory provides in almost real time a unique lens on the <b>current status of misinformation and disinformation</b> diffusing in the popular microblogging platform Twitter.
      </p>
      <p>
        The computational tool, publicly accessible, is the result of an <b>interdisciplinary collaboration</b> involving <i>physicists, computer scientists, cultural economists, public health and communication experts</i> from FBK and advised by WHO.
      </p>
      <img
        :src="imgSrc"
        class="my-4"
        style="width: 100%; max-height: 520px; text-align: center; object-fit: contain"
      >
      <p>
        The platform provides information about the evolution of infodemic – i.e., the overabundance of information not necessarily trustworthy [1] – about COVID-19, using a battery of indices developed for the analysis of this increasingly worrying phenomenon emerging at planetary level, which are based on a peer-reviewed scientific paper recently published on the prestigious journal <b>Nature Human Behavior</b> [2].
      </p>
      <p>
        <i>
          "We need new methodologies and metrics to measure infodemics and develop interventions that revert the negative impact of it.
          Understanding where information voids exist will allow us for example to ensure that more trustworthy information gets to communities before less trustworthy sources occupy the space and the mind.
          Understanding this information eco-system will be a key component of managing an infodemic during health emergencies"
        </i>
        says <b>Tim Nguyen</b>, <b>Head Of Unit High Impact Events Preparedness</b> at <b>World Health Organization</b>.
      </p>
      <p>
        <i>
          "Infodemics are the socio-cognitive equivalent of infective processes.
          Spreading information or ideas that, in the middle of a health crisis, systematically mislead the public opinion and prompt people to make wrong choices becomes a public health issue as, and as much as, the epidemics itself"
        </i>, says to <b>Pier Luigi Sacco</b>, <b>FBK</b> researcher and member of the research team, expert in public policy and professor at <b>IULM University Milan</b>.
      </p>
      <p>
        According to <b>Manlio De Domenico</b>, complex systems scientist and <b>Head of the Research Unit Complex Multilayer Networks Lab</b> at <b>FBK</b>, who led the team behind the project:
        <i>
          "the infodemics present characteristics close to those of epidemics, with millions of people who are unaware to be exposed to unreliable news spread online.
          The dynamics of this phenomenon is yet to be understood and this Observatory provides an important step towards the right direction".
        </i>
      </p>
      <p>
        This resource is made publicly available to the entire scientific and professional community [3] to multiply as much as possible the efforts of understanding and analysis in a situation of major social emergency like the present one.
      </p>

      <p>
        For more information:

        <ol>
          <li>
            WHO Novel Coronavirus (2019-nCoV), Situation Report - 13, 2nd February 2020
            <br>
            <a
              href="https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200202-sitrep-13-ncov-v3.pdf"
              target="_blank"
            >
              https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200202-sitrep-13-ncov-v3.pdf
            </a>
          </li>
          <li>
            Gallotti, R., Valle, F., Castaldo, N. et al. Assessing the risks of ‘infodemics’ in response to COVID-19 epidemics.
            <br>
            Nature Human Behavior 4, 1285–1293 (2020).
            <br>
            <a
              href="https://doi.org/10.1038/s41562-020-00994-6"
              target="_blank"
            >
              https://doi.org/10.1038/s41562-020-00994-6
            </a>
          </li>
          <li>
            <a
              href="https://covid19obs.fbk.eu/"
              target="_blank"
            >
              https://covid19obs.fbk.eu/
            </a>
          </li>
        </ol>
      </p>
    </div>
    <div class="mt-8">
      <h2>
        Cited by
      </h2>
      <PressCard />
    </div>
  </Article>
</template>

<script>
// color: #1f79b3

import PressCard from '../components/PressCard.vue'
export default {
  components: { PressCard },
  data () {
    return {
      imgSrc: '/assets/static_img/website.png'
    }
  }
}
</script>

<style scoped>

ol {
  counter-reset: list;
}
ol > li {
  list-style: none;
}
ol > li:before {
  content: "[" counter(list) "] ";
  counter-increment: list;
  margin-left: -1.35rem;
}

li {
  padding-top: 0.3rem
}

</style>
