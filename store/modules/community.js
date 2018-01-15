import api from '~/util/api.config'
import axios from 'axios'
import {encodeSearchParams} from '~/util/helper'
// 社区
const state = {
  // 当前导航栏
  cur_nav_bar: [],
  // 社区主题内容
  community_body: {},
  // 社区信息
  community_info: {},
  // 内容体系-发布入口相关-广场页面nav-bar
  content_system: [],
  // 内类型，子社区，导航
  content_types: [],
  // 包含模块
  modules: {},
  // 当前社区热门作者及数量
  hot_community_author: {
    author_num: 0,
    author_users: []
  }
}

// getters
const getters = {
  communityInfo: state => state.community_info,
  communityBody: state => state.community_body
}

// actions
const actions = {
  // 社区一级页社区信息，模块数据请求
  async getCommunitySub ({commit}, params) {
    let url = `${api.community.getCommunity(params.id)}`
    let {data} = await axios.get(url)
    commit('SET_CUR_NAV_BAR', data.community.types)
    commit('SET_COMMUNITY_INFO', {
      info: data.communityInfo, author_num: data.community.author_num, author_users: data.community.author_users
    })
    commit('SET_CONTENT_SYSTEM', data.community.contentSystem)
    commit('SET_CONTENT_TYPE', data.community.types)
    commit('SET_MODULES', data.community)
  },
  // 子社区页面body数据请求
  async getCommunitySubListPage ({commit}, {params, query, is_choice = null, _with = null}) {
    let filter = _with ? encodeSearchParams({is_choice, ...query, ..._with}) : encodeSearchParams({is_choice, ...query})
    console.log(filter)
    let url = api.community.getSummary(params.id)
    console.log(`${url}?${filter}`)
    let {data} = await axios.get(`${url}?${filter}`)
    commit('SET_COMMUNITY_BODY', data.body)
    commit('SET_PAGINATION', data.body)
  },
  // 社区广场首页数据请求
  async getCommunitySquare ({commit}, params) {
    let url = `${api.community.getCommunitySquare(params.id)}`
    console.log(url)
    let {data} = await axios.get(url)
    commit('SET_CUR_NAV_BAR', data.community.types)
    commit('SET_COMMUNITY_INFO', {
      info: data.communityInfo, author_num: data.community.author_num, author_users: data.community.author_users
    })
    commit('SET_CONTENT_SYSTEM', data.community.contentSystem)
    commit('SET_CONTENT_TYPE', data.community.contentSystem)
    commit('SET_MODULES', data.community)
  },
  // summaryCatalog子列表页模块数据请求
  async getSummaryCatalog ({commit}, params) {
    let url = `${api.community.getSummaryCatalog(params)}`
    console.log(url)
    let {data} = await axios.get(url)
    // commit('SET_CUR_NAV_BAR', data.community.types)
    commit('SET_COMMUNITY_INFO', {
      info: data.community_info, author_num: data.community.author_num, author_users: data.community.author_users
    })
    // commit('SET_MODULES', data.community)getExhibitionListBy
  },
  // 社区对应装备秀列表主体内容请求
  async getExhibitionList ({commit}, {params, query, is_choice = null, _with = null}) {
    let filter = _with ? encodeSearchParams({is_choice, ...query, ..._with}) : encodeSearchParams({is_choice, ...query})
    console.log(filter)
    let url = api.community.getExhibitionListBy(params.id)
    console.log(`${url}?${filter}`)
    let {data} = await axios.get(`${url}?${filter}`)
    return data
  },
  // 社区对应作品列表主体内容请求
  async getMasterpieceList ({commit}, {params, query, is_choice = null, _with = null}) {
    let filter = _with ? encodeSearchParams({is_choice, ...query, ..._with}) : encodeSearchParams({is_choice, ...query})
    console.log(filter)
    let url = api.community.getMasterpieceListBy(params.id)
    console.log(`${url}?${filter}`)
    let {data} = await axios.get(`${url}?${filter}`)
    return data
  },
  // 社区对应好价列表主题内容请求 -coupons
  async getCouponsList ({commit}, {params, query, is_choice = null, _with = null}) {
    let filter = _with ? encodeSearchParams({is_choice, ...query, ..._with}) : encodeSearchParams({is_choice, ...query})
    console.log(filter)
    let url = api.community.getCouponsListBy(params.id)
    console.log(`${url}?${filter}`)
    let {data} = await axios.get(`${url}?${filter}`)
    return data
  },
  // 社区对应闲置二手列表主题内容请求 -idle
  async getIdleList ({commit}, {params, query, is_choice = null, _with = null}) {
    let filter = _with ? encodeSearchParams({is_choice, ...query, ..._with}) : encodeSearchParams({is_choice, ...query})
    console.log(filter)
    let url = api.community.getIdleListBy(params.id)
    console.log(`${url}?${filter}`)
    let {data} = await axios.get(`${url}?${filter}`)
    return data
  }
}

// mutations
const mutations = {
  // 保存当前导航数据
  SET_CUR_NAV_BAR: (state, navigator) => state.cur_nav_bar = navigator,
  // 保存当前子社区内容
  SET_COMMUNITY_BODY: (state, body) => state.community_body = body,
  // 保存社区信息
  SET_COMMUNITY_INFO: (state, {info, author_num = null, author_users = null}) => {
    state.community_info = info
    state.hot_community_author = {author_num, author_users}
  },
  // 保存该社区模块信息
  SET_MODULES: (state, community) => {
    state.modules = community.modules
    for (let key in community.modules) {
      if (community.modules[key]) {
        state[key] = community[key]
      }
    }
  },
  // 保存该社区内容体系
  SET_CONTENT_SYSTEM: (state, content_system) => state.content_system = content_system,
  SET_CONTENT_TYPE: (state, content_types) => state.content_types = content_types
}

export default {
  state,
  getters,
  actions,
  mutations
}
