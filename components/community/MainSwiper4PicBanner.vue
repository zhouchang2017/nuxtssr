<template>
  <div class="home-mian-left-block">
    <main-swiper :bannerList="swiperItems">
      <ul class="mobilPhone-top-right-ul">
        <li v-for="picItem in picItems"><a href="#">
          <span class="vido-href"><i class="iconfont icon-bofang1"></i></span>
          <img :src="picItem.avatar"/>
          <div class="mobilPhone-title right-width">{{picItem.title}}</div>
        </a>
        </li>
      </ul>
    </main-swiper>
  </div>
</template>

<script>
  import MainSwiper from '~/components/swiper/MainSwiper.vue'

  export default {
    props: {
      items: Array
    },
    components: {
      MainSwiper
    },
    data () {
      return {}
    },
    computed: {
      swiperItems () {
        return this.items.slice(0, 3)
      },
      picItems () {
        return this.items.slice(-4)
      }
    }
  }
</script>

<style scoped>

</style>
