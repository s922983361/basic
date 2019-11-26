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
                pageTitle: '品牌資訊',
                modelName: 'goodsCates',
                afterSavePushTo: 'goodsCates',
                uploadImage: true,
                formModels: [
                    {                        
                        label: '分類名稱:',
                        prop: 'name',
                        type: 'input',
                        placeholder: '輸入商品分類名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '分類名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },
                    {                        
                        label: '上傳圖片:',
                        prop: 'imageUrl',
                        type: 'file',
                        action: '/api/admin/upload', //sever API
                        listType: 'picture', //['text', 'picture', 'picture-card']
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        data: {
                            uploadFile : 'goodsCateImg'//custom pic dirName
                        },
                        autoUpload: true,
                        showFileList: false,
                        multiple: false,
                        limit: 1, //Number: have to set value if 'multiple' is true                        
                    },
                    {                        
                        label: '篩選屬性:',
                        prop: 'filter_attr',
                        type: 'input',
                        placeholder: '輸入商品篩選屬性名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                    },
                    {                        
                        label: '跳轉地址:',
                        prop: 'link',
                        type: 'input',
                        placeholder: '輸入跳轉地址',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                    },
                    {                        
                        label: '分類模板:',
                        prop: 'template',
                        type: 'input',
                        placeholder: '輸入跳轉地址',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                    },
                    {                        
                        label: '排序:',
                        prop: 'sort',
                        type: 'input',
                        placeholder: '預設值100',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                    },
                    {                        
                        label: '所屬分類:',
                        prop: 'pid',
                        type: 'select',
                        placeholder: '選擇所屬分類 不選即為創建新頂級分類',
                        position: 'response-right', 
                        multiple: false,
                        options: [],             
                    },
                    {                        
                        label: '選擇狀態:',
                        prop: 'status',
                        type: 'radio',//['input','select','checkbox','textarea']
                        position: 'response-right',//['response-left', 'response-right', 'response-full', 'response-checkbox']
                        options:[
                            {                                   
                                label: 0,//radio value
                                title: '未啟用',
                                disabled: false,
                                checked: true
                            },
                            {
                                label: 1,//radio value
                                title: '啟用中',
                                disabled: false
                            },
                        ],
                        rules: [
                            { required: true, message: '請選擇狀態', trigger: 'change' }
                        ]
                    },                    
                    {                        
                        label: 'SEO 標題:',
                        prop: 'keywords',
                        type: 'input',
                        placeholder: '輸入SEO 標題',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                    },
                    {                        
                        label: 'SEO 關鍵詞:',
                        prop: 'sub_title',
                        type: 'input',
                        placeholder: '輸入SEO 關鍵詞',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                    },
                    {                        
                        label: 'SEO 描述:',
                        prop: 'description',
                        type: 'textarea',
                        placeholder: '輸入SEO 描述',
                        position: 'response-right',//['response-left', 'response-right', 'response-full']
                        disabled: false,
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
        created() {
            // find module_name List
            this.getSelectList('pid', this.modelName, 'name')
        },
        components: {
            commonEdit
        },
    }

</script>
<style scoped>

</style>