<template>
    <div>
        <!--<div v-if="item.AnswerState">-->
        <span class="question_name">{{item.user.nickname}}</span>
        <a class="question_title" href="#"><h2>{{item.title}}</h2></a>
        <span class="question_Participate">...等...人参与了评论</span>
        <div class="question_con">
            <div class="question_con_left">
                <div class="question_con_lHead">
                    <img class="bk-img" :src="item.user.avatar" alt=""/>
                    <user-info :userInfo="item.user"></user-info>
                </div>
                <agree-button v-if="item.comment" :type="type" :id="item.comment.id" :_agree="false" :_agree_num="item.comment.agree_num"></agree-button>
                </div>
            <div class="question_con_right">
                <div class="question_con_rCon">
                    <a class="answerName bk-interception" href="#">{{item.user.nickname}}</a>
                    <i class="lvThree level">LV.{{item.user.level}}</i>
                    <img class="answerIdentity" src="../../assets/img/identification.png" alt=""/>
                </div>
                <div class="answer_Con answer_all"></div>
                <div class="answer_Con answer_inter" v-if="item.comment" v-html="content">
                </div>
                <span v-if="item.comment" class="wordClick"  @click="pickUp = !pickUp">
                    {{pickUp ? '...展开全部' : '收起'}}
                    </span>
                <div v-show="!pickUp">
                    <ul v-if="item.comment && item.comment.avatar" class="home-list-content-img">
                        <li><img :src="item.comment.avatar"></li>
                    </ul>
                </div>
                <!--<span class="wordClick" @click="showAll(ins)" v-show="item.wordShow">{{item.word}}</span>-->
                <div class="question_liBottom">
                    <div class="question_li_left">
                        <!--<a href="#" class="question_labelling">{{item.labelling}}</a>-->
                        <a v-for="tag in item.tags" href="#">{{ tag.name }}</a>
                    </div>
                    <div class="question_li_right">
                        <span class="question_li_time">{{item.time}}</span>
                        <a href="#">
                            <i class="icon iconfont icon-pinglun"></i>
                            <span>{{item.comment_num}}条回答</span>
                        </a>
                        <collect-button-by-text :_class="['addQuestion']" :type="type" :id="item.id" :_collected="item.is_collect"></collect-button-by-text>
                        <!--<span class="addQuestion" @click="addAuestion(ins)">{{item.addQuestion}}</span>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CollectButtonByText from '~assets/imgCollectButtonByText';
    export default {
        name: "list-item-question",
        props: {
            type: String,
            item:Object
        },
        components: {
            'agree-button': () => import('~assets/imgAgreeButton'),
            'user-info': () => import('~assets/imguser/UserInfo'),
            CollectButtonByText
        },
        data () {
            return {
                pickUp : true ,   //内容展开收起状态
                num : 70 ,
            }
        },
        computed:{
            content() {
                if (this.item.comment) {
                    //如果存在描述
                    let desc = this.item.comment.content
                    if (this.pickUp) {
                        //当前展开状态如果为收起
                        if (desc.length > this.num) {
                            //如果大于70个字，则收起
                            let imgReg = /<img[^>]+>/g;
                            let str = desc.replace(imgReg,'[图片]')
                            return str.slice(0 , this.num)
                        }
                    }
                    return desc
                }
                return false
            }
        }
    }
</script>

<style scoped>

</style>
