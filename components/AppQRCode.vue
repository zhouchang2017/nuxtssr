<template>
    <div class="appDown">
       <span class="app_title">棒客APP现已适配Android 及 iPhone</span>
       <div class="app_con">
          <div class="app_and">
            <img src="../assets/img/Android.png" alt="下载安卓" /><span>Android</span>
          </div>
          <div class="app_iph">
            <img src="../assets/img/iPhone.png" alt="下载苹果" /><span>iPhone</span>
          </div>
       </div>
    </div>
</template>
<style lang="less" scoped>
    .appDown {
      background-color: #fff;
      margin-top: 20px;
      height: 100%;
      overflow: hidden;
      padding: 15px;
      text-align: center;
      .app_title {
        display: inline-block;
        text-align: center;
        font-size: 16px;
        color: #2d2d2d;
        padding-bottom: 14px;
      }
      .app_con {
        width: 240px;
        margin:  0 auto;
        .app_and {
          display: block;
          width: 100px;
          float: left;
          span {
            text-align: center;
            color: #2d2d2d;
            font-size: 16px;
          }
        }
        .app_iph {
          display: block;
          width: 100px;
          float: right;
          span {
            text-align: center;
            color: #2d2d2d;
            font-size: 16px;
          }
        }
      }
    }
</style>