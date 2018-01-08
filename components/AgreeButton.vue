<template>
    <button  :class="[agree ? `${this._class[1]} ${this._class[0]}` : this._class[0]]" @click="toAgree">
        <i class="icon-happy iconfont" :class="[agree ? 'icon-xihuanCheck' : 'icon-xihuan']"></i>{{agree_num}}
    </button>
</template>
<script>
    /*
     喜欢按钮
     接受参数:
     id:评论id Number require
     _agree:喜欢状态 Number(Boolean) require
     _agree_num:喜欢数量 Number require
     _class:按钮样式 Array arr[0]未点击样式 arr[1]点击样式

     */

    export default {
        props: {
            id: Number,
            _agree: [Number, Boolean],
            _agree_num: Number,
            _class:{
                type:Array,
                default:()=>['floor-fabulous','fabulousShow']
            },
            type:String
        },
        data() {
            return {
                agree: false,
                agree_num:0
            }
        },
        methods: {
            toAgree() {
                axios.patch(this.$api.comment.agree(this.type,this.id), {
                    agree: this.agree,
                    agree_num: this.agree_num
                })
                    .then(res => {
                        console.log(res)
                        if (res.data.state) {
                            this.agree = !this.agree
                            this.agree_num = res.data.agree_num
                        } else {
                            //错误处理
                        }
                    })
            }
        },
        mounted() {
            this.agree = !!this._agree
            this.agree_num = this._agree_num
        }
    }
</script>
<style scoped>
    .like-num {
        display: block;
    }
</style>
