<template>
  <div class="photoAtlas">
     <div class="photoOne" v-if="hiddens" @click="imgOne()" :class="{'autoHeigt': autoHeigt,'smallHeight': smallHeight}">
        <img :src="imgs[0].url" alt="" ref="imgOne"/>
        <span class="photoOne_ts" v-show="longHeight">长图</span>
     </div>
     <div class="photoAll" v-else>
        <ul class="photoAtlas_ul" v-show="photoAmplification">
           <li v-for="(item, index) in imgs" :key="index" @click="amplification(index)"><img class="bk-img" :src="item.url" alt="" /></li>
        </ul>
        <div class="photoAtlas_div" v-show="!photoAmplification">
          <div class="photoAtlas_bigImg">
            <span class="photoAtlas_left" @click="photoAtlasLeft()" v-show="leftHidden"></span>
            <img :src="imgs[0].url" alt="" ref="bigImg" @click="theZoom()"/>
            <span class="photoAtlas_right" @click="photoAtlasRight()" v-show="rightHidden"></span>
          </div>
          <ul class="photoAtlas_div_small">
             <li v-for="(items, index) in imgs" :key="index" :class="{'selectOn': items.selectOns}" @click="smallClick(index)"><img class="bk-img" :src="items.url" alt="" /></li>
          </ul>
        </div>
     </div>
  </div>
</template>
<script>
    export default {
        props: {
          imgs: {
            type: Array
          }
        },
        data() {
          return {
            hiddens: true,
            longHeight: false,
            autoHeigt: true,
            smallHeight: false,
            photoAmplification: true,
            numCon: null,
            leftHidden: true,
            rightHidden: true
          }
        },
        methods: {
          //重置样式选中状态
          clearSelect() {
            this.imgs.forEach(function(item){
              item.selectOns = false
            })
          },
          //点击小图改变大图
          changeBig(ins) {
            this.imgs[ins].selectOns = true
            this.$refs.bigImg.src = this.imgs[ins].url
            this.$set(this.imgs,ins,this.imgs[ins])
            this.numCon = ins
          },
          //判断默认图片多少张
          imgsLength() {
            let that = this
            this.clearSelect()
            if (this.imgs.length == 1) {
              setTimeout(function(){
                let imgHeight = that.$refs.imgOne.offsetHeight
                if (imgHeight > 438) {
                   that.longHeight = true
                   that.smallHeight = true
                }else {
                   that.autoHeigt = false 
                }
              },2000)
            }else {
              this.hiddens = false
            }
          },
          //一张图片时的交互
          imgOne() {
            let imgHeight = this.$refs.imgOne.offsetHeight
            if (imgHeight > 438 && this.longHeight == false) {
              this.longHeight = true
              this.autoHeigt = true
            }else {
              this.longHeight = false
              this.autoHeigt = false
            }
          },
          //多张图片点击放大图
          amplification(ins) {
            this.photoAmplification = !this.photoAmplification
            this.$nextTick(function(){
              this.changeBig(ins)
            })
            this.numCon = ins
            if (this.numCon == 0) {
              this.leftHidden = false
            }else if (this.numCon == 8) {
              this.rightHidden = false
            }
          },
          //点击小图,让大图一起换
          smallClick(ins) {
            this.clearSelect()
            this.changeBig(ins)
          },
          //点击大图，缩放图片
          theZoom() {
            this.clearSelect()
            this.photoAmplification = true
          },
          //点击左边切换
          photoAtlasLeft() {
            this.numCon = this.numCon - 1
            this.clearSelect()
            this.changeBig(this.numCon)
            if (this.numCon == 0) {
              this.leftHidden = false
            }else {
              this.rightHidden = true
            }
          },
          //点击右边切换
          photoAtlasRight() {
            this.numCon = this.numCon + 1
            this.clearSelect()
            this.changeBig(this.numCon)
            if (this.numCon == 8) {
              this.rightHidden = false
            }else {
              this.leftHidden = true
            }
          }
        },
        mounted() {
          this.imgsLength()
        }
    }
</script>
<style lang='less' scoped>
    .photoAtlas {
      .photoOne {
        display: block;
        margin: 0 auto;
        width: 314px;
        overflow: hidden;
        background-color: #ccc;
        position: relative;
        &.smallHeight {
          cursor: url(https://img.t.sinajs.cn/t6/style/images/common/small.cur),pointer;
        }
        &.autoHeigt {
          max-height: 438px;
          &:hover {
            cursor: url(https://img.t.sinajs.cn/t6/style/images/common/big.cur),pointer;
          }
        }
        img {
          display: block;
          width: 100%;
        }
        .photoOne_ts {
          position: absolute;
          z-index: 2;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #fc7600;
          color: #fff;
          font-size: 14px;
        }
      }
      .photoAll {
        .photoAtlas_ul {
          li {
            display: block;
            float: left;
            width: 254px;
            height: 164px;
            margin: 0 15px 25px 0;
            overflow: hidden;
            border: 1px solid #eee;
            &:nth-child(3n) {
              margin: 0;
            }
            &:hover {
              cursor: url(https://img.t.sinajs.cn/t6/style/images/common/big.cur),pointer;
            }
          }
        }
        .photoAtlas_div {
          .photoAtlas_bigImg {
            position: relative;
            max-width: 646px;
            margin: 0 auto;
            .photoAtlas_left {
              display: block;
              position: absolute;
              z-index: 2;
              top: 0;
              left: 0;
              height: 100%;
              width: 30%;
              background: inherit;
              cursor: url(https://img.t.sinajs.cn/t6/style/images/common/pic_prev.cur),pointer;
            }
            .photoAtlas_right {
              display: block;
              position: absolute;
              z-index: 2;
              top: 0;
              right: 0;
              height: 100%;
              width: 30%;
              background: inherit;
              cursor: url(https://img.t.sinajs.cn/t6/style/images/common/pic_next.cur),pointer;
            }
            img {
              display: block;
              margin: 0 auto;
              min-height: 200px;
              cursor: url(https://img.t.sinajs.cn/t6/style/images/common/small.cur),pointer;
            }
          }
          .photoAtlas_div_small {
            @liHeight: 74px;
            width: 100%;
            clear: both;
            height: @liHeight;
            margin: 20px 0;
            li {
              display: block;
              float: left;
              border: 1px solid #eee;
              width: @liHeight + 2;
              height: @liHeight - 2;
              margin-right: 12px;
              cursor: pointer;
              &:last-child {
                margin-right: 0;
              }
              &.selectOn {
                border: 1px solid #ff6c00;
              }
              img {
                display: block;
                width: 100%;
                min-height: auto;
              }
            }
          }
        }
      }
    }
</style>