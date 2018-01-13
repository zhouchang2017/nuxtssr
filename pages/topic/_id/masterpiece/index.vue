<template>
  <div class="justified-gallery">

    <div v-for="item in body.data">
      <a v-if="item.content_type === 'video'" href="#">
        <span class="caption-vido"><i class="iconfont icon-bofang"></i> 06:32</span>
        <img
          :alt="`<a href='#'><img src='${item.avatar}'></a><span><i class='iconfont icon-pinglun'></i>58<i class='iconfont icon-shoucang'></i>58</span>`"
          class="lazy-load" :data-original="item.avatar"/>
      </a>
      <a v-else href="#">
        <img
          :alt="`<a href='#'><img src='${item.avatar}'></a><span><i class='iconfont icon-pinglun'></i>58<i class='iconfont icon-shoucang'></i>58</span>`"
          class="lazy-load" :data-original="item.avatar"/>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        body: []
      }
    },
    async asyncData ({store, params, query}) {
      console.log('内嵌路由数据加载')
      console.log(params)
      // let query = {filter: 'masterpiece'}
      let res = await store.dispatch('getMasterpieceList', {params, query})
      console.log('内嵌路由数据加载完成')
      return {body: res.body}
    },
    async beforeRouteUpdate (to, from, next) {
      console.log(to)
      console.log(from)
      await this.fetchData(to.params, to.query)
      next()
    },
    methods: {
      async fetchData (params, query) {
        console.log('watch 监听路由变化')
        let res = await this.$store.dispatch('getMasterpieceList', {params, query})
        this.$set(this, 'body', res.body)
        this.justifiedGalleryInit()
      },
      loadImage(){
        $('.justified-gallery').justifiedGallery({
          rowHeight: 384,
          maxRowHeight: 454,
          lastRow: 'nojustify',
          margins: 8,
          captions: true, //决定你是否要显示标题，当你的鼠标在图像上的时候。
          waitThumbnailsLoad: true,
          cssAnimation: true,
        });
      },
      justifiedGalleryInit () {
        if (process.browser) {
          require('~/assets/vendors/justifiedGallery/jquery.justifiedGallery.min')
          require('~/assets/vendors/justifiedGallery/justifiedGallery.min.css')
          require('~/assets/vendors/lazyload/lazyload')

          $("img.lazy-load").lazyload({
            event: "scrollstop"
          });

          window.onload = function () {
            $('.justified-gallery').justifiedGallery({
              rowHeight: 384,
              maxRowHeight: 454,
              lastRow: 'nojustify',
              margins: 8,
              captions: true, //决定你是否要显示标题，当你的鼠标在图像上的时候。
              waitThumbnailsLoad: true,
              cssAnimation: true,
            });
            $(window).scroll(function () {
              if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                for (var i = 0; i < 5; i++) {
                  $('#gallery').append('<a>' +
                    '<img src="http://path/to/image" />' +
                    '</a>');
                }
                $('.justified-gallery').justifiedGallery('norewind');
              }
            });

            $(".justified-gallery").css("display", "none");
            $(".justified-gallery").eq(0).css("display", "block");
            $(".masterpiece-ul li").click(function () {
              if (!($(this).hasClass("bottm-checked"))) {
                $(this).addClass("bottm-checked");
                $(this).siblings("li").removeClass("bottm-checked");
              }
              var indexs = $(this).index();
              $(".justified-gallery").eq(indexs).siblings(".justified-gallery").css("display", "none");
              $(".justified-gallery").eq(indexs).fadeIn(400);
            });
          }
        }
      }
    },
    mounted () {
      this.justifiedGalleryInit()
    }
  }
</script>

<style scoped>

</style>
