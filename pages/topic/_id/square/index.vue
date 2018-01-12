<template>
  <summary-list/>
</template>

<script>
  import SummaryList from '~/components/community/SummaryList'

  export default {
    middleware: 'communitySquare',
    components: {
      SummaryList
    },
    data () {
      return {}
    },
    async fetch ({store, params, query}) {
      console.log('内嵌广场路由数据加载')
      let _with = {'with': ['tags']}
      await store.dispatch('getCommunitySubListPage', {params, query, is_choice: null, _with})
      console.log('内嵌广场路由数据加载完成')
    }
  }
</script>

<style scoped>

</style>
