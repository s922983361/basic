<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ $route.params.id ? `編輯-${pageTitle}` : `新增-${pageTitle}`}}</h1>
            <h1 class="text-2xl font-bold text-black">{{ pageSubTitle }}</h1>
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
                pageTitle: '商品類型屬性',
                pageSubTitle: '',
                parentModelName: 'goodsTypes',
                modelName: 'goodsTypeAttrs',
                afterSavePushTo: `goodsTypes/${this.$route.params.attrs}`, 
                formModels: [
                    {                        
                        label: '屬性名稱:',
                        prop: 'name',
                        type: 'input',
                        placeholder: '輸入屬性名稱',
                        position: 'response-left',//['response-left', 'response-right', 'response-full']
                        disabled: false,
                        rules:[
                            { required: true, message: '類型名稱必須填寫', trigger: 'blur' },
                            { max: 50, message: '太長(50個字)', trigger: 'blur' },
                        ]
                    },                    
                    {                        
                        label: '輸入方式:',
                        prop: 'attr_type',
                        type: 'radio',//['input','select','checkbox','textarea']
                        position: 'response-full',//['response-left', 'response-right', 'response-full', 'response-checkbox']
                        options:[
                            {                                   
                                label: '1',//radio value
                                title: 'input 單行文本框',
                                disabled: false,
                                checked: true
                            },
                            {
                                label: '2',//radio value
                                title: 'textarea 多行文本框',
                                disabled: false
                            },
                            {
                                label: '3',//radio value
                                title: 'select下拉選單,從下面列表中選擇(一行代表一個可選值)',
                                disabled: false
                            },
                        ],
                        rules: [
                            { required: true, message: '請選擇輸入方式', trigger: 'change' }
                        ]
                    },
                    {                        
                        label: '可選值列表',
                        prop: 'attr_value',
                        type: 'textarea',//['input','select','checkbox','textarea']
                        placeholder: '選擇select下拉選單才需填寫, 輸入可選值, 一行代表一個可選值',
                        rows: 20,
                        position: 'response-full',//['response-left', 'response-right', 'response-full']
                        rules:[                            
                            { max: 50, message: '最多50個字', trigger: 'blur' }
                        ] 
                    },
                ],
            };
        },
        created() {
            //get parent detail in mixins
            this.$route.params.attrs && this.fetchGoodsTypeDetail(this.parentModelName, this.$route.params.attrs)
        },        
        components: {
            commonEdit
        },
    }

</script>
<style scoped>

</style>