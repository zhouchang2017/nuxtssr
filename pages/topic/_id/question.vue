<template>
  <div class="idle">
    <section class="idel_left">
      <navigation-bar :types="types" :hasAll="true">
        <nuxt-child/>
      </navigation-bar>
    </section>
    <aside class="idel_right">
      <div class="idle_rightCon">
        <user/>
        <app-q-r-code/>
      </div>
    </aside>
  </div>
</template>

<script>
  import NavigationBar from '~/components/community/NavigationBar'
  import User from '~/components/community/summaryType/User'
  import AppQRCode from '~/components/AppQRCode'

  export default {
    layout: 'topic_summary',
    name: 'summary_type',
    data () {
      return {
        types: []
      }
    },
    components: {
      NavigationBar, User, AppQRCode
    },
    head () {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: 'coupons!'}
        ]
      }
    },
    async asyncData ({store, params}) {
      console.log(params)
      params.summaryType = 'question'
      await store.dispatch('getSummaryCatalog', params)
      return {title: `棒客-${store.getters.communityInfo.name}-${store.getters.communityInfo.summary_name}`}
    },
    created () {
      this.types = [
        {
          name_en: 'achieve',
          name_cn: '以回答'
        },
        {
          name_en: 'unrealized',
          name_cn: '等你来答'
        }
      ]
    }
  }
</script>

<style scoped lang="less">
</style>
