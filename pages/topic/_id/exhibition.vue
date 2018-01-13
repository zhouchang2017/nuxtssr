<template>
  <article class="masterpiece-main" role="main">
    <div class="masterpiece-main">
      <div class="masterpiece-main-top">
        <info/>
        <user/>
      </div>
      <div class="masterpiece-main-content">
        <navigation-bar :types="types" :hasAll="false"/>
        <nuxt-child/>
      </div>
      <!--<layer-post-details />-->
    </div>
  </article>
</template>

<script>
  import NavigationBar from '~/components/community/NavigationBar'
  import Info from '~/components/community/summaryType/Info'
  import User from '~/components/community/summaryType/User'

  export default {
    layout: 'topic_summary',
    name: 'summary_type',
    data () {
      return {
        types: []
      }
    },
    components: {
      NavigationBar, Info, User
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
    async asyncData ({store, params}) {
      console.log(params)
      params.summaryType = 'exhibition'
      await store.dispatch('getSummaryCatalog', params)
      return {title: `棒客-${store.getters.communityInfo.name}-${store.getters.communityInfo.summary_name}`}
    },
    created () {
      this.types = [
        {
          name_en: 'discovery',
          name_cn: '发现'
        },
        {
          name_en: 'followed',
          name_cn: '关注'
        }
      ]
    }
  }
</script>

<style scoped>

</style>
