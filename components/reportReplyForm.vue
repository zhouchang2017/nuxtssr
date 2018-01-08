<template>
    <div v-show="isOpen">
        <div class="report-layer-bg" @click="isOpen = false"></div>
        <div class="reportComments">
            <span class="reportComments-colse" @click="isOpen = false">X</span>
            <div class="reportCon_top">
                <h4 class="reportCon_top_left">举报回复</h4>
            </div>
            <form class="reportComments-from" @submit.prevent="Submit">
                <ul class="reportComments-ul">
                    <li v-for="item in types"><span class="radio"><input type="radio" name="types" :value="item" v-model="type" class="radio-check"><label class="radio-check"></label></span> {{item.name}}</li>
                    <textarea placeholder="写下举报的详细情况"  v-model="detail" name="detail" class="reportComments-text" onkeyup="checkLength(this);"></textarea>
                    <button class="reportbtn">提交</button>
                    <button class="reportxf" type="reset">重置</button>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$root.Bus.$on('clickReportReply', (info) => {
                this.isOpen = true
                this.content_type = info.content_type
                this.content_primary_key = info.content_primary_key
            })
        },

        beforeDestroy() {
            this.$root.Bus.$off('clickReportReply')
        },

        data(){
            return{
                isOpen:false,
                type:{name:'垃圾广告信息',type:'1'},
                detail:'',
                types:[
                    {name:'垃圾广告信息',type:'1'},
                    {name:'色情、暴力、血腥等违反法律法规的内容',type:'2'},
                    {name:'政治敏感',type:'3'},
                    {name:'侮辱、歧视、挑衅等',type:'4'},
                    {name:'其他',type:'5'}
                ],
                content_type:null,
                content_primary_key:null
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
                return  axios.post(this.$api.repory.store(this.content_type),this.formData)
            }
        },
        computed:{
            formData(){
                return {detail:this.detail,type:this.type,content_primary_key:this.content_primary_key}
            }
        }

    }
</script>

<style scoped>
    .reportComments{
        display: block;
    }
    .report-layer-bg{
        display: block;
    }
</style>