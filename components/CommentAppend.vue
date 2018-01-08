<template>
  <div>
    <li v-if="comments.length>0" v-for="comment in comments" class="Comment-content-display-ullis">
      <div class="floor-img">
        <a :href="`/user/${comment.user.user_id}`"><img :src="comment.user.avatar"></a>
        <button class="floor-fabulous">
          <i class="icon-dianzan"></i> 0
        </button>
      </div>
      <div class="floor-content-right">
        <div class="floor-user">
          <div class="floor-user-left">
            <span class="floor-user-name">{{comment.user.nickname}}</span>
            <div class="floor-user-more"></div>
          </div>
          <span class="floor-show">屋顶</span>
        </div>
        <div class="floor-contenter">
          {{comment.content}}
          <div class="floor-contenter-bigImg" style="display: none;"></div>
          <ul class="floor-contenter-ul">
            <li v-for="image in comment.images" class="floor-contenter-ullis">
              <img :src="image">
            </li>
          </ul>
        </div>
        <div class="floor-answer">
          <reply-box :type="type" :init-reply="commentReply"></reply-box>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
import replyBox from './ReplyBox'
export default {
  components: {
    replyBox
  },
  props: {
    type:String
  },
  data() {
    return {
      comments: [],
      commentReply: {}
    }
  },
  methods: {
    mockCommentReply(comment){
       comment.is_agree = false
       comment.agree_num = 0
       comment.agree_users = []
       comment.first_reply_id = 0
       comment.is_agree = false
       comment.replies = null
       comment.reply_num = 0
       comment.user_id = comment.user.user_id
       return comment
    }
  },
  computed: {

  },
  mounted() {
    this.$root.Bus.$on('pushComment', (comment) => {
        this.$set(this,'commentReply',this.mockCommentReply(comment))
        this.comments.push(comment)

    })
  },
  filters: {
    timeLL: function(value) {
      //                return moment.unix(value).format('MM-DD h:mm')
      return moment.unix(value).fromNow()
    }
  },
  beforeDestroy() {
    this.$root.Bus.$off('pushComment')
  },
    watch:{
        comments(l){
            window.getImgLength()
        }
    }
}
</script>
<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all .5s;
}

.list-enter,
.list-leave-to
/* .list-leave-active for below version 2.1.8 */

{
  opacity: 0;
  transform: translateY(30px);
}
</style>
