<template>
    <div>
        <ul class="review-layer-right-ul">
            <li v-for="n in 5">
                <div class="review-layer">
                    <div class="review-layer-img">
                        <a href="#" class="review-layer-img-show">
                            <div class="progressive-image avatar-s">
                            </div>
                        </a>
                        <div class="floor-fabulous border-color-s">
                            <i class="icon-happy iconfont icon-xihuan font-color-s"></i>
                        </div>
                    </div>
                    <div class="review-layer-right">
                        <div class="review-layer-top">
                            <div class="review-layer-user">
                                <span class="floor-user-name title-s"></span>
                                <div class="floor-user-more user-agree-s">
                                </div>
                            </div>
                            <span class="review-layer-floor layer-floor-s border-color-s"></span>
                        </div>
                        <div class="review-layer-content layer-content-s">
                        </div>
                        <div class="floor-answer">
                            <div>
                                <div class="floor-answer-show">
                                    <span class="floor-answer-show-s"></span>
                                    <span class="floor-answer-reply floor-answer-show-s"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    /*
     作品页评论骨架
     */

    export default {

    }
</script>
<style scoped>
    .title-s{
        width: 60px;
        background: #f3f3f3;
        height: 14px;
        display: inline-block;
    }
    .avatar-s{
        background: #f3f3f3;
    }
    .user-agree-s{
        width: 60px;
        background: #f3f3f3;
        height: 14px;
    }
    .layer-floor-s{
        border-color: #f3f3f3;
    }
    .layer-content-s{
        width: 160px;
        background: #f3f3f3;
        height: 14px;
        display: inline-block;
    }
    .floor-answer-show-s{
        width: 30px;
        background: #f3f3f3;
        height: 14px;
        display: inline-block;
    }
    .border-color-s{
        border-color: #f3f3f3;
    }
    .font-color-s{
        color: #f3f3f3;
    }
</style>
