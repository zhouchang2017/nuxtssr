<template>
    <div class="home-mian-left-block">
        <main-swiper>
            <ul class="mobilPhone-top-right-ul">
                <li v-for="n in 4"><a href="#">
                    <span class="vido-href"><i class="iconfont icon-bofang1"></i></span>
                    <img src="#">
                    <div class="mobilPhone-title right-width">title</div>
                </a>
                </li>
            </ul>
        </main-swiper>
    </div>
</template>

<script>
  import MainSwiper from '~/components/MainSwiper.vue'
  export default {
    components: {
      MainSwiper
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>