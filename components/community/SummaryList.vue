<template>
  <div>
    <div class="home-list">
      <ul class="home-list-ul" v-if="communityBody.data.length!== 0">
        <li v-for="item in communityBody.data" :key="`${item.article_type}_${item.content_type}_${item.id}`">
          <community-list-item :_itemData="item"/>
        </li>
      </ul>
      <div class="home-list-ul" v-else>
        <div>暂无帖子！</div>
      </div>
    </div>

    <div class="home-page" v-if="communityBody.last_page > 1">
      <pagination :total="communityBody.total" :page-size="communityBody.per_page" :callback="pageChanged"
                  :options="paginationOptions" nav-class="padding-10" ul-class="floor-answer-Inputbox"
                  li-class="txt-color-blue">
      </pagination>
    </div>
  </div>
</template>

<script>
  import CommunityListItem from './CommunityListItem'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'summary-list',
    components: {
      CommunityListItem
    },
    props: {
      getResource: String
    },
    data () {
      return {
        paginationOptions: { // Not required to pass this configurations
          offset: 2,
          alwaysShowPrevNext: true
        },
        LastPage: null
      }
    },
    methods: {
      ...mapActions({
        getListPage: 'getCommunitySubListPage'
      }),
      pageChanged (page) {
        // 记录上一次页码
        this.LastPage = page
        this.$router.push({query: {page: page}})
        this.getListPage({type: this.$route.query.filter || 'all', page})
        this.scroll()
      },
      scroll () {
        let boxtop = $('#home-list-type').offset().top
        $('html body').animate({
          scrollTop: boxtop
        }, 700);
      }
    },
    computed: {
      ...mapGetters(['communityBody'])
    }
  }
</script>

<style scoped>

</style>
