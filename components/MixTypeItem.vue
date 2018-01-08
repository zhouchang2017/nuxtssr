<template>
    <div>
        <div class="home-list-content">
            <div v-if="itemData.hasOwnProperty('description')">
                {{content}}
                <span v-if="!isPost" @click="pickUp = !pickUp">
                    {{pickUp ? '展开' : '收起'}}
                </span>
            </div>
            <div v-show="!pickUp">
                <ul v-if="itemData.hasOwnProperty('avatar')" class="home-list-content-img">
                    <li><img :src="itemData.avatar"></li>
                </ul>
            </div>
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
    import typeMixin from '@c/articleTypeItemMix'

    export default {
        mixins : [typeMixin] ,
        name : "mix-type-item" ,
        data() {
            return {
                pickUp : false ,   //内容展开收起状态
                num : 70 ,

            }
        } ,
        mounted() {
            //初始化是否展开或者收起
            if (!this.isPost) {
                if(this.itemData.hasOwnProperty('description')){
                    this.pickUp = this.itemData.description.length > 70
                }
            }
        } ,
        computed : {
            //是否存在content_type属性
            hasContentType() {
                return this.itemData.hasOwnProperty('content_type')
            } ,
            //是否属于帖子
            isPost() {
                if (this.hasContentType && !this.itemData.hasOwnProperty('summary_catalog')) {
                    return true
                }
                if (this.hasContentType && this.itemData.hasOwnProperty('summary_catalog') && this.itemData.summary_catalog.id === 1) {
                    return true
                }
                return false
            } ,
            //显示文章内容
            content() {
                if (this.isPost) {
                    //如果属于帖子，直接返回描述，不做截取
                    return this.itemData.description
                }
                if (this.itemData.hasOwnProperty('description')) {
                    //如果存在描述
                    let desc = this.itemData.description
                    if (this.pickUp) {
                        //当前展开状态如果为收起
                        if (desc.length > this.num) {
                            //如果大于70个字，则收起
                            return desc.slice(0 , this.num)
                        }
                    }
                    return desc
                }
                return false
            }
        }
    }
</script>

<style scoped>

</style>