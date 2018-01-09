<template>
  <!--问答列表-->
  <div class="home-mian-right-block">
    <div class="home-mian-right-block-title"><slot>问答</slot><a href="#">更多&gt;</a></div>
    <ul class="home-answer">
      <li v-for="item in items">
        <a href="#">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
