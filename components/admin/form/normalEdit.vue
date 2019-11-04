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
                        v-if="item.type == 'input'"
                        :label=item.label 
                        :prop="item.prop"
                        :key="item.prop"
                        :rules="item.rules"                        
                        >
                        <el-input :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
                        
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'textarea'"
                        :label=item.label 
                        :prop="item.prop"
                        :rows="item.rows"
                        :key="item.prop"
                        :rules="item.rules"
                        >
                        <el-input :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder"></el-input>
                        </el-form-item>
                    <el-form-item
                        v-if="item.type == 'select'"
                        :label=item.label 
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
                        :label=item.label
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
    
    export default {
        props: {
            modelName: { type: String, default: '' },
            formModels: { type: Array, default: [] },

        },
        data () {
            return {
                model: {},                
            };
        },
        computed: {            
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
            //路由帶id就先取資料          
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
                let res = {}
                try {
                    //路由是否帶id-=>修改 不帶id=>新增
                    if(!this.$_.isEmpty(id)) {
                        res = await this.$axios.$put(`admin/rest/${modelName}/${id}`, dataModel)                        
                    } else {
                        res = await this.$axios.$post(`admin/rest/${modelName}`, dataModel)                        
                    }
                    //Server ERROR 
                    if(res.statusCode === 20500 || res.statusCode === 23500) {
                        await this.notifyFunc(res, 'error', 'bg-red-200')
                        return
                    }
                    //Success 
                    if(res.statusCode === 20200 || res.statusCode === 23200) {                        
                        await this.notifyFunc(res, 'success', 'bg-green-200')
                        this.$router.push(`/admin/${modelName}`)
                    }
                }
                catch(err) { 
                    //Browser ERROR                   
                    this.$message({                        
                        message: '瀏覽器不明錯誤,請重新操作!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }
            },
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
            async notifyFunc (res, type, customClass) { //type:string['success','error','warning'] customClass:string['bg-green-200','bg-red-200','bg-yellow-200']                
                this.$notify({
                    title: res.title,
                    message: res.msg,
                    type,
                    customClass
                })
            } 
        },
        components: {
            viewPage
        },
    }

</script>
<style scoped>

</style>