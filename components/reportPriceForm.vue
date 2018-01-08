<template>
    <div class="idel_reportCon" v-show="isOpen">
        <form class="reportCon_con" @submit.prevent="Submit">
            <div class="choice">
                <span v-for="item in types" class="radio">{{item.name}}<input type="radio" name="type" :value="item" class="radio-check"  v-model="type"><label class="radio-check"></label></span>
            </div>
            <textarea class="reportText" v-model="detail" name="detail" placeholder="写下举报的详细情况"></textarea>
            <button class="reportbtn">确认提交</button>
        </form>
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
                    {name:'过期失效',type:'1'},
                    {name:'内容违法',type:'2'},
                    {name:'广告垃圾信息',type:'3'},
                    {name:'其它',type:'4'}
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
    .idel_reportCon {
        position: absolute;
        z-index: 3;
        top: -4px;
        right: -8px;
        width: 200px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 2px 1px #f0f0f0;
    }
    .choice .radio {
        display: block;
    }
    .radio .radio-check {
        margin-top: 8px;
    }
    .radio input[type='radio'].radio-check {
        margin: 8px 0 0 2px;
    }
    .reportCon_con {
        width: 100%;
    }
    .reportText {
        width: 80%;
        height: 60px;
        padding: 4px 8px;
        margin: 0 auto;
        background-color: #fff;
    }
    .reportbtn {
        display: block;
        width: 90%;
        float: none;
        background-color: #eee;
        color: #666;
        border: none;
        text-align: center;
        padding: 0;
        margin: 10px auto;
        line-height: 2em;
    }
</style>