<template>
  <summary-list/>
</template>

<script>
  import SummaryList from '~/components/community/SummaryList'

  export default {
    middleware: 'communitySub',
    components: {
      SummaryList
    },
    // scrollToTop: true,
    data () {
      return {}
    },
    methods:{

    },
    async fetch ({store, params, query}) {
      console.log('内嵌路由数据加载')
      await store.dispatch('getCommunitySubListPage', {params, query})
      console.log('内嵌路由数据加载完成')
    },
    watch: {
      // '$route': 'fetch'
    }
  }
</script>

<style scoped>

</style>
