<template>
    <div>
        <div class="masterpiece-main">
            <div class="masterpiece-main-top">
                <info/>
                <user/>
            </div>
            <div class="masterpiece-main-content">
                <navigation-bar :types="types" :hasAll="false"/>
                <slot></slot>
            </div>
            <!--<layer-post-details />-->
        </div>
    </div>
</template>

<script>
  import NavigationBar from '~/components/community/NavigationBar'
  import info from '../info'
  import user from '../user'
  // import LayerPostDetails from '~/components/LayerPostDetails'

  export default {
    components: {NavigationBar, info, user},
    name: 'exhibition',
    data () {
      return {
        types: []
      }
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
