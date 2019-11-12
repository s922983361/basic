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
                pageTitle: '模組及權限',
                modelName: 'accesses', 
                formModels: [                    
                    {                        
                        label: '模組名稱:',
                        prop: 'module_name',
                        type: 'input',
                        placeholder: '輸入模組名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        rules:[
                            { required: true, message: '模組名稱必須填寫', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '模組icon:',
                        prop: 'icon',
                        type: 'input',
                        placeholder: '輸入要顯示的模組icon',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']                        
                    },
                    {                        
                        label: '節點類型:',
                        prop: 'type',
                        type: 'select',
                        placeholder: '選擇節點',
                        position: 'response-left', 
                        multiple: false,
                        options:[
                            { value: 1, label: '1.頂級模組' },
                            { value: 2, label: '2.菜單列表' },
                            { value: 3, label: '3.操作功能' },
                        ],
                        rules: [
                            { required: true, message: '請選擇節點類型', trigger: 'change' }
                        ]                        
                    },
                    {                        
                        label: '選擇模組:',
                        prop: 'module_id',
                        type: 'select',
                        placeholder: '不選即為創建新模組',
                        position: 'response-left', 
                        multiple: false,
                        options: [],
                    },
                    {                        
                        label: '操作名稱:',
                        prop: 'action_name',
                        type: 'input',
                        placeholder: '請輸入操作名稱(節點:操作須輸入)',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        rules:[
                           // { required: true, message: '模組名稱必須填寫', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '操作路由:',
                        prop: 'url',
                        type: 'input',
                        placeholder: '(節點:操作須輸入)ex:/admin/role/add',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        rules:[
                           // { required: true, message: '模組名稱必須填寫', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '排序:',
                        prop: 'sort',
                        type: 'input',
                        placeholder: '要排序的數值',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        rules:[
                           // { required: true, message: '模組名稱必須填寫', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '描述:',
                        prop: 'description',
                        type: 'textarea',//['input','select','checkbox','textarea']
                        placeholder: '簡單的描述',
                        rows: 20,
                        position: 'response-full',//['response-left', 'response-right', 'response-full']                        
                    },
                ],

            };
        },
        created() {
            // find module_name List
            this.getSelectList('module_id', 'accesses', 'module_name')
        },
        components: {
            commonEdit
        },
    }

</script>
<style scoped>

</style>