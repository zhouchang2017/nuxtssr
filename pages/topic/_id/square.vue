<template>
    <div>
        <article class="home-mian" role="main">
            <div class="home-mian">
                <div class="home-mian-left">
                    <navigation-bar :isSquare="true" v-if="initData.community.modules['community-list']"
                                    :_initData="initData.community.body"
                                    :types="initData.community.contentSystem" :id="initData.id">
                        <nuxt-child/>
                    </navigation-bar>
                </div>
                <div class="home-mian-right">
                    <publish-entry v-if="initData.community.modules.publish_entry" :items="initData.community.contentSystem"/>
                    <!--<community-dynamics v-if="initData.community.modules.community_dynamics"/>-->
                    <hot-new-product v-if="initData.community.modules.hot_new_price"/>
                    <coupons v-if="initData.community.modules.good_price" :items="initData.community.good_price"/>
                    <idel v-if="initData.community.modules.second_handle" :items="initData.community.second_handle"/>
                    <exhibition
                            v-if="initData.community.modules['equip-show-swiper'] && initData.community['equip-show-swiper'].length>0"
                            :items="initData.community['equip-show-swiper']"/>
                    <question v-if="initData.community.modules.answers_list && initData.community.answers_list.length>0"
                              :items="initData.community.answers_list"/>
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
    async asyncData ({params, query}) {
      let url = query.hasOwnProperty('filter') ?
        `${api.community.getCommunitySquare(params.id)}&article_type=${query.filter}` :
        `${api.community.getCommunitySquare(params.id)}`
      let {data} = await axios.get(url)
      return {initData: data, title: `棒客-${data.communityInfo.name}-广场`}
    },
    fetch () {
      // The fetch method is used to fill the store before rendering the page
    }
  }
</script>

<style scoped>

</style>
