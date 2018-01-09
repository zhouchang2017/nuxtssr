<template>
    <div v-if="loading">
        <div class="home-list-user" @mouseout="isShow = false">
            <div class="home-list-user-img">
                <img @mouseover="isShow = true" :src="itemData.user.avatar" class="userImg-size user-size"/>
                <div v-show="isShow" class="listUser-block" @mouseover="isShow = true">
                    <!--三角形-->
                    <div class="triangle_border_left">
                        <span></span>
                    </div>
                    <div class="listUser-block-top">
                        <a :href="`user/${authorInfo.user_id}`" class="listUser-block-img"><img
                                :src="authorInfo.avatar"></a>
                        <div class="listUser-block-user">
                            <span>{{authorInfo.nickname}}</span><span
                                class="user_grade lvZero">LV.{{authorInfo.level}}</span><img
                                src="../../assets/img/identification.png">
                            <p>简介：不吃鱼的猫</p>
                        </div>
                    </div>
                    <div class="listUser-block-btn">
                        <ul class="listUser-block-btn-ul">
                            <li>
                                <p>{{authorInfo.publish_num}}</p>
                                <p>帖子</p>
                            </li>
                            <li>
                                <p>{{authorInfo.fans_num}}</p>
                                <p>粉丝</p>
                            </li>
                            <li>
                                <p>{{authorInfo.praised_num}}</p>
                                <p>收获收藏</p>
                            </li>
                        </ul>
                        <div class="listUser-block-btn-right">
                            <a href="#" class="listUser-block-youxiang"><i class="iconfont icon-youxiang-copy"></i></a>
                            <!--<button class="listUser-block-guanzhu">关注</button>-->
                            <follow-button v-on:followed="followed" :id="authorInfo.user_id"
                                           :_followed="authorInfo.followed"
                                           :_class="['listUser-block-guanzhu',' listUser-block-yiguanzhu']"></follow-button>
                        </div>
                    </div>
                </div>
            </div>
            <span class="sixsix middle-show">{{itemData.user.nickname}}</span>
        </div>
        <h4 class="home-list-title"><a href="#">【{{itemData.hasOwnProperty('summary_catalog') ?
            itemData.summary_catalog.name_cn : itemData.article_type | toZhCn}}】{{itemData.title}}</a></h4>
        <component v-bind:is="articleType" :itemData="itemData">
        </component>
    </div>
</template>

<script>
  import FollowButton from '~/components/FollowButton'
  import MixTypeItem from '~/components/community/MixTypeItem'
  import ImageTypeItem from '~/components/community/ImageTypeItem'
  import VideoTypeItem from '~/components/community/VideoTypeItem'
  import axios from 'axios'
  import api from '~/util/api.config'
  
  export default {
    components: {
      FollowButton, MixTypeItem, ImageTypeItem, VideoTypeItem
    },
    props: {
      _itemData: [Object, Array]
    },
    data () {
      return {
        onlyVideo: false,
        itemData: {},
        loading: false,
        pickUp: false,
        isShow: false,
        authorInfo: {}
      }
    },
    methods: {
      clickType (type) {
        this.activeType.active = false
        type.active = true
      },
      followed (status) {
        this.authorInfo.followed = status
      },
      async setUserInfo () {
        let res = await axios.get(api.user.getUserInfo(this.itemData.user_id))
        if (res.data.state) {
          this.authorInfo = res.data.user
        }
      },
      //首字母大写
      firstUpperCase ([first, ...rest]) {
        return first.toUpperCase() + rest.join('')
      }
    },
    computed: {
      activeType () {
        let [active] = this.listType.filter(item => item.active)
        return active
      },
      postDesc () {
        if (this.itemData.hasOwnProperty('description')) {
          return false
        }
        return this.pickUp ? this.itemData.description.slice(0, 30) : this.itemData.description
      },
      articleType () {
        if (!this.itemData.hasOwnProperty('content_type')) {
          return 'MixTypeItem'
        }
        if (this.itemData.hasOwnProperty('content_type') && this.itemData.hasOwnProperty('summary_catalog') && this.itemData.summary_catalog.name_en === 'masterpiece') {
          return 'MixTypeItem'
        }
        return `${this.firstUpperCase(this.itemData.content_type)}TypeItem`
      }
    },
    created () {
      this.itemData = this._itemData
      // this.itemData.image_list = this.itemData.images && eval(this.itemData.images) || []
      this.loading = true
    },
    watch: {
      isShow (v) {
        if (v) {
          Object.keys(this.authorInfo).length === 0 && this.setUserInfo()
        }
      }
    },
    filters: {
      toZhCn (value) {
        switch (value) {
          case 'evaluate':
            return '评测'
            break
          case 'experience':
            return '体验'
            break
          case 'strategy':
            return '攻略'
            break
          case 'message':
            return '资讯'
            break
          case 'masterpiece':
            return '作品'
            break
          default:
            return value
        }
      }
    }
  }
</script>

<style scoped>
    .listUser-block {
        display: block;
        width: 264px;
        height: 125px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 50px;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
    }

    .home-list-user .home-list-user-img:hover .listUser-block {
        display: block;
    }
</style>
