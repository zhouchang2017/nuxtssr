<template>
    <div v-if="isShow" class="home-mian-left-block">
        <ul class="home-list-title-ul" id="home-list-type">
            <li v-for="item in listType" :key="item.id" :class="{'listcheck':item.active}" @click="clickType(item)">
                {{item.name_cn}}
            </li>
            <div class="float-right marginTop checkboxShow">
                <input type="checkbox" v-model="onlyVideo" class="box-lab"/><label class="box-lab"></label>只看视频
            </div>
        </ul>
        <div v-for="(type,ind) in initData" v-show="ind === activeType.name_en">
            <div class="home-list">
                <ul class="home-list-ul" v-if="type.data.length!== 0">
                    <li v-for="item in type.data" :key="item.catalog_name_en+item.id">
                        <community-list-item :_itemData="item"></community-list-item>
                    </li>
                </ul>
                <div class="home-list-ul" v-else>
                    <div>暂无帖子！</div>
                </div>
            </div>

            <div class="home-page" v-if="type.last_page > 1">
                <pagination :total="type.total" :page-size="type.per_page" :callback="pageChanged"
                            :options="paginationOptions" nav-class="padding-10" ul-class="floor-answer-Inputbox"
                            li-class="txt-color-blue">
                </pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from 'vue-pagination-bootstrap'
    import CommunityListItem from './CommunityListItem'

    export default {
        components : {
            pagination ,
            CommunityListItem
        } ,
        props : {
            _initData : [Object , Array] ,
            types : Array ,
            id : Number ,
            isShow : [Number , Boolean] ,
            isSquare : {
                type : [Number , Boolean] ,
                default : false
            }
        } ,
        data() {
            return {
                loading : false ,
                onlyVideo : false ,
                listType : [] ,
                initData : {} ,
                paginationOptions : { // Not required to pass this configurations
                    offset : 2 ,
                    alwaysShowPrevNext : true
                } ,
                summary_catalog_id : null ,
                typesLastPage : {} ,
                isChoice : 1 ,   //是否精选内容
            }
        } ,
        methods : {
            clickType(type) {
                this.activeType.active = false
                type.active = true
                this.summary_catalog_id = type.summary_catalog_id
                let page = this.typesLastPage.hasOwnProperty([type.name_en]) ? this.typesLastPage[type.name_en] : 1
                this.getResources(type , page)
            } ,
            async getResources(type , page = 1) {
                this.loading = false
                //判断是否已加载数据
                if (this.initData.hasOwnProperty(type.name_en)) {
                    //判断是否获取分页数据
                    if (this.initData[type.name_en].current_page == page) {
                        //以有数据，不发送新请求
                        this.loading = true
                        return false
                    }
                    //加载分页数据
                }
                console.log(type)
                let res
                if (this.isSquare) {
                    res = await axios.get(`${this.$api.community.getArticle(this.id , type.id)}?page=${page}`)
                } else {
                    res = await axios.post(this.$api.article.getArticleListByCommunityIdWithType(this.id , type.name_en) ,
                        {
                            param : {is_choice : this.isChoice} ,
                            page
                        }
                    )
                }
//                this.initData = Object.assign({}, this.initData, res.data)
                this.$set(this.initData , type.name_en , res.data)
                this.loading = true
            } ,
            pageChanged(page) {
                //记录上一次页码
                this.typesLastPage[this.activeType.name_en] = page
                this.getResources(this.activeType , page)
                this.scroll()
            } ,
            scroll() {
                let boxtop = $('#home-list-type').offset().top
                $('html body').animate({
                    scrollTop : boxtop
                } , 700);
            }
        } ,
        computed : {
            activeType() {
                let [active] = this.listType.filter(item => item.active)
                return active
            }
        } ,
        mounted() {
            this.loading = false
            this.listType = this.types.map((item , ind) => {
                item.active = false
                return item
            })
            this.$set(this.initData , 'all' , this._initData)
            this.listType.unshift({summary_catalog_id : 0 , name_en : 'all' , name_cn : '全部' , active : true})
            this.loading = true
        }
    }
</script>