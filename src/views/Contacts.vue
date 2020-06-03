<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        class="pb-3"
      >
        <PressCard />
      </v-col>
      <v-col
        cols="12"
        class="pb-3"
      >
        <ContactsCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PressCard from '../components/PressCard'
import ContactsCard from '../components/ContactsCard'

export default {
  components: {
    PressCard,
    ContactsCard
  }

}
</script>
