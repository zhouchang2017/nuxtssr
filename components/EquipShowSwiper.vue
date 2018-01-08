<template>
    <div v-if="isShow" class="home-mian-right-block">
        <div class="home-mian-right-block-title">装备秀<a href="#">更多&gt;</a></div>
        <swiper :options="swiperOption" ref="equipSwiper">
            <swiper-slide v-for="item in equipList" :key="item.id">
                <a href="#" class="equipment-img"><img :src="item.avatar"></a>
                <div class="equipment-user-img">
                    <img :src="item.user.avatar">{{item.user.nickname}}
                </div>
                <p class="equipment-content"><span>名称：</span>{{item.title | str_limit(25)}}</p>
                <p class="equipment-content"><span>入手价：</span>{{item.price | currency}}</p>
                <div class="equipment-content">
                    <span>打分：</span>
                    <ul class="mark-ul">
                        <li v-for="n in item.score"><i class="iconfont icon-wuxing"></i></li>
                    </ul>
                    {{item.recommend|str_limit(12)}}
                </div>
            </swiper-slide>
            <!-- 如果需要导航按钮 -->
            <div class="equipment-button-prev" slot="button-prev"><i class="iconfont icon-xiayiye"></i></div>
            <div class="equipment-button-next" slot="button-next"><i class="iconfont icon-xiayiye1"></i></div>
        </swiper>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: '.equipment-button-next',
                        prevEl: '.equipment-button-prev',
                        hideOnClick: true,
                    },
                    on: {
                        slideChange: function () {
                            vm_swiper.activeIndex = this.activeIndex
                        }
                    }
                },
                activeIndex: 0
            }
        },
        props: {
            equipList: [Array],
            isShow: [Number, Boolean]
        },
        mounted() {
            this.$nextTick(() => {
                window.vm_swiper = this
            })
        },
        computed: {
            swiper() {
                return this.$refs.equipSwiper.swiper
            }
        },
        filters : {
            str_limit(value,len) {
                return value.length >= len ? `${value.slice(0,len)}...` : value
            },
            currency(value){
                return `￥${value}`
            }
        }
    }
</script>