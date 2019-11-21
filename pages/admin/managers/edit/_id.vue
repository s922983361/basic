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
    import getList from '@/plugins/mixins/getList'
    import edit from '@/plugins/mixins/edit'
    import notify from '@/plugins/mixins/notify'

    export default {
        layout: 'admin',
        mixins: [ getList, notify , edit ],
        data () {
            return {
                pageTitle: '管理員資訊',
                modelName: 'managers',
                afterSavePushTo: 'managers',
                formModels: [
                    {                        
                        label: '管理員名稱:',
                        prop: 'name',
                        type: 'input',
                        placeholder: '輸入管理員名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '管理員名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '聯絡信箱:',
                        prop: 'email',
                        type: 'input',
                        placeholder: '輸入聯絡信箱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '聯絡信箱必須填寫', trigger: 'blur' },
                            { type: 'email', message: '請輸入正確的信箱地址', trigger: ['blur', 'change'] },
                            { max: 70, message: '太長(70個字)', trigger: 'blur' },
                        ]
                    },                    
                    {                        
                        label: '聯絡電話:',
                        prop: 'tel',
                        type: 'input',
                        placeholder: '輸入聯絡電話',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,                        
                    },
                    {                        
                        label: '角色權限',
                        prop: 'role_id',
                        type: 'select',//['input','select','checkbox','textarea'] 
                        placeholder: '選擇角色',
                        position: 'response-left',//['response-left', 'response-right', 'response-full','response-checkbox'] 
                        multiple: false,
                        options:[],//權限模組獲取
                        rules: [
                            { required: true, message: '請選擇管理員角色', trigger: 'change' }
                        ]                        
                    },
                    {                        
                        label: '密碼:',
                        prop: 'password',
                        type: 'input',
                        placeholder: '設定後不能修改',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: false                        
                    },
                    {                        
                        label: '頭像:',
                        prop: 'avatar',
                        type: 'input',
                        placeholder: '全球頭像自動產生',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: true                        
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
        created() {
            // find Role List
            this.getSelectList('role_id', 'roles', 'title')                        
        },
        components: {
            commonEdit
        },
    }

</script>
<style scoped>

</style>