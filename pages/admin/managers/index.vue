<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ title }}</h1>
        </header>
        <div class="content p-4">
            <dataTable
                :list="list"
                :title="title"
                :addPushTo="addPushTo"
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
                title:'管理員列表',
                modelName: 'managers',//*注意:英文全小寫複數
                addPushTo: 'managers',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: true,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [                    
                    {
                        prop: 'name',
                        label: '管理員名稱',
                        align: 'left',
                        width: 100,                        
                    },                      
                    {
                        prop: 'is_super',
                        label: '身分',
                        align: 'center',
                        width: 50,
                        render: (h, params) => {
                            return h('el-tag', {
                                props: {
                                    type: params.row.is_super === true ? 'danger' : 'succcess' } // 组件的props(使用狀態碼控制顏色)
                            }, params.row.is_super === true ? 'super' : '一般')//组件的props(使用狀態碼控制內容)
                        }
                    },                                        
                    {
                        prop: 'role_id',
                        label: '管理員角色',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            return h('el-tag', {
                                props: {
                                    type: params.row.role_id === '5db0f7587b9fe840f0b1f73a' ? 'danger' : params.row.role_id === '5db0f7ab7b9fe840f0b1f73b' ? 'succcess' : params.row.role_id === '5db0f7b77b9fe840f0b1f73c' ? 'info' : 'danger'} // 组件的props(使用狀態碼控制顏色)
                            }, params.row.role_id === '5db0f7587b9fe840f0b1f73a' ? 'super' : params.row.role_id === '5db0f7ab7b9fe840f0b1f73b' ? '廠商' : params.row.role_id === '5db0f7b77b9fe840f0b1f73c' ? '經銷商' :'未知')//组件的props(使用狀態碼控制內容)
                        }
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