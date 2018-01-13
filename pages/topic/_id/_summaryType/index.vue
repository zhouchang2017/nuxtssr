<template>
  <!--<div v-if="domLoad">-->
  <!--<waterfall :line-gap="250" :min-line-gap="5" :single-max-width="10" :watch="items">-->
  <!--&lt;!&ndash; each component is wrapped by a waterfall slot &ndash;&gt;-->
  <!--<waterfall-slot-->
  <!--v-for="(item, index) in items"-->
  <!--:width="item.width"-->
  <!--:height="item.height"-->
  <!--:order="index"-->
  <!--:key="item.id"-->
  <!--&gt;-->
  <!--<div :style="item.style"></div>-->
  <!--</waterfall-slot>-->
  <!--</waterfall>-->
  <!--</div>-->
  <div class="justified-gallery">
    <div class="grid">
      <div v-for="item in community.community_body.data" :key="item.id" class="grid-item">
        <div class="grid-item-img-show">
          <img :src="item.avatar" class="grid-item-img">
          <div class="position-show">
            <p>入手价：￥{{item.price}}元</p>
            <p>打分:
              <i v-for="n in item.score" class="iconfont icon-wuxing"></i>
              <!--<span>1/{{item.images.length}}</span>-->
            </p>
          </div>
        </div>
        <div class="grid-item-content">
          <h4 class="grid-item-title">{{item.title}}</h4>
          <div class="grid-item-show">
            <a href="#" class="grid-item-photo"><img :src="item.user.avatar"
                                                     class="grid-item-photo"></a>
            <div class="grid-item-show-center">
              <h5 class="grid-item-show-name">{{item.user.nickname}}</h5>
              <div class="grid-item-show-time">
                {{item.published_at | timeLL}}
              </div>
            </div>
            <button class="Addattention">+关注</button>
          </div>
          <ul class="grid-item-content-ul">
            <li><i class="iconfont icon-chakan"></i>{{item.read_num}}</li>
            <li><i class="iconfont icon-pinglun"></i>{{item.comment_num}}</li>
            <li><i class="iconfont icon-shoucang"></i>{{item.collect_num}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  // import Waterfall from '~/node_modules/vue-waterfall/lib/waterfall'
  // import WaterfallSlot from '~/node_modules/vue-waterfall/lib/waterfall-slot'
  import {mapState} from 'vuex'
  export default {
    components: {
      // Waterfall,
      // WaterfallSlot
    },
    data () {
      return {
        domLoad: false,
        align: 'center',
        items: null,
        isBusy: false,
        lastIndex: 0
      }
    },
    async fetch ({store, params, query}) {
      console.log('内嵌路由数据加载')
      await store.dispatch('getCommunitySubListPage', {params, query})
      console.log('内嵌路由数据加载完成')
    },
    methods: {
      addItems: function () {
        if (!this.isBusy && this.items.length < 500) {
          this.isBusy = true
          this.items.push.apply(this.items, this.ItemFactory.get(50))
        }
      },
      shuffle: function () {
        this.items.sort(function () {
          return Math.random() - 0.5
        })
      },
      reflowed: function () {
        this.isBusy = false
      },
      generateRandomItems (count) {
        let items = []
        for (let i = 0; i < count; i++) {
          items[i] = {
            index: this.lastIndex++,
            style: {
              background: this.getRandomColor(),
              height: '100%'
            },
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50)
          }
        }
        return items
      },
      getRandomColor () {
        let colors = [
          'rgba(21,174,103,.5)',
          'rgba(245,163,59,.5)',
          'rgba(255,230,135,.5)',
          'rgba(194,217,78,.5)',
          'rgba(195,123,177,.5)',
          'rgba(125,205,244,.5)'
        ]
        return colors[~~(Math.random() * colors.length)]
      }
    },
    mounted () {
      if(process.browser){
        var $grid = $('.grid').masonry({
          columnWidth: 290,
          itemSelector: '.grid-item', // 要布局的网格元素
          gutter: 10, // 网格间水平方向边距，垂直方向边距使用css的margin-bottom设置
          percentPosition: true, // 使用columnWidth对应元素的百分比尺寸
          stamp: '.grid-stamp', // 网格中的固定元素，不会因重新布局改变位置，移动元素填充到固定元素下方
          fitWidth: true, // 设置网格容器宽度等于网格宽度，这样配合css的auto margin实现居中显示
          originLeft: true, // 默认true网格左对齐，设为false变为右对齐
          originTop: true, // 默认true网格对齐顶部，设为false对齐底部
          containerStyle: {
            position: 'relative'
          }, // 设置容器样式
//				transitionDuration: '0.2s', // 改变位置或变为显示后，重布局变换的持续时间，时间格式为css的时间格式
//				stagger: '0.03s', // 重布局时网格并不是一起变换的，排在后面的网格比前一个延迟开始，该项设置延迟时间
          resize: true, // 改变窗口大小将不会影响布局
          initLayout: true, // 初始化布局，设未true可手动初试化布局
        });
        $grid.imagesLoaded().progress(function () {
          $grid.masonry('layout');
        });
      }
    },
    computed: {
      ...mapState(['community'])
    }
  }
</script>

<style scoped>

</style>
