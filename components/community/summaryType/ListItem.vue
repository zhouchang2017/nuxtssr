<template>
  <div v-if="loading">
    <div class="dileItem_l">
      <a href="#"><img class="bk-img" :src="item.avatar" alt=""/></a>
    </div>
    <component v-bind:is="contentType" :item="item">
      {{item.published_at | timeLL}}
    </component>
  </div>
</template>
<script>
  import CouponsContentItem from './CouponsContentItem'
  import IdleContentItem from './IdleContentItem'

  export default {
    components: {
      CouponsContentItem, IdleContentItem
    },
    props: {
      item: [Object, Array],
      type: {
        type: String,
        default: 'coupons'
      }
    },
    data () {
      return {
        loading: false,
        itemClass: false
      }
    },
    methods: {
      // 首字母大写
      firstUpperCase ([first, ...rest]) {
        return first.toUpperCase() + rest.join('')
      }
    },
    created () {
      this.loading = true
    },
    computed: {
      contentType () {
        return `${this.firstUpperCase(this.type)}ContentItem`
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
