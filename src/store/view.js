const state = {
  drawer: false
}

const mutations = {
  setDrawer: (state, drawer) => { state.drawer = drawer }
}

const getters = {
  isDrawer: ({ drawer }) => drawer
}
const actions = {
  toggleDrawer: ({ getters, commit }) => {
    commit('setDrawer', !getters.isDrawer)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
