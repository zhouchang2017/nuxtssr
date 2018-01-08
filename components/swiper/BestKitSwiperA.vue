<template>
    <div class="brok-swiper">
        <swiper :options="swiperOption" ref="swiper">
            <swiper-slide v-for="(item,index) in imageList" :key="index">
                <div class="swiper-slide">
                    <a href="#"><img :src="item"></a>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev" slot="button-prev"><i class="iconfont icon-xiayiye"></i></div>
            <div class="swiper-button-next" slot="button-next"><i class="iconfont icon-xiayiye1"></i></div>
        </swiper>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        name : "swiper-in-layer-post" ,
        components : {
            swiper,
            swiperSlide ,
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        hideOnClick: true,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                        // renderFraction: function(currentClass, totalClass) {
                        //     return '<span class="' + currentClass + '"></span>' +
                        //         ' / ' +
                        //         '<span class="' + totalClass + '"></span>';
                        // },

                    },
                    observer:true,
                    observeParents:true
                }
            }
        },
        props: {
            imageList: [Array],
            isShow: [Number, Boolean]
        },
        mounted() {
            // this.$nextTick(() => {
            //     window.vm_swiper = this
            // })
        },
        computed: {
            swiper() {
                return this.$refs.swiper.swiper
            }
        }
    }
</script>

<style scoped>

</style>