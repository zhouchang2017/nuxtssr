<template>
        <span :class="[collected ? `${this._class[1]} ${this._class[0]}` : this._class[0]]"  @click="toCollected" class="like">{{ text }}</span>
</template>
<script>
    /*
    收藏按钮
    接受参数:
    id:文章id Number require
    _collected:收藏状态 Number(Boolean) require
    _collect_num:收藏数量 Number require
     */

    export default {
        props: {
            id: Number, //文章id
            _text: {type:Array,default:()=>['+收藏问题','已收藏']},
            _collected: [Number,Boolean],
            // _collect_num: Number,
            type: String,
            _class:{type:Array,default:()=>['','']},
        },
        data () {
            return {
                collected: true,
                // collect_num: 0
            }
        },
        methods: {
            toCollected () {
                axios.patch (this.$api.collect.update (this.type,this.id),{
                    collected: this.collected,
                    // collect_num: this.collect_num
                })
                     .then (res => {
                         console.log (res)
                         if (res.data.state) {
                             this.collected = !this.collected
                             // this.collect_num = res.data.collect_num
                         } else {
                             //错误处理
                         }
                     })
            }
        },
        mounted () {
            this.collected = !!this._collected
            // this.collect_num = this._collect_num
        },
        computed:{
            text(){
                return this.collected ? this._text[1] : this._text[0]
            }
        },

        watch: {

        }
    }
</script>
<style scoped>
    .like-num {
        display: block;
    }
</style>
