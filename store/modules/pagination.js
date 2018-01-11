import api from '~/util/api.config'
import axios from 'axios'
// 社区
const state = {
  pageInfo: {}
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  SET_PAGINATION: (state, obj) => {
    state.pageInfo = {
      current_page: obj.current_page,
      first_page_url: obj.first_page_url,
      from: obj.from,
      last_page: obj.last_page,
      last_page_url: obj.last_page_url,
      next_page_url: obj.next_page_url,
      path: obj.path,
      per_page: obj.per_page,
      prev_page_url: obj.prev_page_url,
      to: obj.to,
      total: obj.total
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
