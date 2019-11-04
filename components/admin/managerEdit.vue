<template>    
    <el-form :model="model" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理員名稱" prop="name">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="聯絡信箱" prop="email">
            <el-input v-model="model.email"></el-input>
        </el-form-item>
        <el-form-item label="聯絡信箱" prop="password">
            <el-input v-model="model.password"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('Form')">建立</el-button>
            <el-button @click="resetForm('Form')">重置</el-button>
        </el-form-item>           
    </el-form> 
</template>

<script>
import { STATUS_CODES } from 'statuses';
    export default {
        data () {
            return {
                modelName: 'managers',
                model: {
                    name: '',
                    email: '',                    
                },
                rules: {
                    name: [
                        { required: true, message: '請輸入管理員名稱', trigger: 'blur' },
                        { min: 2, max: 10, message: '2~10個字之間', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '請輸入聯絡信箱', trigger: 'blur' },
                        { min: 6, max: 50, message: '6~50個字之間', trigger: 'blur' }
                    ],
                    
                    password: [
                        { required: true, message: '請輸入密碼', trigger: 'blur' },
                        { min: 6, max: 50, message: '6~50個字之間', trigger: 'blur' }
                    ],
                }
            };
        },
        mounted() {
            //路由帶id就先取資料          
            if(!this.$_.isEmpty(this.$route.params.id)) {
                this.fetch(this.modelName, this.$route.params.id)
                .then(data =>{
                    this.model = data
                })
                .catch( err =>{
                    this.$notify({
                        title: '服務器錯誤',
                        message: '請聯絡管理人員, 500 server error!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                })
            } 
        },
        methods: {
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.save(this.model, this.modelName, this.$route.params.id)
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async save(dataModel, modelName, id) {
                let res                
                //路由是否帶id-=>修改 不帶id=>新增
                if(!this.$_.isEmpty(id)) {
                    res = await this.$axios.$put(`admin/rest/${modelName}/${id}`, dataModel)                    
                } else {                    
                    res = await this.$axios.$post(`admin/rest/${modelName}`, dataModel)                    
                }
                if(!this.$_.isEmpty(res)){
                    this.$notify({
                        title: '存儲數據成功',
                        message: res.msg,
                        type: 'success',
                        customClass: 'bg-green-200'
                    })
                    this.$router.push(`/admin/${modelName}`)
                } else {
                    this.$notify({
                        title: '服務器錯誤',
                        message: '請聯絡管理人員, 500 server error!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                    this.resetForm('Form')
                }
            },
            async fetch(modelName, id) {
                const { data } = await this.$axios.$get(`admin/rest/${modelName}/${id}`)
                return data
            },
        },
        components: {},
    }

</script>
<style scoped>

</style>