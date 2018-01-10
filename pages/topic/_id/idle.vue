<template>
  <div class="idle">
    <section class="idel_left">
      <idle-all :types="_initData.types" :community_id="_initData.community_info.id" :type="_initData.type"
                :_initData="_initData.content"></idle-all>
    </section>
  </div>
</template>

<script>
  import summaryMixins from './summary_mixins'

  export default {
    mixin: [summaryMixins],
    layout: 'topic_summary',
    data () {
      return {}
    },
    head () {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: 'summary_page'}
        ]
      }
    }

  }
</script>

<style scoped>

</style>
