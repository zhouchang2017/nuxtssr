<template>
    <div>
        <div class="home-list-content">
            <div v-if="itemData.hasOwnProperty('description')">
                {{itemData.description}}
                <!--<span @click="pickUp = !pickUp">-->
                <!--{{pickUp ? '收起' : '展开'}}-->
                <!--</span>-->
            </div>
            <ul v-if="itemData.image_list.length>0" class="home-list-content-img">
                <li v-if="itemData.image_list.length<=3" v-for="image in itemData.image_list" :key="image"><img
                        :src="image"></li>
            </ul>
        </div>
        <div class="home-list-list">
            <div v-if="itemData.tags.length>0" class="home-list-list-left">
                <a v-for="tag in itemData.tags" :key="tag.id" href="#">{{tag.name}}</a>
            </div>
            <div class="home-list-list-right">
                <span class="list-time">{{itemData.published_at | timeLL}}</span>
                <span><i class="iconfont icon-chakan"></i>{{itemData.read_num}}</span>
                <span><i class="iconfont icon-pinglun"></i>{{itemData.comment_num}}</span>
                <span><i class="iconfont icon-shoucang"></i>{{itemData.collect_num}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import typeMixin from './articleTypeItemMix'

  export default {
    mixins: [typeMixin],
    name: 'image-type-item',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
