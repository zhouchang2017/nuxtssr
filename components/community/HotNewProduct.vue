<template>
  <div class="home-mian-right-block">
    <div class="home-mian-right-block-title">热门新机榜</div>
    <ul class="hot-ul">
      <div class="goTo">
        <a href="#">进入社区</a>
        <a href="#">进入百科</a>
      </div>

      <li v-for="n in 5">
        <div class="hot-ul-left">
          {{n}}月
          <i></i>
        </div>
        <div class="hot-ul-right">
          <a href="#"><img src="#"></a>
          <div class="hot-ul-right-name">
            name
            <span>上市时间：#月#日</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
