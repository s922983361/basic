<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ title }}</h1>
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
                title:'角色功能及權限列表',
                modelName: 'accesses',
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [                    
                    {
                        prop: 'module_name',
                        label: '模組名稱',
                        align: 'left',
                        width: 50,
                    },                    
                    {
                        prop: 'type',
                        label: '節點',
                        align: 'center',
                        width: 50,
                        render: (h, params) => {
                            return h('el-tag', {
                                props: {
                                    type: params.row.type === 1 ? 'danger' : params.row.type === 2 ? 'info' : 'succcess'} // 组件的props(使用狀態碼控制顏色)
                            }, params.row.type === 1 ? '頂級模組' : params.row.type === 2 ? '菜單列表': '操作功能')//组件的props(使用狀態碼控制內容)
                        }
                    },
                    {
                        prop: 'action_name',
                        label: '操作',
                        align: 'left',
                        width: 50,
                    },
                    {
                        prop: 'url',
                        label: '操作URL',
                        align: 'left',
                        width: 100,
                    }, 
                    {
                        prop: 'sort',
                        label: '排序',
                        align: 'center',
                        width: 50,
                        sortable: true
                    },
                ],
            };
        },
        components: {
            dataTable,            
        },
    }

</script>
<style scoped>

</style>