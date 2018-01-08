<template>
    <div v-show="isOpen">
        <div class="report-layer-bg" @click="isOpen = false"></div>
        <div class="reportCon">
            <div class="reportCon_top">
                <h4 class="reportCon_top_left">举报文章</h4>
                <span class="reportCon_top_right" @click="isOpen = false">X</span>
            </div>
            <form class="reportCon_con" @submit.prevent="Submit">
                <div class="choice">
                    <span v-for="item in types" class="radio">{{item.name}}<input type="radio" name="type" :value="item" class="radio-check"  v-model="type"><label class="radio-check"></label></span>
                </div>
                <textarea class="reportText" v-model="detail" name="detail" placeholder="写下举报的详细情况"></textarea>
                <button class="reportbtn">提交</button>
                <button class="reportxf" type="reset">重置</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$root.Bus.$on('clickReportPost', () => {
                this.isOpen = true
            })
        },

        beforeDestroy() {
            this.$root.Bus.$off('clickReportPost')
        },

        data(){
            return{
                isOpen:false,
                type:{name:'广告及垃圾信息',type:'1'},
                detail:'',
                types:[
                    {name:'广告及垃圾信息',type:'1'},
                    {name:'抄袭或未授权转载',type:'2'},
                    {name:'其它',type:'3'}
                ]
            }
        },

        props:{
            id:Number,
            content_type:{
               type:String,
               default:'article'
            }
        },

        methods:{
            async Submit(){
                //简单验证
                if(this.detail.length<6){
                    this.$notify({group:'tips',type:'error',text:'举报描述过于简单'})
                    return
                }
                let res = await this.submitHandle()
                if(res.status===201){
                    this.$notify({group:'tips',type:'success',text:'thinks！',title:'举报成功'})
                    this.isOpen = false
                }
            },
            async submitHandle(){
                return  axios.post(`/report/${this.content_type}`,this.formData)
            }
        },
        computed:{
            formData(){
                return {detail:this.detail,type:this.type,content_primary_key:this.id}
            }
        }

    }
</script>

<style scoped>
    .reportCon{
        display: block;
    }
    .report-layer-bg{
        display: block;
    }
</style>