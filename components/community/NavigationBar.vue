<template>
  <div v-if="isShow" :class="_class">
    <ul class="home-list-title-ul" id="home-list-type">
      <nuxt-link
        v-for="item in listType" :key="item.id" :class="{'listcheck':item.name_en === isActive}"
        tag="li" :to="{query: {[queryField]: item.name_en}}">{{item.name_cn}}
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
      _class: {
        type: String,
        default: 'home-mian-left-block'
      },
      queryField: {
        type: String,
        default: 'filter'
      },
      firstField: {
        type: String,
        default: 'all'
      },
      types: Array,
      id: [Number, String],
      isShow: {
        type: [Number, Boolean],
        default: true
      },
      hasAll: {
        type: Boolean,
        default: true
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
        return this.$route.query[this.queryField] || this.types[0].name_en
      }
    },
    created () {
      this.loading = false
      if (this.hasAll) this.listType.push({summary_catalog_id: 0, name_en: this.firstField, name_cn: '全部'})

      this.listType.push(...this.types)
      this.loading = true
    },
    mounted () {

    }
  }
</script>

<style scoped>

</style>
