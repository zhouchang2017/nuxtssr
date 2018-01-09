<template>
  <div class="home-mian-left-block">
    <div class="home-active">
      <div class="User-head-image">
        <div class="marginFifteen sixThree">
          {{info.name}}聚集了{{info.user_num}}人加入，共{{info.summary_num}}篇帖子，里面有你的吗？
        </div>

        <a href="#" v-for="user in author_users" :key="user.user_id">
          <img :src="user.avatar" :alt="user.nickname">
        </a>

        <div class="textRight">
          <span class="fournine">等{{author_num}}位用户</span>
        </div>
        <button class="joinCommunity-btn joinVr-widthHeight">加入社区</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default: () => {
        }
      },
      author_num:Number,
      author_users:Array
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
