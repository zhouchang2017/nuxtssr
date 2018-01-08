<template>
  <button class="like-articles" @click="toCollected">
    <i class="iconfont icon-shoucang" v-show="!collected"></i>
    <span class="like" v-show="!collected">收藏</span>
    <span class="like-num" v-show="collected">{{collect_num}}</span>
  </button>
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
    _collected: [Number, Boolean],
    _collect_num: Number,
    type:String
  },
  data() {
    return {
      collected: true,
      collect_num: 0
    }
  },
  methods: {
    toCollected() {
      axios.patch(this.$api.collect.update(this.type,this.id), {
          collected: this.collected,
          collect_num: this.collect_num
        })
        .then(res => {
          console.log(res)
          if (res.data.state) {
            this.collected = !this.collected
            this.collect_num = res.data.collect_num
          } else {
            //错误处理
          }
        })
    }
  },
  mounted() {
    this.collected = !!this._collected
    this.collect_num = this._collect_num
  },

    watch:{
      _collect_num(v){
          this.collect_num = this._collect_num
      }
    }
}
</script>
<style scoped>
.like-num {
  display: block;
}
</style>
