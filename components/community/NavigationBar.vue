<template>
    <div v-if="isShow" class="home-mian-left-block">
        <ul class="home-list-title-ul" id="home-list-type">
            <li v-for="item in listType" :key="item.id" :class="{'listcheck':item.active}" @click="clickType(item)">
                {{item.name_cn}}
            </li>
            <div class="float-right marginTop checkboxShow">
                <input type="checkbox" v-model="onlyVideo" class="box-lab"/><label class="box-lab"></label>只看视频
            </div>
        </ul>
        <div class="home-list">
            <slot></slot>
        </div>

        <div class="home-page">
            分页
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import api from '~/util/api.config'

  export default {
    props: {
      _initData: [Object, Array],
      types: Array,
      id: [Number, String],
      isShow: {
        type: [Number, Boolean],
        default: true
      },
      isSquare: {
        type: [Number, Boolean],
        default: false
      }
    },
    data () {
      return {
        loading: false,
        onlyVideo: false,
        listType: [],
        initData: {},
        paginationOptions: { // Not required to pass this configurations
          offset: 2,
          alwaysShowPrevNext: true
        },
        summary_catalog_id: null,
        typesLastPage: {},
        isChoice: 1   // 是否精选内容
      }
    },
    methods: {
      clickType (type) {
        this.activeType.active = false
        type.active = true
        this.summary_catalog_id = type.summary_catalog_id
        let page = this.typesLastPage.hasOwnProperty([type.name_en]) ? this.typesLastPage[type.name_en] : 1
        this.$router.push({query: {filter: type.name_en}})
        // console.log(type)
        // this.getResources(type, page)
        // history.pushState({}, 0, `${this.$route.path}?filter=${type.name_en}`)
      },
      async getResources (type, page = 1) {
        this.loading = false
        // 判断是否已加载数据
        if (this.initData.hasOwnProperty(type.name_en)) {
          // 判断是否获取分页数据
          if (this.initData[type.name_en].current_page == page) {
            // 以有数据，不发送新请求
            this.loading = true
            return false
          }
          // 加载分页数据
        }
        let res
        if (this.isSquare) {
          res = await axios.get(`${api.community.getArticle(this.id, type.id)}?page=${page}`)
        } else {
          res = await axios.post(api.article.getArticleListByCommunityIdWithType(this.id, type.name_en),
            {
              param: {is_choice: this.isChoice},
              page
            }
          )
        }
//                this.initData = Object.assign({}, this.initData, res.data)
        this.$set(this.initData, type.name_en, res.data)
        this.loading = true
      },
      pageChanged (page) {
        // 记录上一次页码
        this.typesLastPage[this.activeType.name_en] = page
        this.getResources(this.activeType, page)
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
      activeType () {
        let [active] = this.listType.filter(item => item.active)
        return active
      }
    },
    beforeCreate () {
    },
    created () {
      this.loading = false
      let filter = this.$route.query.hasOwnProperty('filter') ? this.$route.query.filter : 'all'
      this.listType.push({summary_catalog_id: 0, name_en: 'all', name_cn: '全部'})
      this.listType.push(...this.types)
      this.listType = this.listType.map((item) => {
        item.active = item.name_en === filter
        return item
      })
      this.$set(this.initData, filter, this._initData)
      this.loading = true
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>