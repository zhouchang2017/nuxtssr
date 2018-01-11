import Vue from 'vue'
import Vuex from 'vuex'
import community from './modules/community'
import pagination from './modules/pagination'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    community, pagination
  },
  state: {
    counter: 0
  },
  getters,
  actions,
  mutations
})

export default store
