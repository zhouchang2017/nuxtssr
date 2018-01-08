<template>
    <div>
        <div class="pc-slide-page">
            {{activeIndex+1}}/{{swiperImages.length}}
            <span class="big-img" @click="look"><i class="iconfont icon-quanping"></i></span>
        </div>

        <swiper :options="swiperOptionTop" class="swiper-container gallery-top" ref="swiperTop">
            <swiper-slide v-for="img in swiperImages" :key="img.id">
            <img :data-src="img.image" class="swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        </swiper>

        <swiper :options="swiperOptionThumbs" class="swiper-container gallery-thumbs" ref="swiperThumbs">
            <swiper-slide v-for="img in swiperImages" :key="img.id" class="thumbs-slide" :style="`background-image:url(${img.image})`"></swiper-slide>
            <div class="swiper-button-prev simall-big" slot="button-prev"><i class="iconfont icon-zhankai"></i></div>
            <div class="swiper-button-next simall-big" slot="button-next"><i class="iconfont icon-zhankai"></i></div>
        </swiper>
    </div>
</template>


<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    export default {
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOptionTop:{
                    observer:true,
                    observeParents:true,
                    keyboard:true,
                    simulateTouch:false,
                    lazy: true,
                    loop:false,
                    //spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on:{
                        slideChange: function(){
                            vm_swiper.activeIndex = this.activeIndex
                        }
                    }
                },
                activeIndex:0
            }
        },
        props:{
          swiperImages:{
              type:Array
          }
        },
        mounted() {
            this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop.swiper
                const swiperThumbs = this.$refs.swiperThumbs.swiper
                swiperTop.controller.control = swiperThumbs
                swiperThumbs.controller.control = swiperTop
                window.vm_swiper = this
            })
        },
        computed:{
            swiperOptionThumbs(){
                return {
                    spaceBetween: 10,
                    centeredSlides: true,
                    normalizeSlideIndex: false,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    lazy: {
                        loadPrevNext: true,
                    },
                    observer:true,
                    observeParents:true,
                    watchSlidesProgress : true,
                    watchSlidesVisibility : true
                }
            },
            swiper() {
                return this.$refs.swiperTop.swiper
            }
        },
        methods:{
            look(){
                $(".workdetails-main-left").width(844).height("auto").removeClass("fix-big-img-show");
                $(".workdetails-main-left .gallery-top").width(844).height(543);
                $(".gallery-top .swiper-slide").width(844).height(543);
                $(".gallery-top .swiper-slide img").autoZoomLoadImage(true, 844, 543);
                $(".workdetails-fotter").css("display","block");
                $(".workdetails-main-right").css("display","block");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #000;
    }
    .swiper-slide img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        -ms-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        position: absolute;
        left: 50%;
        top: 50%;
    }
    .thumbs-slide{
        background-size: cover;
        background-position: center;
    }
    /*.gallery-top {*/
        /*height: 80%!important;*/
        /*width: 100%;*/
    /*}*/
    /*.gallery-thumbs {*/
        /*height: 20%!important;*/
        /*box-sizing: border-box;*/
        /*padding: 10px 0;*/
    /*}*/
    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }
    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }
</style>