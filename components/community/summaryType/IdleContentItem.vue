<template>
  <div class="dileItem_r bk-interception">
    <a href="#">
      <h2>{{item.title}}</h2>
    </a>
    <div class="dileItem_rCont">
      <div class="dileItem_picker">{{item.buy_price}}
        <small>元</small>
      </div>
      <div class="dileItem_labelling">
        <span class="dileItem_Li" v-for="lab in labs">{{ lab.name }}</span>
      </div>
    </div>
    <div class="dileItem_bt">
      <div class="dileItem_aurth"><i class="icon iconfont icon-touxiang"></i><span class="bk-interception">{{item.user.nickname}}</span>
      </div>
      <div class="dileItem_time">
        <slot></slot>
      </div>
      <div class="dileItem_right">
        <i class="icon iconfont icon-chakan"></i>
        <span>{{item.read_num}}</span>
        <i class="icon iconfont icon-pinglun"></i>
        <span>{{item.comment_num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "idel-content-item",
    data () {
      return {}
    },
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      labs () {
        let xianyu = this.item.xy_link.length > 0 ? {name: '闲鱼', url: this.item.xy_link} : false
        let zhuanzhuan = this.item.zz_link.length > 0 ? {name: '转转', url: this.item.zz_link} : false
        let tempArr = [xianyu, zhuanzhuan]
        return tempArr.filter(item => item)
      }
    }
  }
</script>

<style scoped>

</style>
