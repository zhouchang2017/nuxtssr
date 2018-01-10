<template>
  <div class="home-mian-right-block">
    <div class="home-mian-right-block-title">社区动态</div>
    <ul class="dynamic-ul">
      <li>
        <div class="dynamic-left">
          <p class="dynamic-title">帖子发布</p>
          <p class="dynamic-title">回复总数</p>
        </div>
        <div class="dynamic-right">
          <p class="dynamic-title">1652篇</p>
          <p class="dynamic-title">152篇</p>
        </div>
      </li>
      <li>
        <div class="dynamic-left">
          <p><span class="dynamic-user">发布者自己</span> 发布了【装备秀】</p>
          <p>《除了双摄，我们还有啥？》</p>
        </div>
        <div class="dynamic-right">
          <p>刚刚</p>
        </div>
      </li>
      <li>
        <div class="dynamic-left">
          <p>张三 发布了【装备秀】</p>
          <p>《除了双摄，我们还有啥？》</p>
        </div>
        <div class="dynamic-right">
          <p>2分钟前</p>
        </div>
      </li>
      <nuxt-link class="go-vrnamic" :to="{name:'topic-id-square',params:{id:this.$route.params.id}}">进入社区广场</nuxt-link>
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
