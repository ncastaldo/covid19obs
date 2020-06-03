<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        class="pb-3"
      >
        <DescriptionCard />
      </v-col>
      <v-col
        cols="12"
        class="pb-3"
      >
        <DisclaimerCard />
      </v-col>
      <v-col
        cols="12"
        class="pb-3"
      >
        <DataSourcesCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DescriptionCard from '../components/DescriptionCard'
import DisclaimerCard from '../components/DisclaimerCard'
import DataSourcesCard from '../components/DataSourcesCard'

export default {
  components: {
    DescriptionCard,
    DisclaimerCard,
    DataSourcesCard
  }

}
</script>
