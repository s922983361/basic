<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ title }}</h1>
            <h3 class="text-2xl text-black">{{ $route.params.id }}</h3>
        </header>
        <div class="content p-4">
            <dataTable
                :list="list"
                :title="title"
                :modelName="modelName"
                :columns="columns"
                :operates="operates"
                :listLoading="listLoading"
                :total="total"
                :pagination="pagination"
                :statusFilter="statusFilter"
                :statusArray="statusArray"
                :timeFilter="timeFilter"
                @handleSizeChange="handleSizeChange"
                @handleIndexChange="handleIndexChange"
                @dataRest="fetch"
                ></dataTable>                        
        </div>        
    </div>
</template>

<script>
    import dataTable from '@/components/admin/table/dataTable'
    import table from '@/plugins/mixins/table'
    import notify from '@/plugins/mixins/notify'

    export default {
        layout: 'admin',
        mixins: [table, notify],
        data () {
            return {
                title:'商品所屬類型列表',
                modelName: 'goodsTypeAttrs',//*注意:英文全小寫複數
                goodsType_id: this.$route.params.id,
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: true,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [                    
                    {
                        prop: 'name',
                        label: '類型名稱',
                        align: 'left',
                        width: 100,                        
                    },
                    {
                        prop: 'description',
                        label: '類型描述',
                        align: 'left',
                        width: 200,                        
                    },
                    {
                        prop: 'create_date',
                        label: '創建日期',
                        align: 'center',
                        width: 100,
                        sortable: true
                    },   
                ],
            }
        },
        created() {
            this.fetch()
        },
        components: {
            dataTable
        }
    }

</script>
<style scoped>

</style>