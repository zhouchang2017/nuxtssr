import Vue from 'vue'

const API = {
  // 评论通用接口
  comment: {
    // 获取评论
    index (type, id) {
      return `/comment/${type}/${id}`
    },
    // 回复评论
    store (type, id) {
      return `/comment/${type}/${id}`
    },
    // 评论点赞/喜欢
    agree (type, id) {
      return `/comment/${type}/${id}/agree`
    }
  },
  // 收藏通用接口
  collect: {
    update (type, id) {
      return `/collect/${type}/${id}`
    }
  },
  // 回复通用接口
  reply: {
    index (type, id) {
      return `/reply/${type}/comment/${id}`
    },
    store (type, id) {
      return `/reply/${type}/comment/${id}`
    }
  },
  // 举报接口
  repory: {
    store (content_type) {
      return `/report/${content_type}`
    }
  },
  // 社区相关
  community: {
    getUrl (id) {
      return `/topic/${id}`
    },
    getArticle (id, summary_catalog_id) {
      return `/topic/${id}/summary_catalog/${summary_catalog_id}`
    },
    getSummaryList (id, type) {
      return `/api/topic/${id}/${type}`
    },
    getSummary (id, type) {
      return `/api/v1/topic/${id}/${type}`
    },
    getCommunity (id) {
      return `api/v1/topic/${id}`
    },
    getCommunitySquare (id, api = true) {
      return `api/topic/${id}/square?api=${api}`
    }
  },
  // 用户相关
  user: {
    getUserInfo (id) {
      return `/user_info/${id}`
    },
    // 获取用户的文章草稿
    draft () {
      return `/user/article/draft`
    },
    follow (id) {
      return `/user/${id}/follow`
    },
    // 用户中心
    home (id) {
      return `/user/${id}`
    }
  },
  // 图片上传
  file: {
    upLoadImg () {
      return `/fileupload/image`
    },
    upLoadImgWithKey () {
      return `/fileupload/image_key`
    },
    uploadVideoPreprocess () {
      return `/aetherupload/preprocess`
    },
    uploadVideoIng () {
      return `/aetherupload/uploading`
    },
    getVideoImg () {
      return `/fileupload/video`
    }
  },
  // 文章相关
  article: {
    store (summary_id) {
      return `/article/community/${summary_id}`
    },
    // 保存草稿 混合模式
    storeDraftMix () {
      return `/article/draft/mix`
    },
    // 保存草稿 纯图模式
    storeDraftImage () {
      return `/article/draft/image`
    },
    // 保存草稿 视频模式
    storeDraftVideo () {
      return `/article/draft/video`
    },
    // 提取草稿
    getDraft (summary_id) {
      return `/article/draft/${summary_id}`
    },
    // 通过社区id文章类型获取文章分页列表
    getArticleListByCommunityIdWithType (community_id, article_type) {
      return article_type !== 'all' ? `api/topic/${community_id}/article_type/${article_type}` : `api/topic/${community_id}/article_type`
    }
  },
  // 产品相关
  product: {
    show (id) {
      return `/product/${id}`
    }
  },
  // 搜索
  search: {
    getProductByKeyWords (text) {
      return `/search/product?q=${text}`
    },
    getRecommendBrands () {
      return `/recommend/brand`
    },
    getRecommendProducts (id) {
      return `/recommend/brand/${id}`
    }
  },
  // 需要权限
  needAuth: []

}
Vue.prototype.$api = API
export default API
