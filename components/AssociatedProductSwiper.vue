<template>
    <div class="related-products related-con">
        <h4 class="related-title"><slot>关联产品</slot></h4>
        <div class="related-content">
            <swiper :options="swiperOption" ref="swiper">
                <swiper-slide v-for="item in productList" :key="item.id">
                    <div class="swiper-slide">
                        <a :href="showUrl(item.id)"><img :src="item.avatar"></a>
                        <h5 class="swiper-slide-title">{{`${item.name} ${item.model}`}}</h5>
                        <p class="swiper-slide--baike"><a href="#">百科</a>|<a href="#">购买</a>|<a href="#">相关帖子</a></p>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev" slot="button-prev"><i class="iconfont icon-xiayiye"></i></div>
                <div class="swiper-button-next" slot="button-next"><i class="iconfont icon-xiayiye1"></i></div>
            </swiper>
        </div>
    </div>
</template>

<script>
    //文章详情页侧边栏关联产品组件
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        name : "associated-product-swiper" ,
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    // slidesPerView: 1,
                    // spaceBetween: 0,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        // hideOnClick: true,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    // observer:true,
                    // observeParents:true
                }
            }
        },
        props: {
            productList: [Array],
        },
        methods:{
            showUrl(id){
                return this.$api.product.show(id)
            }
        },
        mounted() {

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