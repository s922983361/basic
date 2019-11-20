<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ $route.params.id ? `編輯-${pageTitle}` : `新增-${pageTitle}`}}</h1>
            <h1 class="text-2xl font-bold text-black">{{ $route.params.attrs }}</h1>
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
                pageTitle: '商品類型',
                modelName: 'goodsTypeAttrs', 
                formModels: [
                    
                ],
            };
        },
        components: {
            commonEdit
        },
    }

</script>
<style scoped>

</style>