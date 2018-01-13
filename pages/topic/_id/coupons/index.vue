<template>
  <div class="idle_con">
    <ul class="idel_con_ul" v-if="body.data.length>0">
      <li v-for="item in body.data" :key="item.product_catalog_name + item.id">
        <list-item :item="item" />
      </li>
    </ul>
    <ul class="idel_con_ul" v-else>
      <li>
        暂无帖子！
      </li>
    </ul>
  </div>
</template>

<script>
  import ListItem from '~/components/community/summaryType/ListItem'
  export default {
    data () {
      return {
        body: []
      }
    },
    components: {
      ListItem
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

<style lang="less">
  .idle_con {
    background-color: #fff;
    height: 100%;
    padding-top: 20px;
    clear: both;
    .idel_con_ul {
      li {
        margin: 20px 0 0;
        padding-bottom: 15px;
        height: 90px;
        border-bottom: 1px solid #eee;
        .dileItem_l {
          float: left;
          width: 85px;
          height: 90px;
          border: 1px solid #eee;
        }
        &:first-child {
          margin: 0;
        }
        .dileItem_r {
          float: left;
          margin-left: 20px;
          width: 685px;
          h2 {
            width: 100%;
            height: 24px;
            display: inline-block;
            color: #2d2d2d;
            font-size: 16px;
          }
          .dileItem_rCont {
            height: 25px;
            margin: 8px 0;
            .dileItem_picker {
              float: left;
              color: #ff2c2d;
              font-size: 18px;
              small {
                font-size: 14px;
              }
            }
            .dileItem_labelling {
              display: block;
              float: left;
              margin-left: 10px;
              .dileItem_Li {
                display: block;
                float: left;
                padding: 2px 8px;
                background-color: #ff5c12;
                border-radius: 4px;
                color: #fff;
                font-size: 14px;
                margin-right: 10px;
              }
            }
          }
          .dileItem_bt {
            width: 100%;
            clear: both;
            .dileItem_aurth {
              display: inline-block;
              float: left;
              span {
                margin-left: 4px;
              }
            }
            .dileItem_time {
              float: left;
              color: #c5c5c5;
              font-size: 14px;
              line-height: 24px;
              margin-left: 16px;
            }
            .dileItem_right {
              float: right;
              color: #c5c5c5;
              i.icon-chakan {
                font-size: 18px;
              }
              i.icon-pinglun {
                margin-left: 10px;
              }
              i {
                display: inline-block;
                float: left;
                margin-top: -2px;
              }
              span {
                display: inline-block;
                float: left;
                margin-left: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
