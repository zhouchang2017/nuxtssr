<template>
<modal name="exhibition-comment" :scrollable="true"   height="75%" width="70%"  @before-open="beforeOpen">
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
                <collect-button type="exhibition" :id="content.id" :_collected="content.is_collect" :_collect_num="content.collect_num"></collect-button>
            </div>
        </div>

        <comment-list v-if="content.id" :id="content.id" type="exhibition" :cur_user="content.user.user_id"></comment-list>
    </div>
</modal>
</template>

<script>
    import UserAvatarMedia from '~assets/imgUserAvatarMedia'
    import BestKitSwiper from '~assets/imgswiper/BestKitSwiperA'
    import CollectButton from '~assets/imgCollectButton'
    import CommentList from '~assets/imgCommentList'
    import moment from 'moment'
    export default {
        components : {
            UserAvatarMedia,
            BestKitSwiper,
            CollectButton,
            CommentList
        },
        name : "exhibition-comment" ,
        data() {
            return {
                showBlock:false,
                content:{},
                numArr:[]
            }
        },
        methods:{
            findIcon(str){
                let obj = {
                    read_num:'icon-chakan',
                    comment_num:'icon-pinglun',
                    collect_num:'icon-shoucang'
                }
                return obj.hasOwnProperty(str) ? obj[str] : obj.read_num
            },
            beforeOpen(event){
                document.body.style.position='relative'
                this.renderModal(event.params.item);
            },
            renderModal(item){
                this.$set(this,'content',item)
                this.numArr = [
                    {num:this.content.read_num,icon:this.findIcon('read_num')},
                    {num:this.content.comment_num,icon:this.findIcon('comment_num')},
                    {num:this.content.collect_num,icon:this.findIcon('collect_num')},
                ]
            }
        },
        mounted(){
            this.$root.Bus.$on('fadeshow',item=>{
                console.log(item)
                //this.showBlock = true
                // this.$set(this,'content',item)
                // this.numArr = [
                //     {num:this.content.read_num,icon:this.findIcon('read_num')},
                //     {num:this.content.comment_num,icon:this.findIcon('comment_num')},
                //     {num:this.content.collect_num,icon:this.findIcon('collect_num')},
                // ]
            })
        },
        filters: {
            timeLL: function(value) {
                return moment(value).format('MM-DD h:mm')
                // return moment(value).fromNow()
            }
        },
        computed:{
            boxHeight(){
                return $(window).height() - 100
            }
        }
    }
</script>

<style scoped>
    .brokeShow{
        display: block;
    }
</style>
