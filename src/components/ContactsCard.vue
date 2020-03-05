<template>
  <v-card>
    <v-card-title class="">
      {{ contactsConfig.title }}
    </v-card-title>
    <v-divider />
    <v-card-actions>
      <v-row>
        <v-col
          v-for="c in contactsConfig.contacts"
          :key="c.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            flat
            class="text-left"
          >
            <v-card-title>
              {{ c.name }}
            </v-card-title>
            <v-card-subtitle class="pb-1">
              {{ c.role }}
            </v-card-subtitle>
            <v-divider class="mx-4" />
            <v-card-text class="pt-2 pb-1">
              {{ c.description }}
            </v-card-text>
            <v-card-actions class="mx-1 pt-1">
              <span
                v-for="iconKey in Object.keys(possibleIcons)"
                :key="iconKey"
              >
                <v-btn
                  v-if="iconKey in c.links"
                  :href="c.links[iconKey]"
                  icon
                  :target="iconKey!=='email' ? '_blank' : ''"
                >
                  <v-icon>{{ possibleIcons[iconKey] }}</v-icon>
                </v-btn>
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import contactsConfig from '../assets/contacts.json'

const possibleIcons = {
  home: 'mdi-home',
  email: 'mdi-email'
}

export default {
  data () {
    return {
      contactsConfig,
      possibleIcons
    }
  }
}
</script>

<style scoped>

</style>
