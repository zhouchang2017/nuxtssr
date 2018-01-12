<template>
  <transition name="component-fade" mode="out-in" appear>
    <div v-show="showBlock">
      <div class="brokeShow-bg" @click="showBlock = !showBlock"></div>
      <div class="brokeShow" :style="styleBrokeShow">
        <!--评论区-->
        <div class="aritic-commentsSection magin-futop">
          <!--头部-->
          <div class="Comment-content-display">

            <user-avatar-media v-if="content.user" :user="content.user" :num-arr="numArr">
              <span slot="time">发布于: {{ content.published_at | timeLL}}</span>
              <button slot="fansButton" class="brok-fans">粉丝{{ content.user.fans_num }}</button>
            </user-avatar-media>

            <best-kit-swiper :image-list="content.images"></best-kit-swiper>
            <h4 class="aritic-Userstate-title">{{ content.title }}</h4>
            <div class="brok-byshow">
              <i></i>
              <span class="brok-buy"><i class="iconfont icon-zhuangbei"></i>入手价：{{ content.price }}元</span> 打分：
              <ul class="Star">
                <li v-for="n in content.score">
                  <i class="iconfont icon-wuxing"></i>
                </li>
              </ul>
              <span id="ratingCheck"></span>
              <input id="rating" name="serving" value="0" type="text" style="display: none;">
            </div>

            <!--是否推荐/吐槽-->
            <div class="recommendation-or-slots">
              <div class="recommendation-left">
                <h4 class="recomm-slots-title"><i class="iconfont icon-dianzan1"></i>推荐一下</h4>
                <div class="recomm-slots-content">
                  {{ content.recommend }}
                </div>
              </div>
              <div class="slots-right">
                <h4 class="recomm-slots-title"><i class="iconfont icon-dianzan1 slots-icon"></i>吐槽一下</h4>
                <div class="recomm-slots-content">
                  {{ content.oppose }}
                </div>
              </div>
            </div>
            <div class="article-content-Collection">
              <collect-button type="exhibition" :id="content.id" :_collected="content.is_collect"
                              :_collect_num="content.collect_num"></collect-button>
            </div>
          </div>

          <comment-list v-if="content.id" :id="content.id" type="exhibition"
                        :cur_user="content.user.user_id"></comment-list>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import UserAvatarMedia from '~/components/UserAvatarMedia'
  import BestKitSwiper from '~/components/swiper/BestKitSwiperA'
  import CollectButton from '~/components/CollectButton'
  import CommentList from '~/components/CommentList'

  export default {
    components: {
      UserAvatarMedia,
      BestKitSwiper,
      CollectButton,
      CommentList
    },
    name: 'layer-post-details',
    data () {
      return {
        showBlock: false,
        content: {},
        numArr: []
      }
    },
    methods: {
      findIcon (str) {
        let obj = {
          read_num: 'icon-chakan',
          comment_num: 'icon-pinglun',
          collect_num: 'icon-shoucang'
        }
        return obj.hasOwnProperty(str) ? obj[str] : obj.read_num
      }
    },
    mounted () {
      // $(".brokeShow").height($(window).height() - 100);
      // $(".brokeShow").css("margin-top", "-" + [($(window).height() / 2) - 50] + "px");
      console.log($(window).height())
      this.$root.Bus.$on('fadeshow', item => {
        console.log(item)
        this.showBlock = true
        this.$set(this, 'content', item)
        this.numArr = [
          {num: this.content.read_num, icon: this.findIcon('read_num')},
          {num: this.content.comment_num, icon: this.findIcon('comment_num')},
          {num: this.content.collect_num, icon: this.findIcon('collect_num')},
        ]
      })
    },
    filters: {
      timeLL: function (value) {
        return moment(value).format('MM-DD h:mm')
        // return moment(value).fromNow()
      }
    },
    computed: {
      styleBrokeShow () {
        return {
          height: `${$(window).height() - 100}px`,
          marginTop: `-${($(window).height() / 2) - 50}px`
        }
      }
    },
    watch: {
      showBlock (v) {
        v === true ?
          document.body.style.overflow = 'hidden' :
          document.body.style.overflow = 'auto'
      }
    }
  }


</script>

<style scoped>
  .brokeShow-bg {
    display: block;
  }

  .brokeShow {
    display: block;
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
