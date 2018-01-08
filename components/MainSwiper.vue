<template>
    <div class="mobilPhone-top">
        <div class="mobilPhone-top-left">
            <div v-swiper:mySwiper="swiperOption" ref="equipSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
                        <a :href="item.link" class="mobilPhone-img"><img :src="item.avatar"></a>
                        <div class="mobilPhone-title left-width">{{item.title}}</div>
                    </div>
                </div>
                <div class="swiper-pagination" slot="pagination"></div>
                <!-- 如果需要导航按钮 -->
                <div class="equipment-button-prev" slot="button-prev"><i class="iconfont icon-xiayiye"></i></div>
                <div class="equipment-button-next" slot="button-next"><i class="iconfont icon-xiayiye1"></i></div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>

  export default {
    data () {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 0,
          navigation: {
            nextEl: '.equipment-button-next',
            prevEl: '.equipment-button-prev',
            hideOnClick: true
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets'
          },
          on: {
            slideChange: function () {
              // vm_swiper.activeIndex = this.activeIndex
            }
          }
        },

        activeIndex: 0
      }
    },
    props: {
      bannerList: Array
    },
    computed: {
      swiper () {
        return this.$refs.equipSwiper.swiper
      }
    },
    methods: {}
  }
</script>

<style scoped>
    .mobilPhone-top-left .swiper-container {
        width: 646px;
        height: 373px;
        margin: 0;
        position: relative;
        overflow: hidden;
    }
</style>