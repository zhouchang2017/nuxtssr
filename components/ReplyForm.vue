<template>
    <div>
        <textarea class="box-right-text" v-model="commentContent" id="commtext"></textarea>
        <div class="box-icon-left">
            <i class="icon-happy icon-size"></i>

            <i class="icon-pic icon-size" @click="opend = !opend"></i>
        </div>
        <transition name="fade">
            <div class="equipping-factImg" v-show="opend">
                <span class="equipping-close" @click="opend = false">X</span>
                <div class="triangle-up">
                    <b></b>
                </div>
                <div v-if="uploadImgList.length>0" class="parentFileBox">
                    <transition-group class="fileBoxUl" name="list-complete" tag="ul">
                        <li v-for="(image,ind) in uploadImgList" :key="image.key"
                            class="diyUploadHover list-complete-item">
                            <div class="viewThumb" :style="`background-image:url(${image.base64})`" style="background-repeat: no-repeat;background-position:center center;
    width:222px;height:136px;background-size: cover;"></div>
                            <div class="diyCancel" @click="delImg(ind)"></div>
                            <div class="diySuccess"></div>
                            <div class="diyleft" @click="back(ind)"><i class="icon-bkPrevious"></i></div>
                            <div class="diyright" @click="forward(ind)"><i class="icon-bkDown"></i></div>
                        </li>
                    </transition-group>
                </div>
                <vue-core-image-upload ref="uploadimg" v-show="uploadImgList.length<9" :isXhr="false"
                                       :headers="csrftoken" :class="['UploadImg', 'webuploader-container']"
                                       :multiple-size="4" :multiple="true" :crop="false"
                                       @imageuploading="imageuploading" @imagechanged="imagechanged" inputOfFile="file"
                                       @imageuploaded="imageuploaded" :max-file-size="5242880" url="/fileupload/image">
                    <div class="webuploader-pick">
                        <i class="icon-add"></i>点击添加图片，可多选总数不超过9张
                    </div>
                </vue-core-image-upload>

            </div>
        </transition>
        <div class="box-box-right">
            <button @click="submitComment" class="Reactor-building-reply-btn">回复</button>
        </div>
    </div>
</template>
<script>
    /*
    * 文章详情|问答详情
    * 回复输入框组件
    * props参数:
    * id: [文章id]
    * type: [类型…|article|question等,全部小写，以下划线分割]
    * eventBus事件，提交后通过'pushComment'事件，携带response结果，root组件监听'pushComment'事件
    * */
    import VueCoreImageUpload from 'vue-core-image-upload'

    require('lrz')
    export default {
        components : {
            'vue-core-image-upload' : VueCoreImageUpload ,
        } ,
        props : {
            id : Number ,
            //图片上传地址
            uploadPath : {
                type : String ,
                default : '/fileupload/image'
            } ,
            type : String
        } ,
        data() {
            return {
                opend : false ,
                uploadImgList : [] ,
                commentContent : '' ,
                csrftoken : {} ,
                transformName : '' ,
                imagesPath : []
            }
        } ,
        methods : {
            async submitComment() {
                let imgs = null
                if (this.uploadImgList.length > 0) {
                    //有图片
                    try {
                        imgs = await this.upload()
                        this.imagesPath = imgs.data.images
                    } catch (e) {
                        console.log(e)
                    }
                }
                let res = await this.handle()
                if (res.status === 201) {
                    this.$notify({text : res.data.msg , group : 'tips'})
                    this.$root.Bus.$emit('pushComment' , res.data)
                    this.opend = false
                    this.initCommentForm()
                }

            } ,
            imageuploaded(res) {
                console.log('imageuploaded' , res)
            } ,
            imageuploading(res) {
                console.log('imageuploading' , res)
            } ,
            imagechanged(res) {
                if (res.length) {
                    if (this.uploadImgList.length + res.length > 9) {
                        this.$notify({
                            type : 'warning' ,
                            text : '最多9张图片'
                        })
                        return false
                    }
                    for (let i = 0 ; i < res.length ; i++) {
                        let reader = new FileReader()
                        reader.onload = (e) => {
                            let img = e.target.result
                            this.compressImage(img)
                        }
                        reader.readAsDataURL(res[i])
                    }
                } else {
                    if (this.uploadImgList.length + 1 > 9) {
                        this.$notify({
                            type : 'warning' ,
                            text : '最多9张图片' ,
                            group : 'tips'
                        })
                        return false
                    }
                    let reader = new FileReader()
                    reader.onload = (e) => {
                        let img = e.target.result
                        this.compressImage(img)
                    }
                    reader.readAsDataURL(res)
                }
            } ,
            //压缩图片并推入预上传数组
            compressImage(img) {
                let that = this
                lrz(img , {
                    fieldName : 'files'
                })
                .then(function (rst) {
                    rst.key = rst.base64.substr(-15)
                    that.uploadImgList.push(rst)
                })
                .catch(function (err) {
                    // 处理失败会执行
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                })
            } ,
            //上传图片
            async upload() {
                if (this.uploadImgList.length === 0) {
                    console.log('无图片')
                    return Promise.resolve(true)
                }
                return axios.post(this.uploadPath , {
                    files : this.uploadImgList.map(item => item.base64) ,
                    type : 'base64'
                })
            } ,
            //提交文章评论
            async handle() {
                return axios.post(this.$api.comment.store(this.type , this.id) , {
                    commentContent : this.commentContent ,
                    imagesPath : this.imagesPath ,
                    id : this.id
                })
            } ,
            //图片向右移动
            forward(ind) {
                let [temp] = this.uploadImgList.splice(ind , 1)
                this.uploadImgList.splice(ind + 1 , 0 , temp)
            } ,
            //图片向左移动
            back(ind) {
                let [temp] = this.uploadImgList.splice(ind , 1)
                this.uploadImgList.splice(ind - 1 , 0 , temp)
            } ,
            //删除图片
            delImg(ind) {
                this.uploadImgList.splice(ind , 1)
            } ,
            //初始化
            initCommentForm() {
                this.uploadImgList = []
                this.commentContent = ''
                this.imagesPath = []
            }
        } ,
        watch : {
            'uploadImgList.length' : function (val , oldVal) {
                if (val > 9) this.$notify({
                    type : 'warning' ,
                    text : '最多9张图片' ,
                    group : 'tips'
                })
            }

        } ,
        computed : {} ,
        mounted() {
            this.csrftoken['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content
        } ,
        filters : {
            timeLL : function (value) {
                //                return moment.unix(value).format('MM-DD h:mm')
                return moment.unix(value).fromNow()
            }
        }
    }
</script>
<style>
    .g-core-image-upload-form {
        height: 100% !important;
        width: 100% !important;
    }

    .list-complete-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
    }

    .list-complete-enter,
    .list-complete-leave-to
        /* .list-complete-leave-active for below version 2.1.8 */

    {
        opacity: 0;
        transform: translateY(30px);
    }

    .list-complete-leave-active {
        position: absolute;
    }

    .equipping-factImg {
        display: block;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
    {
        opacity: 0
    }
</style>
