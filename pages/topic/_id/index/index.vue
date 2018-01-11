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
    data () {
      return {}
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
