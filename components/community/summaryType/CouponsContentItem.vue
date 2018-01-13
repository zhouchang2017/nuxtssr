<template>
  <div class="dileItem_r bk-interception" :class="{'goodPrice_dele': type == 'coupons' && !!item.is_shelve}">
    <a href="#">
      <h2><span>已失效</span>{{`【${item.product_catalog_name}】${item.title} `}}</h2>
    </a>
    <div class="dileItem_rCont" v-if="type==='coupons'">
      <div class="dileItem_picker" v-if="item.type === 'coupons' ">
        <a href="#">优惠劵</a>
      </div>
      <div class="dileItem_picker" v-else>
        {{item.price}}
        <small>元</small>
        <i v-show="item.is_baoyou">包邮</i>
      </div>
      <div class="dileItem_labelling"><i class="icon iconfont icon-qudao"></i>...</div>
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
        <i class="icon iconfont icon-dianzan1"></i>
        <span>{{item.agree_num}}</span>
        <i class="icon iconfont icon-dianzan1 dianzan1"></i>
        <span>{{item.disagree_num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'coupons-content-item',
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
      type () {
        return 'coupons'
      }
    }
  }
</script>

<style scoped>
  .dileItem_r h2 span {
    display: none;
    font-weight: normal;
    width: 60px;
    padding: 2px 0;
    font-size: 14px;
    background-color: #ccc;
    color: #999;
    border-radius: 4px;
    text-align: center;
  }

  div.goodPrice_dele h2 span {
    display: inline-block;
  }

  .idle .idel_left .idel_l_title .idle_bigCon .idle_con .idel_con_ul li div.goodPrice_dele h2 {
    color: #999;
    text-decoration: line-through;
  }

  .icon-dianzan1 {
    margin-left: 10px;
  }

  .dianzan1 {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg); /* Internet Explorer */
    -moz-transform: rotate(180deg); /* Firefox */
    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
    -o-transform: rotate(180deg); /* Opera */
  }

  .dileItem_picker i {
    font-style: normal;
    font-size: 12px;
    color: #666;
  }

  .dileItem_labelling {
    color: #fc7600;
    margin-top: 4px;
  }

  .dileItem_labelling i {
    font-size: 14px;
    margin-right: 4px;
  }

  .dileItem_picker a {
    color: #ff3333;
    font-size: 16px;
  }
</style>
