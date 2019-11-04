<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ $route.params.id ? `編輯-${pageTitle}` : `新增-${pageTitle}`}}</h1>
        </header>
        <div class="w-full mt-10">
            <normalEdit
                :modelName=modelName
                :formModels=formModels
            ></normalEdit>
        </div>
    </div>
</template>

<script>
    import normalEdit from '@/components/admin/form/normalEdit'
    export default {
        layout: 'admin',
        data () {
            return {
                pageTitle: '管理員角色',
                modelName: 'roles', 
                formModels: [
                    {                        
                        label: '名稱:',
                        prop: 'title',
                        type: 'input',
                        placeholder: '輸入角色名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '角色名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '狀態:',
                        prop: 'status',
                        type: 'input',
                        placeholder: '輸入聯絡信箱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,                        
                    },
                    {                        
                        label: '描述:',
                        prop: 'description',
                        type: 'textarea',
                        placeholder: '簡單描述',
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
                        disabled: false                        
                    },
                    {                        
                        label: '創建時間:',
                        prop: 'create_date',
                        type: 'input',
                        placeholder: '創建時間資料庫自動產生',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: true                        
                    },
                    {                        
                        label: '修改時間:',
                        prop: 'update_date',
                        type: 'input',
                        placeholder: '修改時間資料庫自動產生',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: true                        
                    },
                ],
            };
        },
        computed: {},        
        methods: {
            
        },
        components: {
            normalEdit
        },
    }

</script>
<style scoped>

</style>