<template>
    <div class="Release-entrance">
        <!--登录状态-->
        <div v-if="Object.keys('user').length>0" class="logged-in">
            <div class="logged-information">
                <ul class="logged-information-ul">
                    <li>
                        <a href="#"><img src="#"></a>
                    </li>
                    <li>
                        <a href="#">
                            <b>2</b>
                            <span>作品</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <b>2</b>
                            <span>粉丝数</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <b>2</b>
                            <span>收藏</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="publication">
                <div class="publication-left">
                    <i class="iconfont icon-xieyoujian"></i>
                    <div class="publication-integral">
                        <span>发布作品</span>
                        <p>每次发布成功积分+10分</p>
                    </div>
                </div>
                <a href="#" class="release-btn">发布</a>
            </div>
        </div>
        <!--未登录状态-->
        <div v-else class="not-logged-in">
            <a href="#" class="not-logged-in-img"><img src="img/03.jpg"></a>
            <a href="#" class="login-go">登录</a>
            <a href="#" class="register-go">注册</a>
            <p>登陆后发表产品</p>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'user',
    data () {
      return {}
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>

</style>