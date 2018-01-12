<template>
  <article class="masterpiece-main" role="main">
  <component v-bind:is="$route.params.summaryType">
    <nuxt-child/>
  </component>
  </article>
</template>

<script>
  export default {
    layout: 'topic_summary',
    name: 'summary_type',
    data () {
      return {}
    },
    components: {
      'exhibition': () => import('~/components/community/summaryType/page/exhibition')
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
      await store.dispatch('getSummaryCatalog', params)
      return {title: `棒客-${store.getters.communityInfo.name}-${store.getters.communityInfo.summary_name}`}
    }
  }
</script>

<style scoped>

</style>
