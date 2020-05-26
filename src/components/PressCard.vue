<template>
  <v-card
    flat
    class="text-left pb-2"
  >
    <v-card-title>
      In the Press
    </v-card-title>
    <v-divider class="pb-1" />
    <v-card
      v-for="(section, i) in pressConfig"
      :key="i"
      flat
    >
      <v-card-title class="font-italic pb-2 mx-1">
        - {{ section.title }} -
      </v-card-title>
      <v-row class="mx-2">
        <v-col
          v-for="(el, j) in section.elements"
          :key="j"
          class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-1"
        >
          <v-card
            flat
            class="justify-center"
          >
            <v-img
              height="36px"
              contain
              class="mx-1 py-1"
              :src="el.logo"
            />
            <v-divider class="my-1" />
            <v-card-text class="pa-1 font-weight-bold">
              {{ el.text }}

              <span v-if="el.link">
                <br>
                <a
                  :href="el.link"
                  target="_blank"
                >Link</a>
              </span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider
        v-if="i !== pressConfig.length - 1"
        class="mb-1"
      />
    </v-card>
  </v-card>
</template>

<script>

import pressConfig from '../assets/press.json'

export default {
  data () {
    return {
      pressConfig
    }
  }
}

</script>
