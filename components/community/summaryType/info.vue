<template>
  <div class="User-head-image">
    <div class="masterpiece-title">
      <b>{{community.community_info.name}}</b>聚集了{{community.community_info.user_num}}人加入，共{{community.hot_community_author.author_num}}人秀出自己的作品，里面有你吗？
    </div>
    <div class="head-img">
      <nuxt-link v-for="user in community.hot_community_author.author_users" :key="user.user_id" :to="`/user/${user.user_id}`">
        <img :src="user.avatar" alt="#">
      </nuxt-link>
    </div>
    <div class="head-this-works">
      <span>-----他们的作品-----</span><span>等17位用户</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'info',
    data () {
      return {}
    },
    computed: {
      ...mapState(['community'])
    }
  }
</script>

<style scoped>

</style>
