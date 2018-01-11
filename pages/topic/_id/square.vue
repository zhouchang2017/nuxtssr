<template>
  <div>
    <article class="home-mian" role="main">
      <div class="home-mian">
        <div class="home-mian-left">
          <navigation-bar v-if="$store.state.community.modules['community-list']"
                          :types="$store.state.community.content_types" :id="$store.state.community.community_info.id">
            <nuxt-child/>
          </navigation-bar>
        </div>
        <div class="home-mian-right">
          <publish-entry v-if="$store.state.community.modules.publish_entry"
                         :items="$store.state.community.content_system"/>
          <!--<community-dynamics v-if="initData.community.modules.community_dynamics"/>-->
          <hot-new-product v-if="$store.state.community.modules.hot_new_price"/>
          <coupons v-if="$store.state.community.modules.good_price" :items="$store.state.community.good_price"/>
          <idel v-if="$store.state.community.modules.second_handle" :items="$store.state.community.second_handle"/>
          <exhibition
            v-if="$store.state.community.modules['equip-show-swiper'] && $store.state.community['equip-show-swiper'].length>0"
            :items="$store.state.community['equip-show-swiper']"/>
          <question v-if="$store.state.community.modules.answers_list && $store.state.community.answers_list.length>0"
                    :items="$store.state.community.answers_list"/>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  import axios from 'axios'
  import api from '~/util/api.config'

  export default {
    layout: 'topic',
    components: {
      'publish-entry': () => import('~/components/community/PublishEntry'),
      'community-dynamics': () => import('~/components/community/CommunityDynamics'),
      'hot-new-product': () => import('~/components/community/HotNewProduct'),
      'coupons': () => import('~/components/community/Coupons'),
      'idel': () => import('~/components/community/Idel'),
      'exhibition': () => import('~/components/community/Exhibition'),
      'question': () => import('~/components/community/Question'),
      // 'summary-list': () => import('~/components/community/CommunityList'),
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
        css: [{src: '~/less/topic.less', lang: 'less'}]
      }
    },
    async asyncData ({store, params, query}) {
      await store.dispatch('getCommunitySquare', {params, query})
      store.commit('SET_PAGINATION', store.getters.communityBody)
      return {title: `棒客-${store.getters.communityInfo.name}-广场`}
    },
    fetch () {
      // The fetch method is used to fill the store before rendering the page
    }
  }
</script>

<style scoped>

</style>
