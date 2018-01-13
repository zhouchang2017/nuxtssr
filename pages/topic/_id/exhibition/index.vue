<template>
  <div class="justified-gallery">
    <div class="grid">
      <div v-for="item in body.data" :key="item.id" class="grid-item">
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
  export default {
    data () {
      return {
        body: []
      }
    },
    async asyncData ({store, params, query}) {
      console.log('内嵌路由数据加载')
      console.log(params)
      // let query = {filter: 'exhibition'}
      let res = await store.dispatch('getExhibitionList', {params, query})
      console.log('内嵌路由数据加载完成')
      return {body: res.body}
    },
    methods: {
      masonryInit () {
        if (process.browser) {
          let jQueryBridget = require('jquery-bridget')
          let Masonry = require('masonry-layout')
          let imagesLoaded = require('imagesloaded')
          imagesLoaded.makeJQueryPlugin($)
          jQueryBridget('masonry', Masonry, $)
          let $grid = $('.grid').masonry({
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
          })
          $grid.imagesLoaded().progress(function () {
            $grid.masonry('layout')
          })
        }
      }
    },
    mounted () {
      this.masonryInit()
    }
  }
</script>

<style scoped>

</style>
