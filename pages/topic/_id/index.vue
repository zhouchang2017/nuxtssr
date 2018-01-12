<template>
    <div>
        <article class="home-mian" role="main">
            <main-swiper-4-pic-banner v-if="$store.state.community.modules.main_swiper_4_pic_poster"
                                      :items="$store.state.community.main_swiper_4_pic_poster"/>
            <div class="home-mian">
                <div class="home-mian-left">
                    <recommend-photographic v-if="$store.state.community.modules.recommend_photographic"
                                            :items="$store.state.community.recommend_photographic"/>
                    <main-3-pic-banner v-if="$store.state.community.modules['3_pic_poster']"
                                       :items="$store.state.community['3_pic_poster']"/>
                    <join-community v-if="$store.state.community.modules.join_community"
                                    :info="$store.state.community.community_info"
                                    :author_users="$store.state.community.hot_community_author.author_users"
                                    :author_num="$store.state.community.hot_community_author.author_num"/>
                    <navigation-bar v-if="$store.state.community.modules['community-list']"
                                    :types="$store.state.community.content_types"
                                    :id="$store.state.community.community_info.id">
                        <nuxt-child/>
                    </navigation-bar>
                </div>
                <div class="home-mian-right">
                    <publish-entry v-if="$store.state.community.modules.publish_entry"
                                   :items="$store.state.community.content_system"/>
                    <community-dynamics v-if="$store.state.community.modules.community_dynamics"/>
                    <hot-new-product v-if="$store.state.community.modules.hot_new_price"/>
                    <coupons v-if="$store.state.community.modules.good_price"
                             :items="$store.state.community.good_price"/>
                    <idel v-if="$store.state.community.modules.second_handle"
                          :items="$store.state.community.second_handle"/>
                    <exhibition
                            v-if="$store.state.community.modules['equip-show-swiper'] && $store.state.community['equip-show-swiper'].length>0"
                            :items="$store.state.community['equip-show-swiper']"/>
                    <question
                            v-if="$store.state.community.modules.answers_list && $store.state.community.answers_list.length>0"
                            :items="$store.state.community.answers_list"/>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import api from '~/util/api.config'

  export default {
    layout: 'topic',
    components: {
      'recommend-photographic': () => import('~/components/community/RecommendPhotographic'),
      'main-swiper-4-pic-banner': () => import('~/components/community/MainSwiper4PicBanner'),
      'join-community': () => import('~/components/community/JoinCommunity'),
      'main-3-pic-banner': () => import('~/components/community/Main3PicBanner'),
      'publish-entry': () => import('~/components/community/PublishEntry'),
      'community-dynamics': () => import('~/components/community/CommunityDynamics'),
      'hot-new-product': () => import('~/components/community/HotNewProduct'),
      'coupons': () => import('~/components/community/Coupons'),
      'idel': () => import('~/components/community/Idel'),
      'exhibition': () => import('~/components/community/Exhibition'),
      'question': () => import('~/components/community/Question'),
      'navigation-bar': () => import('~/components/community/NavigationBar')
    },
    data () {
      return {}
    },
    head () {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: 'My custom description'}
        ],
        // css: [{src: '~/less/topic.less', lang: 'less'}]
      }
    },
    async asyncData ({store, params}) {
      console.log('id父路由数据加载……')
      await store.dispatch('getCommunitySub', params)
      return {title: `棒客-${store.getters.communityInfo.name}`}
    },
    fetch ({store, params, query}) {

    },
    computed: {}
  }
</script>

<style scoped>

</style>
