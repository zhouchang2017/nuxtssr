<template>
  <div>
    <div class="floor-answer-show">
      <span class="report-comments" @click="report">举报</span>
      <span class="report-comments">|</span>
      <span>{{created_at|timeLL}}</span>
      <span>|</span>
      <span class="floor-answer-reply" @click="showReplyBox">{{replyDesc}}</span>
    </div>
    <div class="floor-reply-box" v-if="isShow" style="display: block; ">
      <div class="triangle-up">
        <b></b>
      </div>
      <div class="floor-reply-box-user" :id="'reply-box'+ reply_id">
          <!--<transition-group v-if="replies.length!=0" class="floor-reply-box-user-ul" v-bind:name="transitionName" tag="ul">-->
          <ul v-if="replies.length!=0" class="floor-reply-box-user-ul" >
            <li style="display: block;" v-for="(reply,index) in replies" :key="reply.id">
              <a href="#" class="floor-reply-left"><img :src="reply.user.avatar"></a>
              <div class="floor-reply-right">
                <span class="floor-user-name">{{reply.user.nickname}}</span>
                <div class="floor-contenter">
                  <div v-if="reply.recv_user_id>0" style="display: inline-block;">
                    回复
                    <a style="color:#66b8fd;" :href="`user/${reply.recv_user_id}`">
                                    {{reply.recv_user.nickname}}
                                </a>:
                  </div>
                  {{reply.content}}
                </div>
                <div class="floor-answer-show">
                  <span>{{reply.created_at|timeLL}}</span>
                  <span class="Reactor-building-reply" @click="call(index,reply)">回复</span>
                  <span class="Reactor-building-delete" @click="delReply(reply)">删除</span>
                </div>
                <div class="floor-answer-more" v-show="reply_num>=2 && !clicked && index==0">
                  还有{{reply_num-1}}条回复，<a class="reply-click-more" @click.once="showMore()">点击查看</a>
                </div>
              </div>
            </li>
          </ul>
        <!--</ul>-->
        <pagination v-if="clicked" :total="pageInfo.total" :page-size="pageInfo.per_page" :callback="pageChanged" :options="paginationOptions" nav-class="padding-10" ul-class="floor-answer-Inputbox" li-class="txt-color-blue">
        </pagination>
        <div class="floor-answer-Inputbox" :id="'inputBox'+ reply_id">
          <input type="text" v-focus="focusState" v-model="content" @keyup.enter="add" placeholder="随便回复点什么吧~" />
          <div class="floor-answer-show">
            <i class="icon-happy icon-size"></i>
            <button class="Reactor-building-reply-btn" @click="add">回复</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from 'vue-pagination-bootstrap'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  components: {
    pagination
  },
  props: {
    //初始回复数据
    initReply: {
      type: Object
    },
    //好像现在这个参数没什么作用
    _created_at: String,
    //自定义显示回复api
    commentShowPath: String,
    //自定义回复api
    commentReplyStorePath: String,
    //作者
    author:Number,
    //类型 article / community / masterpiece ...
    type:String,
    cur_user:{
        type:Number,
        default:0
    }
  },
  data() {
    return {
      clicked: false,
      replies: [],
      content: '',
      isShow: false,
      focusState: false,
      reply_num: 0,
      created_at: '',
      reply_id: null,
      recv_user_id: 0,
      callNameLength: '',
      pageInfo: {},
      paginationOptions: { // Not required to pass this configurations
        offset: 2,

        alwaysShowPrevNext: true
      },
      transitionName: 'list'
    }
  },
  methods: {
    add() {
      if(this.author == this.cur_user){
          this.$notify({text:'自娱自乐!不太好',group:'tips'})
          return false
      }
      let data = {
        'recv_user_id': this.recv_user_id,
        'content': this.content.substr(this.callNameLength)
      }
      axios.post(this.addCommentReplyUrl, data).then(res => {
          if (res.status === 201) {
            this.$notify({
              group: 'tips',
              type:'success',
              title: res.data.msg,
              text: res.data.reply.content
            })

            this.replies.push(res.data.reply)
            this.content = ''
          }
        }).catch(err => {
          console.log(err)
          this.content = ''
        })
        //                this.replies.push(temp)

    },
    showReplyBox() {
        this.isShow = !this.isShow
    },
    showMore() {
      this.getMore()
    },
    delReply(reply, isFirst = false) {
      if (isFirst) {
        this.clicked = true
      } else {
        console.log(reply)
        this.replies = this.replies.filter(item => item !== reply)
          //TODO 删除评论
      }
    },
    call(index, reply) {
      this.scrollInputBox()
      this.focusState = true
      this.content = `回复 ${reply.user.nickname} : `
      this.callNameLength = this.content.length
      this.recv_user_id = reply.user.user_id
    },

    scrollInputBox() {
      let boxtop = $('#inputBox' + this.reply_id).offset().top
      let screenH = window.screen.availHeight * 0.5
      $('html body').animate({
        scrollTop: boxtop - screenH
      }, 700);
    },
    pageChanged(page) {

      this.getMore(page)
    },
    getMore(page = 1) {
      axios.get(`${this.getCommentUrl}?page=${page}`)
        .then(res => {
          let replyList = res.data.data
            //保存分页对象
          this.pageInfo = res.data
          this.replies = replyList
          this.clicked = true
            let el = $('#reply-box'+ this.reply_id).offset().top
            $('html body').animate({
                scrollTop: el
            }, 700)
        })
    },

    //举报
    report(){
      this.$root.Bus.$emit('clickReportReply',{content_primary_key:this.reply_id,content_type:this.type})
    }
  },
  computed: {
    replyDesc() {
      return this.isShow ? '收起回复' : '回复'
    },
    getCommentUrl() {
      if (this.commentShowPath) {
        return this.commentShowPath
      }
      return this.$api.reply.index(this.type,this.reply_id)
    },
    addCommentReplyUrl() {
      if (this.commentReplyStorePath) {
        return commentReplyStorePath
      }
      return this.$api.reply.store(this.type,this.reply_id)
    }
  },
  mounted() {
    this.created_at = this._created_at || this.initReply.created_at
    this.reply_num = this.initReply.reply_num
    this.reply_id = this.initReply.id
    if (this.initReply.replies) {
      this.replies.push(...this.initReply.replies)
    }
    this.user = this.initReply.user
  },
  directives: {
    focus: {
      update: function(el, {
        value
      }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  filters: {
    timeLL: function(value) {
      //                return moment(value).format('MM-DD h:mm')
      return moment(value).fromNow()
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

.floor-reply-box {
  min-height: 0px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

{
  transform: translateX(10px);
  opacity: 0;
}
</style>
