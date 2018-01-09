<template>
  <div class="home-mian-left-block" v-if="items[0]">
    <div class="vr-top">
      <div class="vr-top-left">
        <a href="#" class="vr-top-left-img"><img :src="items[0].avatar"></a>
        <ul class="vr-top-left-ul">
          <li><a href="#"><img :src="items[0].avatar">xxx</a></li>
          <li><i></i></li>
          <li><i></i></li>
          <li><i></i></li>
        </ul>
        <div class="vr-top-left-bottom">
          {{items[0].title}}
        </div>
      </div>
      <div class="vr-top-right" v-if="items[1]">
        <a href="#" class="vr-top-right-one"><img :src="items[1].avatar"></a>
        <a v-if="items[2]" href="#" class="vr-top-right-two"><img :src="items[2].avatar"></a>
      </div>
    </div>
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
