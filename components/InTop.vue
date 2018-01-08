<template>
  <div class="return_top">
    <span class="message icon iconfont icon-pinglun" @click="toComt(obj)"></span>
    <span class="share icon iconfont icon-mShare" @mousemove="shareShows()" @mouseout="shareHidden()"></span>
    <transition name="fade">
      <ul class="share_con" v-show="shareShow" @mousemove="shareShows()" @mouseout="shareHidden()">
        <li>
          <a href="#" class="icon iconfont icon-weixin"></a>
        </li>
        <li>
          <a href="#" class="icon iconfont icon-weibo"></a>
        </li>
        <li>
          <a href="#" class="icon iconfont icon-qq"></a>
        </li>
      </ul>
    </transition>
    <span class="inaTop icon iconfont icon-returnTop" @click="toTop()"></span>
  </div>
</template>
<script>
    export default {
        props: {
          //传入一个锚点类名或id
          obj: {
            type: String,
            default: '.return_top'
          }
        },
        data() {
          return {
            shareShow: false
          }
        },
        methods: {
          shareShows() {
            this.shareShow = true
          },
          shareHidden() {
            this.shareShow = false
          },
          toTop() {
            let times = null; 
            times = setInterval(function(){ 
              let oscoll = document.documentElement.scrollTop || document.body.scrollTop; 
              let ispeed = Math.floor(-oscoll / 5);
              document.documentElement.scrollTop = document.body.scrollTop = oscoll + ispeed;
                if(oscoll == 0){
                  clearInterval(times);
                }
            },30);    
          },
          toComt(obj) {
            console.log(obj)
            let boxtop = $(obj).offset().top
            $('html body').animate({
                scrollTop: boxtop
            }, 700);
          }
        }
    }
</script>
<style lang="less" scoped>
    .return_top {
      @HeightWeight: 40px;
      position: fixed;
      z-index: 10;
      width: 42px;
      right: 60px;
      bottom: 250px;
      .message {
        display: block;
        width: @HeightWeight;
        height: @HeightWeight;
        line-height: @HeightWeight; 
        text-align: center;
        background-color: #fff;
        color: #999;
        font-size: 24px;
        cursor: pointer;
        margin-top: 6px;
        &:hover {
          color: #ff7700;
        }
      }
      .share {
        &:extend(.return_top .message);
        &:hover {
          color: #ff7700;
        }
      }
      .inaTop {
        &:extend(.return_top .message);
        &:hover {
          color: #ff7700;
        }
        font-size: 16px;
      }
      .share_con {
        position: absolute;
        z-index: 11;
        width: @HeightWeight * 3 + 18;
        left: -(@HeightWeight * 3 + 18);
        top: 52px;
        li {
          display: block;
          float: left;
          width: @HeightWeight;
          height: @HeightWeight;
          line-height: @HeightWeight;
          margin-right: 6px;
          a {
            display: block;
            background-color: #fff;
            color: #999;
            font-size: 24px;
            text-align: center;
            &.icon-weixin {
              &:hover {
                background-color: #1d9e03;
              }
            }
            &.icon-weibo {
              &:hover {
                background-color: #db1900;
              }
            } 
          }
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }
</style>