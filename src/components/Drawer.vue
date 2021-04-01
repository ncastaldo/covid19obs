<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    disable-resize-watcher
    mobile-breakpoint="0"
    temporary
    touchless
    right
  >
    <v-list
      dense
      rounded
    >
      <v-list-item class="pr-0 pb-2">
        <v-spacer />
        <v-btn
          icon
          large
          @click="toggleDrawer"
        >
          <v-icon large>
            mdi-close
          </v-icon>
        </v-btn>
      </v-list-item>

      <v-list-item
        v-for="item in routes"
        :key="item.title"
        :to="item.link"
        link
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-title v-text="item.title" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import { routes } from '../plugins/router'

export default {
  data () {
    return {
      routes
    }
  },
  computed: {
    // trick for vuex
    drawer: {
      set (value) { this.setDrawer(value) },
      get () { return this.isDrawer }
    },
    ...mapGetters({
      isDrawer: 'view/isDrawer'
    })
  },
  methods: {
    ...mapMutations({
      setDrawer: 'view/setDrawer'
    }),
    ...mapActions({
      toggleDrawer: 'view/toggleDrawer'
    })
  }
}
</script>

<style>

a.active .route-title,
a:hover .route-title{
  color: rgb(31, 121, 179);
}

</style>
