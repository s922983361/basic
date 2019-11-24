<template>    
    <el-form 
        :model="model" 
        ref="Form" 
        label-width="100px" 
        class="demo-ruleForm"
        >
        <viewPage>
            <template v-for=" item in formModels"> 
                <template :slot="item.position">
                    <el-form-item
                        v-if="item.type == 'file'"
                        :label="item.label"
                        :prop="item.prop"
                        :key="item.prop"
                        >
                        <el-upload
                            class="avatar-uploader"
                            :list-type="item.listType"
                            :action="item.action"
                            :data="item.data"
                            :multiple="item.multiple" 
                            :limit="item.limit"                       
                            :show-file-list="item.showFileList"
                            :auto-upload="item.autoUpload"

                            :headers="getHeader"
                            :before-upload="beforeUploadFile"
                            :on-success="handleFileSuccess"
                            accept="image/png, image/jpeg" 
                            >
                            <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
                            <div slot="tip" class="el-upload__tip">
                                <p><span style="color:#409EFF;">* 點擊 + 上傳圖片</span> 只能上傳 jpg/png 圖片，且不超過500KB</p>                                
                            </div>                            
                            <img class="avatar" v-if="model[item.prop]" :src="model[item.prop]">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'input'"
                        :label="item.label" 
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"                        
                        >
                        <el-input :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
                        
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'textarea'"
                        :label="item.label" 
                        :prop="item.prop"
                        :rows="item.rows"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <el-input :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :disabled="showTextArea"></el-input>

                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'select'"
                        :label="item.label" 
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <el-select v-if="item.multiple" v-model="model[item.prop]" :placeholder="item.placeholder" multiple>
                            <template v-for="option in item.options">
                                <el-option :label="option.label" :value="option.value" :key="option.index" :disabled="option.disabled"></el-option>
                            </template>
                        </el-select>
                        <el-select v-if="!item.multiple" v-model="model[item.prop]" :placeholder="item.placeholder">
                            <template v-for="option in item.options">
                                <el-option :label="option.label" :value="option.value" :key="option.index" :disabled="option.disabled"></el-option>
                            </template>
                        </el-select>

                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'radio'"
                        :label="item.label"
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <el-radio-group v-model="model[item.prop]">
                            <el-radio v-for="option in item.options" :label="option.label" :key=" option.label" :disabled="option.disabled">{{option.title}}</el-radio>
                        </el-radio-group>

                        </el-form-item>
                    <el-col :xs="6" :sm="4" :md="3"
                        v-if="item.type == 'checkbox'" 
                        :key="item.prop"
                        style="margin-bottom:10px"
                        >
                        <el-checkbox
                            v-model="model[item.prop]"
                            :border="item.border"
                            :checked="item.checked"
                            :size="item.size"
                            :rules="item.rules"
                            >{{item.label}}
                        </el-checkbox>

                        </el-col>
                </template>  
            </template>
        </viewPage>    
        <el-form-item>
            <el-button type="primary" @click="submitForm('Form')">{{ $route.params.id ? `編輯` : `新增`}}</el-button>
            <el-button @click="resetForm('Form')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import viewPage from '@/components/admin/form/viewPage'
    import notify from '@/plugins/mixins/notify'
    import { showLoading, hideLoading } from '@/plugins/util/loading'

    export default {
        props: {
            modelName: { type: String, default: '' },
            formModels: { type: Array, default: [] },
        },
        mixins: [ notify ],
        data () {
            return {
                model: {},              
            };
        },
        computed: { 
            getHeader() {  
                const uploadData = this.formModels.filter((item) => {
                    return item.type === 'file'
                })
                if(uploadData.length > 0) { return { 'Authorization': this.$store.state.auth.token }}
                //default value
                return false
            },
            showTextArea() {
                // extend 
                //type == textarea && exist prop "attr_type"
                if(!this.$_.isEmpty(this.model.attr_type)){
                    if(this.model.attr_type == '3') { return false }
                    if(this.model.attr_type == '1' || this.model.attr_type == '2') { return  true } 
                }
                //default value
                return false
            }
        },
        mounted() {
            //_id.vue : To fetch Data first if ID is exsist after mounted 
            if(!this.$_.isEmpty(this.$route.params.id)) {
                this.fetch(this.modelName, this.$route.params.id)
                .then(data =>{
                    this.model = data
                    //pass Data to parent component
                    !this.$_.isEmpty(this.model.logoUrl) && this.$emit('getLogoUrl', this.model.logoUrl)                    
                })
                .catch( err =>{
                    this.$message.error('500 服務器錯誤!, 數據導入失敗!');
                })
            } 
        },
        methods: {
            //submit Form After validate Func
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //pass Data to parent component
                        this.$emit('editData', this.model);
                    } else {
                        this.$notify({
                            message: '尚有表單未完成填寫!!',
                            type: 'error',
                            customClass: 'bg-red-200'
                        })
                        return false;
                    }
                });
            },
            //reset all input data in this component
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // fetch Data from modelName after mounted
            async fetch(modelName, id) { 
                try {
                    const res = await this.$axios.$get(`admin/rest/${modelName}/${id}`)
                    if(res.statusCode === 22500) {
                        await this.notifyFunc(res, 'error', 'bg-red-200')
                        return
                    }
                    return res.data
                }               
                catch(err) {
                    this.$message({                        
                        message: '發生不明的錯誤,請聯絡管理員!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            },         
            beforeUploadFile(file) { 
                /**
                 * @desc element-ui el-upload component hook
                 * **Do not use async function important!!**
                 * @param file is a promise & need to return after imgCpmpress for next step function 
                 */
                showLoading()
                const isIMAGE = file.type === 'image/jpeg'||'image/png'

                if(!isIMAGE) {
                    hideLoading()
                    this.$notify({
                        title: 'Info',
                        type: 'warning',
                        message: '只能是JPG 或 PNG 格式',
                        customClass: 'bg-yellow-200'
                    })                    
                    return false
                }
                /**
                * imageCompress(file, maxSizeMB, maxWidthOrHeight)
                * @param {*} file a bold in promise 
                * @param {*} maxSizeMB the sizeMB of file after cpmpressing (Number/mb default:0.1)
                * @param {*} maxWidthOrHeight that will be resized maxWidthOrHeight (Number/px default:300) 
                 */
                
                return file = this.$imageCompress(file)
            },
            handleFileSuccess(res) {
                /**
                 * @desc element-ui el-upload component hook
                 * **Do not use async function important!!**
                 */
                hideLoading()                
                if(!this.$_.isEmpty(res)) {
                    //Server ERROR 
                    res.statusCode === 90500 && this.notifyFunc(res, 'error', 'bg-red-200')
                    //Success 
                    if(res.statusCode === 90200) {                        
                        this.notifyFunc(res, 'success', 'bg-green-200')
                         //vue $set
                        this.$set(this.model, 'logoUrl', res.file.url)
                        return 
                    }
                }              
            },
        },
        components: {
            viewPage
        },
    }

</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}
.avatar {
    width: 108px;
    height: 108px;
    display: block;
}
</style>