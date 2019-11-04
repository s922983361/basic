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
                title:'管理員角色',
                modelName: 'roles',//*注意:英文全小寫複數
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: true,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [                    
                    {
                        prop: 'title',
                        label: '角色名稱',
                        align: 'left',
                        width: 50,                        
                    },                   
                    {
                        prop: 'status',
                        label: '狀態',
                        align: 'center',
                        width:  50,
                        render: (h, params) => {
                            return h('el-tag', {
                                props: {
                                    type: params.row.status === 0 ? 'danger' : params.row.status === 1 ? 'info' : 'succcess'} // 组件的props(使用狀態碼控制顏色)
                            }, params.row.status === 0 ? '啟用中' : params.row.status === 1 ? '停用中': '未知')//组件的props(使用狀態碼控制內容)
                        }
                    },                 
                    {
                        prop: 'create_date',
                        label: '創建日期',
                        align: 'center',
                        width: 50,
                        sortable: true
                    },    
                ],
                operates: {                    
                    list: [ 
                        {
                            label: '權限',
                            type: 'info',
                            icon: 'el-icon-setting',
                            plain: true,                            
                            method: (row) => {
                                this.handleAuth(row)
                            }
                        },
                        {
                            label: '編輯',
                            type: 'warning',
                            icon: 'el-icon-edit',
                            plain: true,                            
                            method: (row) => {
                                this.handleEdit(row)
                            }
                        },
                        {
                            label: '删除',
                            type: 'danger',
                            icon: 'el-icon-delete',
                            show: true,
                            plain: false,                            
                            method: (row) => {
                                this.handleDel(row)
                            }
                        }
                    ],                    
                },
            };
        },
        computed: {},
        methods: {
            //跳轉權限頁面
            async handleAuth (row) {
                this.$router.push(`/admin/${this.modelName}/auth/${row._id}`)
            }
        },
        components: {
            dataTable
        }
    }

</script>
<style scoped>

</style>