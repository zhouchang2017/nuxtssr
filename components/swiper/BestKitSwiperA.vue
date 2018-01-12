<template>
  <div class="brok-swiper">
    <div v-swiper:mySwiper="swiperOption" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in imageList" :key="index">
          <div class="swiper-slide">
            <a href="#"><img :src="item"></a>
          </div>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev" slot="button-prev"><i class="iconfont icon-xiayiye"></i></div>
      <div class="swiper-button-next" slot="button-next"><i class="iconfont icon-xiayiye1"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'swiper-in-layer-post',
    data () {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 0,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
            // renderFraction: function(currentClass, totalClass) {
            //     return '<span class="' + currentClass + '"></span>' +
            //         ' / ' +
            //         '<span class="' + totalClass + '"></span>';
            // },

          },
          observer: true,
          observeParents: true
        }
      }
    },
    props: {
      imageList: [Array],
      isShow: [Number, Boolean]
    },
    mounted () {
      // this.$nextTick(() => {
      //     window.vm_swiper = this
      // })
    },
    computed: {
      swiper () {
        return this.$refs.swiper.swiper
      }
    }
  }
</script>

<style scoped>

</style>
