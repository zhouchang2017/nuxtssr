<template>
  <div class="home-mian-right-block">
    <ul class="Entrance-writing">
      <li v-for="(item,index) in items" :class="liClass(len,index)">
        <a href="#">
          <i class="iconfont icon-xieyoujian"></i>
          {{item.action_name}}
        </a>
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
    },
    methods: {
      liClass (len, ind) {
        ind = ind + 1
        let style = ''
        switch (len) {
          case 4:
            return ind <= 2 ? 'big-two-entrance' : 'big-entrance'
            break
          case 5:
            if (ind <= 2) {
              style += 'big-two-entrance '
            }
            if (ind === 2) {
              style += 'marginZeo '
            }
            if (ind === 3) {
              style += 'marginfour '
            }
            if (ind >= 3) {
              style += 'big-entrance '
            }
            return style
            break
          case 6:
            if (ind === 2) {
              style += 'marginZeo '
            }
            if (ind <= 2) {
              style += 'big-two-entrance'
            }
            return style
            break
          case 7:
            return ind <= 3 ? 'big-entrance' : ''
            break
          default:
            return ind <= 3 ? 'big-entrance' : ''
        }
      }
    },
    computed: {
      len () {
        return this.items.length
      }
    }
  }
</script>

<style scoped>

</style>
