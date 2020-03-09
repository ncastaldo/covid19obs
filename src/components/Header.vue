<template>
  <v-app-bar
    app
  >
    <v-container>
      <v-row>
        <v-row>
          <v-img
            class="mx-4"
            :src="imgSrc"
            max-height="100"
            max-width="100"
            contain
          />
          <v-toolbar-title
            class="ml-4 text-left headline"
          >
            COVID19 Infodemics Observatory
          </v-toolbar-title>
        </v-row>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      imgSrc: require('../assets/img/CoMuNe_lab_Bianco.png')
    }
  }
}
</script>
