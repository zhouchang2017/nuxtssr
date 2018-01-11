<template>
  <div v-if="isShow" class="home-mian-left-block">
    <ul class="home-list-title-ul" id="home-list-type">
      <nuxt-link
        v-for="item in listType" :key="item.id" :class="{'listcheck':item.name_en === isActive}"
        tag="li" :to="{query: {article_type: item.name_en}}">{{item.name_cn}}
      </nuxt-link>
      <div class="float-right marginTop checkboxShow">
        <input type="checkbox" v-model="onlyVideo" class="box-lab"/><label class="box-lab"></label>只看视频
      </div>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
  import axios from 'axios'
  import api from '~/util/api.config'

  export default {
    props: {
      types: Array,
      id: [Number, String],
      isShow: {
        type: [Number, Boolean],
        default: true
      },
      isSquare: {
        type: [Number, Boolean],
        default: false
      }
    },
    data () {
      return {
        loading: false,
        onlyVideo: false,
        listType: [],
        initData: {},
        isChoice: 1   // 是否精选内容
      }
    },

    computed: {
      isActive () {
        return this.$route.query.article_type || 'all'
      }
    },
    created () {
      this.loading = false
      this.listType.push({summary_catalog_id: 0, name_en: 'all', name_cn: '全部'})
      this.listType.push(...this.types)
      this.loading = true
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
