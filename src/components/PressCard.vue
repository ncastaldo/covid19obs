<template>
  <div>
    <div
      v-for="(section, i) in pressConfig"
      :key="i"
      flat
    >
      <h2 class="font-italic thin-font pb-2 mt-3 text-center">
        {{ section.title }}
        <v-divider class="mt-1" />
      </h2>
      <v-row>
        <v-col
          v-for="(el, j) in section.elements"
          :key="j"
          class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-1"
        >
          <div
            flat
            class="justify-center"
          >
            <v-img
              height="36px"
              contain
              class="mx-1 py-1"
              :src="el.logo"
            />
            <v-divider class="my-2" />
            <div class="text-center">
              {{ el.text }}
            </div>
            <div v-if="el.link" class="text-center font-weight-bold">
              <a
                :href="el.link"
                target="_blank"
              >
                Link
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

const filePath = '/assets/static_config/press.json'

export default {
  data () {
    return {
      pressConfig: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      fetch(filePath)
        .then(res => res.json())
        .then(data => {
          this.pressConfig = data
        })
        .catch(e => { console.log(`NO file found at ${filePath}`) })
    }
  }
}

</script>
