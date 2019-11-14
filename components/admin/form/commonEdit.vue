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
                            :action="`/api/admin/upload`"
                            :data="item.data"
                            :multiple="item.multiple"                        
                            :show-file-list="item.showFileList"                            
                            :auto-upload="item.autoUpload"
                            :headers="getHeader"
                            :on-success="afterUpload"
                            accept="image/png, image/jpeg"
                            >
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
                        <el-input :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder"></el-input>

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
                return {                    
                    'Authorization': this.$store.state.auth.token
                }
            }          
            // escapeHtml() {             
            //     for (let key in this.model) {
            //         if(this.$_.isString(this.model[key])){
            //             // key = this.$_.escape(this.model[key])
            //             this.model[key] = this.$_.escape(this.model[key]) 
            //             console.log(this.model)                       
            //         }                   
            //     }                
            // }
        },
        mounted() {
            //_id.vue : To fetch Data first if ID is exsist after mounted 
            if(!this.$_.isEmpty(this.$route.params.id)) {
                this.fetch(this.modelName, this.$route.params.id)
                .then(data =>{
                    this.model = data
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
            async afterUpload(res) {
                //vue $set
                this.$set(this.model, 'logoUrl', res.file.url)
                //this.model.icon = res.file.url
            },
            // async beforeUpload() {

            // }
        },
        components: {
            viewPage
        },
    }

</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}