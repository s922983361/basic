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
                pageTitle: '表單範例測試',
                modelName: 'examples',
                formModels: [                    
                    {                        
                        label: '名稱',
                        prop: 'name',
                        type: 'input',//['input','select','checkbox','textarea']
                        placeholder: 'please enter your name',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        rules:[
                            { required: true, message: '請輸入管理員名稱', trigger: 'blur' },
                            { min: 2, max: 50, message: '2~10個字之間', trigger: 'blur' }
                        ]
                    },
                    {                        
                        label: '文章',
                        prop: 'artcle',
                        type: 'textarea',//['input','select','checkbox','textarea']
                        placeholder: 'please enter your artcle',
                        rows: 20,
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
                        rules:[
                            { required: true, message: '請輸入文章內容', trigger: 'blur' },
                            { max: 50, message: '最多10個字', trigger: 'blur' }
                        ] 
                    },
                    {                        
                        label: '顏色',
                        prop: 'color',
                        type: 'select',//['input','select','checkbox','textarea'] 
                        placeholder: 'please choose colors',
                        position: 'response-right',//['response-left', 'response-right', 'response-full','response-checkbox'] 
                        multiple: true,
                        options:[
                            {
                                value: 'red',
                                label: '紅色',
                                disabled: true
                            },
                            {
                                value: 'blue',
                                label: '藍色'
                            },
                            {
                                value: 'black',
                                label: '黑色'
                            },
                        ],
                        rules: [
                            { required: true, message: '請選擇商品顏色', trigger: 'change' }
                        ]                        
                    },
                    {                        
                        label: '特價中',
                        prop: 'sales',
                        type: 'checkbox',//['input','select','checkbox','textarea']
                        size: 'medium',//['medium ','small','mini']
                        checked: false,
                        border: true,
                        position: 'response-checkbox'//['response-left', 'response-right', 'response-full', 'response-checkbox'] 
                    },
                    {                        
                        label: '上架中',
                        prop: 'onSales',
                        type: 'checkbox',//['input','select','checkbox','textarea']
                        size: 'medium',//['medium ','small','mini']
                        checked: false,
                        border: true,
                        position: 'response-checkbox'//['response-left', 'response-right', 'response-full', 'response-checkbox'] 
                    },
                    {                        
                        label: '性別',
                        prop: 'gender',
                        type: 'radio',//['input','select','checkbox','textarea']
                        position: 'response-left',//['response-left', 'response-right', 'response-full', 'response-checkbox']
                        options:[
                            {                                   
                                label: 'male',//radio value
                                title: '男',
                                disabled: false,
                                checked: true
                            },
                            {
                                label: 'female',//radio value
                                title: '女',
                                disabled: false
                            },
                        ],
                        rules: [
                            { required: true, message: '請選擇性別', trigger: 'change' }
                        ]
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