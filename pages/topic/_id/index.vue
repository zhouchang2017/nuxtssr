<template>
  <div>
    <article class="home-mian" role="main">
      <main-swiper-4-pic-banner v-if="initData.community.modules.main_swiper_4_pic_poster" :items="initData.community.main_swiper_4_pic_poster"/>
      <div class="home-mian">
        <div class="home-mian-left">
          <recommend-photographic v-if="initData.community.modules.recommend_photographic"
                                  :items="initData.community.recommend_photographic"/>
          <join-community v-if="initData.community.modules.join_community" :info="initData.communityInfo"
                          :author_users="initData.community.author_users" :author_num="initData.community.author_num"/>
          <main-3-pic-banner v-if="initData.community.modules['3_pic_poster']" :items="initData.community['3_pic_poster']"/>
          <summary-list v-if="initData.community.modules['community-list']" :_initData="initData.community.body" :types="initData.community.types" :id="initData.id" />
        </div>
        <div class="home-mian-right">
          <publish-entry v-if="initData.community.modules.publish_entry" :items="initData.community.contentSystem"/>
          <community-dynamics v-if="initData.community.modules.community_dynamics"/>
          <hot-new-product v-if="initData.community.modules.hot_new_price"/>
          <coupons v-if="initData.community.modules.good_price" :items="initData.community.good_price"/>
          <idel v-if="initData.community.modules.second_handle" :items="initData.community.second_handle"/>
          <exhibition v-if="initData.community.modules['equip-show-swiper']"
                      :items="initData.community['equip-show-swiper']"/>
          <question v-if="initData.community.modules.answers_list" :items="initData.community.answers_list"/>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  import axios from 'axios'
  import api from '~/util/api.config'
  // import CommunityList from '~/components/community/CommunityList'
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
      'summary-list': () => import('~/components/community/CommunityList')
      // 'summary-list': CommunityList
    },
    data () {
      return {
      }
    },
    head () {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: 'My custom description'}
        ],
        css: [{src: '~/less/topic.less', lang: 'less'}]
      }
    },
    async asyncData ({params}) {
      let {data} = await axios.get(api.community.getCommunity(params.id))
      return {initData: data, title: `棒客-${data.communityInfo.name}`}
    },
    fetch () {
      // The fetch method is used to fill the store before rendering the page
    }
  }
</script>

<style scoped>

</style>
