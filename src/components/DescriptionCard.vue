<template>
  <v-card>
    <v-card-title>
      {{ descriptionConfig.title }}
    </v-card-title>
    <v-divider class="pb-1" />
    <v-card
      flat
      class="text-left pb-1 mx-1"
    >
      <v-card-title class="subtitle-1 py-2">
        Reports
      </v-card-title>
      <div class="px-1">
        <v-card
          flat
          max-width="180"
          class="d-inline-block mx-2"
        >
          <v-img
            src="/assets/static_img/report/report.png"
            height="100"
          />
          <v-card-subtitle>
            <a
              href="assets/static_files/COVID19_INFODEMICS_REPORT.pdf"
              target="_blank"
            >
              Covid-19 Infodemics
            </a>
          </v-card-subtitle>
        </v-card>
        <v-card
          flat
          max-width="180"
          class="d-inline-block mx-2"
        >
          <v-img
            src="/assets/static_img/report/reuters_institute_report.png"
            height="100"
          />
          <v-card-subtitle>
            <a
              href="https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2020-07/RISJ_MajoVazquez%20FactSheet_FINAL.pdf"
              target="_blank"
            >
              Covid-19 Infodemics
            </a>
          </v-card-subtitle>
        </v-card>
      </div>
    </v-card>
    <v-card
      v-for="(p,i) in descriptionConfig.paragraphs"
      :key="i"
      flat
      class="text-left pb-1"
    >
      <v-card-title class="subtitle-1 py-2">
        {{ p.title }}
      </v-card-title>
      <v-card-text
        class="pb-2"
        v-html="p.html"
      />
    </v-card>
    <v-card
      flat
      class="text-left pb-1"
    >
      <v-card-title class="subtitle-1 py-2">
        Images
      </v-card-title>
      <v-row class="ma-2 mt-0">
        <v-card
          v-for="(img, i) in imagesConfig"
          :key="i"
          flat
          class="text-left mx-2 px-2 pb-2 mb-2 outline-it"
          width="180"
          @click="imageOverlay = img"
        >
          <v-card-title
            class="subtitle-2 py-2 px-0"
          >
            {{ img.title }}
          </v-card-title>
          <v-img
            outline-it
            class="white-bg"
            height="100"
            contain
            :src="img.src"
          />
        </v-card>
      </v-row>
    </v-card>

    <v-dialog
      v-if="imageOverlay"
      v-model="imageOverlay"

      max-width="80vw"
      max-height="80vh"
    >
      <v-img
        class="white-bg"
        :src="imageOverlay.src"
        max-width="80vw"
        max-height="80vh"
        contain
      />
      <!--v-img :src="imageOverlay.src" /-->
    </v-dialog>
  </v-card>
</template>

<script>
import descriptionConfig from '../assets/description.json'
import imagesConfig from '../assets/images.json'

export default {
  data () {
    return {
      descriptionConfig,
      imagesConfig,

      imageOverlay: null
    }
  }
}
</script>

<style scoped>

.white-bg {
  background-color: rgba(255,255,255, 0.95)
}

.outline-it {
  box-sizing: border-box;
}

.outline-it:hover {
  outline: solid 2px #666;
  outline-offset: 0px;
}

</style>
