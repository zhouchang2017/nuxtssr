<template>
    <div class="home-mian-left-block">
        <div class="home-active-title">
            <span class="sixThree">摄影精选</span>
            <a href="#" class="fournine">更多作品&gt;&gt;</a>
        </div>
        <div class="home-left-top">
            <a v-if="items[0]" href="" class="home-left-top-img">
                <span class="top-vido left-bon"><i class="iconfont icon-bofang"></i>06:32</span>
                <img :src="items[0].avatar">
            </a>
            <div v-if="items[0]" class="home-left-top-user">
                <a href="#" class="user-img"><img :src="items[0].user.avatar" alt=""></a>
                <h4 class="user-name">{{items[0].user.nickname}}</h4>
                <div class="user-brief">{{items[0].title | str_limit(20)}}</div>
                <div v-if="items[0].products[0]" class="user-commodity">
                    <i class="iconfont icon-wurenji"></i>
                    {{items[0].products[0].name  | str_limit(20)}}
                </div>
                <div v-else class="user-brief">
                    无产品！
                </div>
                <div v-if="items[0].products[0]" class="user-name">
                    {{items[0].products[0].description  | str_limit(50)}}
                </div>
                <div v-else class="user-name">
                    无产品！
                </div>
            </div>
            <div v-if="items[1]" class="home-left-parent">

                <div v-if="items[1]" class="home-left-parent-left">
                    <a href="#">
                        <span class="top-vido right-top"><i class="iconfont icon-bofang"></i>06:32</span>
                        <img :src="items[1].avatar">
                    </a>
                </div>

                <div v-if="items[2]" class="home-left-parent-center">
                    <a href="#"><img :src="items[2].avatar"></a>
                </div>

                <div v-if="items[3]" class="home-left-parent-right">
                    <a href="#"><img :src="items[3].avatar"></a>
                </div>
            </div>
        </div>
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
