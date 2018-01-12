<template>
    <div class="Comment-content-display">
        <transition name="component-fade">
            <masterPieceCommentSkeleton v-if="loading"></masterPieceCommentSkeleton>
            <ul class="review-layer-right-ul" v-else>
                <li v-for="item in comments.data" :key="item.id">
                    <div class="review-layer">
                        <div class="review-layer-img">
                            <a href="#" class="review-layer-img-show">
                                <progressive-img :src="item.user.avatar" :placeholder="loadingGif" />
                            </a>
                            <agree-button :id="item.id" :_agree_num="item.agree_num" :type="type" :_agree="item.is_agree"></agree-button>
                            <!--<button class="floor-fabulous">-->
                            <!--<i class="icon-happy iconfont icon-xihuan"></i>{{item.agree_num}}-->
                            <!--</button>-->
                        </div>
                        <div class="review-layer-right">
                            <div class="review-layer-top">
                                <div class="review-layer-user">
                                    <span class="floor-user-name">{{item.user.nickname}}</span>
                                    <div v-if="item.agree_users" class="floor-user-more">
                                        <span v-for="(agree_user,ind) in item.agree_users" v-if="ind<1">{{agree_user.nickname}}</span>等{{item.agree_users.length}}人赞同
                                    </div>
                                </div>
                                <span class="review-layer-floor">{{item.floor_num}}楼</span>
                            </div>
                            <div class="review-layer-content">
                                {{item.content}}
                            </div>
                            <div class="floor-answer">
                                <reply-box :init-reply="item" :cur_user="cur_user" :type="type"></reply-box>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </transition>
        <div v-if="comments.total>=32" class="article-page">
            <pagination :total="comments.total" :page-size="comments.per_page" :callback="pageChanged"
                        :options="paginationOptions" nav-class="padding-10" ul-class="floor-answer-Inputbox"
                        li-class="txt-color-blue">
            </pagination>
        </div>
    </div>
</template>

<script>
    import masterPieceCommentSkeleton from './masterPieceCommentSkeleton'
    import replyBox from '~assets/imgReplyBox'
    import pagination from 'vue-pagination-bootstrap'
    import agreeButton from '~assets/imgAgreeButton'
    import loadingGif from '@a/img/loading.gif'

    export default {
        name : "comment-list" ,
        props : {
            id : Number ,
            _submitUrl : String ,
            type : {
                type : String ,
                default : 'masterpiece'
            } ,
            cur_user : {
                type : Number ,
                default : 0
            }
        } ,
        data() {
            return {
                loading : true ,
                comments : {} ,
                paginationOptions : { // Not required to pass this configurations
                    offset : 2 ,
                    alwaysShowPrevNext : true
                } ,
                commentContent : '',
                loadingGif
            }
        } ,
        components : {
            replyBox ,
            pagination ,
            agreeButton ,
            masterPieceCommentSkeleton
        } ,
        methods : {
            pageChanged(page) {
                this.getMore(page)
            } ,
            getMore(page) {
                this.loading = true
                axios.get(`${this.getCommentUrl}?page=${page}`)
                     .then(res => {
                         this.comments = res.data
                         this.loading = false
                     })
            } ,
            submitComment() {
                if (this.canSubmit) {
                    this.$notify({group : 'tips' , type : 'error' , text : '内容不能为空'})
                    return false
                }
                axios.post(this.submitUrl , {
                    commentContent : this.commentContent
                })
                     .then(res => {
                         if (res.status === 201) {
                             this.comments.data.unshift(this.mockReply(res))
                             this.$notify({group : 'tips' , type : 'success' , text : '发布成功'})
                             this.commentContent = ''
                         }
                     })
            } ,
            mockReply(res) {
                res.data.agree_num = 0
                res.data.agree_users = []
                res.data.first_reply_id = 0
                res.data.floor_num = '屋顶'
                res.data.is_agree = false
                res.data.reply_num = 0
                res.data.user_id = res.data.user.user_id
                return res.data
            }
        } ,
        computed : {
            getCommentUrl() {
                if (this.commentShowPath) {
                    return this.commentShowPath
                }
                return this.$api.comment.index(this.type , this.id)
            } ,
            submitUrl() {
                return this._submitUrl || this.$api.comment.store(this.type , this.id)
            } ,
            canSubmit() {
                return this.commentContent.length < 1
            }
        } ,
        mounted() {
            axios.get(this.getCommentUrl)
                 .then(res => {
                     if (res.status === 200) {
//            res.data.forEach(item=>item.)
                         this.comments = res.data
                         this.loading = false
                     }
                 })
        },
        watch:{
            id(v){
                this.loading = true
                axios.get(this.getCommentUrl)
                     .then(res => {
                         if (res.status === 200) {
                             this.comments = res.data
                             this.loading = false
                         }
                     })
            }
        }
    }
</script>
<style scoped>
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }

    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active for below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
