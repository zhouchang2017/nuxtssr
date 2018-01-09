<template>
  <div class="home-mian-right-block">
    <div class="home-mian-right-block-title">二手闲置<a href="#">更多&gt;</a></div>
    <ul class="Good-second-hand">

      <li v-for="item in items">
        <a href="#" class="goodPrice-img"><img :src="item.avatar"></a>
        <div class="goodPrice-content">
          <a href="#">{{item.title}}</a>
          <div class="goodPrice-content-money">
            <span>￥{{item.buy_price}}</span>
            <span><i class="iconfont icon-qudao"></i>京东</span>
            <span><i class="iconfont icon-chakan"></i>{{item.read_num}}</span>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
