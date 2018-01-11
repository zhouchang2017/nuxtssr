<template>
    <summary-list/>
</template>

<script>
  import SummaryList from '~/components/community/SummaryList'

  export default {
    // middleware: 'communitySub',
    components: {
      SummaryList
    },
    scrollToTop: true,
    data () {
      return {}
    },
    async fetch ({store, query}) {
      console.log('内嵌路由数据加载')
      await store.dispatch('getCommunitySubListPage', query)
    }
  }
</script>

<style scoped>

</style>
