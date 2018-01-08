<template>
  <div style="display: inline-block">
    <button @click="toFollow" :class="[followed ? `${this._class[1]} ${this._class[0]}` : this._class[0]]">{{follow}}</button>
  </div>
</template>
<script>
/*
关注按钮
接受参数:
id:用户id Number require
_followed:关注状态 Number(Boolean) require
_class:按钮样式 Array arr[0]未点击样式 arr[1]点击样式
title:文字 Array arr[0]未点击文字 arr[1]点击后的文字
 */
export default {
  components: {},
  props: {
    id: Number,
    _followed: [Number, Boolean],
    _class:{
        type:Array,
        default:()=>['user-state','user-state-show']
    },
    title:{
      type:Array,
      default:()=>['已关注','+关注']
    },
    reqPath:{
        type:Array,
        default:()=>['user','follow']
    },
    type:String,
    followedNum:Number
  },
  data() {
    return {
      followed: false,
    }
  },
  methods: {
    toFollow() {
      axios.patch(this.requestPath, this.RequestData)
        .then(res => {
            this.followed = !this.followed
            if(this.type){
                this.followedNum = res.data.collect_num
            }
            this.$emit('followed',this.followed)
        })
    }
  },
  computed: {
    follow() {
      return this.followed ? this.title[0] : this.title[1]
    },
    requestPath(){
        return this.type ? this.$api[this.reqPath[0]][this.reqPath[1]](this.type,this.id) :this.$api[this.reqPath[0]][this.reqPath[1]](this.id)
    },
    RequestData(){
      return this.type ? {collected: this.followed, collect_num: this.followedNum} : {followed: this.followed}
    }
  },
  mounted() {
    this.followed = this._followed
  }
}
</script>
<style scoped>
</style>
