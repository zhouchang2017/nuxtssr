<template>
    <div class="userInfo">
      <div class="userLeft">
        <span></span>
      </div>
      <div class="userCon">
         <div class="user_top">
            <a href="#" class="user_top_head">
               <img class="bk-img" :src="userInfo.avatar" alt="" />
            </a>
            <div class="user_top_info">
              <div class="user_top_nameCon">
                <a href="#" class="bk-interception user_top_name">{{userInfo.nickname}}</a>
                <i class="lvThree">LV.{{userInfo.level}}</i>
                <img class="answerIdentity" src="@a/img/identification.png" alt="" />
              </div>
              <span class="user_Introduction">简介：</span>
            </div>
         </div>
         <div class="user_btn">
           <div class="user_btn_left">
              <div class="user_btn_li">
                <span>{{userInfo.publish_num}}</span>
                <span>帖子</span>
              </div>
              <div class="user_btn_li">
                <span>{{userInfo.fans_num}}</span>
                <span>粉丝</span>
              </div>
              <div class="user_btn_li">
                <span>...</span>
                <span>收获收藏</span>
              </div>
           </div>
           <div class="user_btn_right">
             <a class="user_btn_edit" href="#"><i class="icon iconfont icon-youxiang"></i></a>
             <span class="user_btn_Focus" @click="Focus()">{{userInfo.Focus}}</span>
           </div>
         </div>
      </div>
    </div>
</template>
<script>
    export default {
      props: {
        userInfo: {
          type: Object
        }
      },
      methods: {
        Focus(){
          let Focus = this.userInfo.Focus
          if (Focus == '关注') {
            this.userInfo.Focus = '已关注'
          }else {
            this.userInfo.Focus = '关注'
          }
        }
      }
    }
</script>
<style lang="less" scoped>
    .userInfo {
      display: none;
      @userHeight: 128px;
      @userWidth: 274px;
      position: absolute;
      z-index: 2;
      width: @userWidth + 30;
      height: @userHeight;
      top: 0;
      right: -@userWidth - 20;
      .userLeft {
        position: absolute;
        z-index: 3;
        top: 10px;
        left: 21px;
        width: 0;
        height: 0;
        border-width: 10px 10px 10px 0;
        border-style: solid;
        border-color: transparent #c5c5c5 transparent transparent;
        span {
          display: block;
          width:0;
          height:0;
          border-width: 8px 8px 8px 0;
          margin: -8px 0 0 2px;
          border-style: solid;
          border-color: transparent #fff transparent transparent;
        }
      }
      .userCon {
        float: right;
        width: @userWidth - 2;
        height: @userHeight - 2;
        border: 1px solid #c5c5c5;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 4px 6px 2px #ececec;
        .user_top {
          height: 52px;
          padding: 15px 0 0 10px;
          .user_top_head {
            float: left;
            display: block;
            width: 35px;
            height: 35px;
            border: 1px solid #e3e3e3;
            border-radius: 4px;
            margin-right: 8px;
            img {
              display: block;
            }
          }
          .user_top_info {
            float: left;
            .user_top_nameCon {
              height: 18px;
              line-height: 1.2em;
              .user_top_name {
                display: inline-block;
                float: left;
                font-size: 14px;
                color: #333;
                max-width: 140px;
              }
              i {
                color: #fff;
                display: block;
                float: left;
                font-size: 12px;
                border-radius: 20px;
                width: 35px;
                text-align: center;
                margin: 0 6px;
              }
              .answerIdentity {
                display: block;
                width: 15px !important;
                float: left;
                margin-top: 2px;
              }
            }
            .user_Introduction {
              display: block;
              line-height: 2.2em;
              font-size: 12px;
            }
          }
        }
        .user_btn {
          background-color: #323232;
          height: 50px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          padding: 10px 0 0 10px;
          .user_btn_left {
            float: left;
            .user_btn_li {
              float: left;
              display: inline-block;
              padding: 0 10px;
              text-align: center;
              span {
                display: block;
                font-size: 12px;
                color: #c5c5c5;
                line-height: 1.8em;
                &:first-child {
                  color: #fff;
                }
              }
            }
          }
          .user_btn_right {
            display: inline-block;
            float: right;
            .user_btn_edit {
              display: block;
              float: left;
              width: 34px;
              height: 25px;
              margin: 8px 0 0;
              border: 1px solid #c5c5c5;
              text-align: center;
              padding-bottom: 2px;
              border-radius: 4px;
              i {
                font-size: 26px;
                line-height: 1em;
                color: #c5c5c5;
              }
            }
            .user_btn_Focus {
              display: block;
              float: left;
              width: 50px;
              height: 26px;
              line-height: 26px;
              margin: 8px 8px 0 6px;
              border: 1px solid #c5c5c5;
              text-align: center;
              border-radius: 4px;
              font-size: 14px;
              color: #c5c5c5;
              cursor: pointer;
            }
          }
        }
      }
    }
</style>