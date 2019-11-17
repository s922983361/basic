<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ $route.params.id ? `編輯-${pageTitle}` : `新增-${pageTitle}`}}</h1>
        </header>
        <div class="w-full mt-10">
            <commonEdit
                :modelName=modelName
                :formModels=formModels
                @editData="save"
            ></commonEdit>
        </div>
    </div>
</template>

<script>
    import commonEdit from '@/components/admin/form/commonEdit'
    import notify from '@/plugins/mixins/notify'

    export default {
        layout: 'admin',
        mixins:[ notify],
        data () {
            return {
                pageTitle: '品牌資訊',
                modelName: 'brands', 
                formModels: [                    
                    {                        
                        label: '上傳LOGO:',
                        prop: 'logoUrl',
                        type: 'file',
                        action: '/api/admin/upload', //sever API
                        listType: 'picture', //['text', 'picture', 'picture-card']
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
                        data: {
                            uploadFile : 'brandLogo'//custom pic dirName
                        },
                        autoUpload: true,
                        showFileList: false,
                        multiple: false,
                        limit: 1, //Number: have to set value if 'multiple' is true
                    },
                    {                        
                        label: '品牌名稱:',
                        prop: 'name',
                        type: 'input',
                        placeholder: '輸入管理員名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '品牌名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                ],
            };
        },
        computed: {},
        methods: {
            async save(editData) {
                let res = {}
                editData.manager_id = this.$store.state.auth.id
                try {                 
                    res = await this.$axios.$put(`admin/${this.modelName}/${this.$route.params.id}`, editData)  
                    //Server ERROR 
                    if(res.statusCode === 16500 || res.statusCode === 13204) {
                        await this.notifyFunc(res, 'error', 'bg-red-200')
                        return
                    }
                    //Success 
                    if(res.statusCode === 16200) {                        
                        await this.notifyFunc(res, 'success', 'bg-green-200')
                        this.$router.push(`/admin/${this.modelName}`)
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
        },
        components: {
            commonEdit
        },
    }

</script>
<style scoped>

</style>