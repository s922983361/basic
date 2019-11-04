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
                title:'管理員列表',
                modelName: 'managers',//*注意:英文全小寫複數
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
                                    type: params.row.is_super === 1 ? 'danger' : params.row.is_super === 0 ? 'succcess' : 'info'} // 组件的props(使用狀態碼控制顏色)
                            }, params.row.is_super === 1 ? 'super' : params.row.is_super === 0 ? '一般' : '未知')//组件的props(使用狀態碼控制內容)
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
                // operates: {                    
                //     list: [ 
                //         {
                //             label: '編輯',
                //             type: 'warning',
                //             icon: 'el-icon-edit',
                //             plain: true,                            
                //             method: (row) => {
                //                 this.handleEdit(row)
                //             }
                //         },
                //         {
                //             label: '删除',
                //             type: 'danger',
                //             icon: 'el-icon-delete',
                //             show: true,
                //             plain: false,                            
                //             method: (row) => {
                //                 this.handleDel(row)
                //             }
                //         }
                //     ],                    
                // },
                // total: 0,
                // pagination: {
                //     pageIndex: 1,
                //     pageSize: 20
                // }, 
            }
        },
        computed: {},
        created() {
            this.fetch()
        },
        methods: {
            // async fetch(pageIndex = 1, pageSize = 20) {
            //     try {
            //         const res = await this.$axios.$get(`admin/rest/${this.modelName}/${pageIndex}/${pageSize}`)
            //         //Server ERROR
            //         res.statusCode === 21500 && await this.notifyFunc(res, 'error', 'bg-red-200') 
            //         //Success
            //         this.list = res.data
            //         this.total = res.total
            //     }
            //     catch(err) {
            //          //Browser ERROR                   
            //         this.$message({                        
            //             message: '瀏覽器不明錯誤,請重新操作!!',
            //             type: 'error',
            //             customClass: 'bg-red-200'
            //         })
            //     }                
            // }, 
            // //跳轉編輯頁面
            // async handleEdit (row) {
            //     this.$router.push(`/admin/${this.modelName}/edit/${row._id}`)
            // },
            // //刪除數據
            // async handleDel (row) {
            //     this.$confirm(`是否刪除 "${row.name}"?`, '提示', {
            //         confirmButtonText: '確定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     })
            //     .then( async () => {
            //         try {
            //             const res = await this.$axios.$delete(`/admin/rest/${this.modelName}/${row._id}`)
            //             //Server ERROR 
            //             res.statusCode === 24500 && await this.notifyFunc(res, 'error', 'bg-red-200')
            //             //Success
            //             await this.notifyFunc(res, 'success', 'bg-green-200')
            //             this.fetch()
            //         }
            //         catch(err) {                         
            //              //Browser ERROR                   
            //             this.$message({                        
            //                 message: '瀏覽器不明錯誤,請重新操作!!',
            //                 type: 'error',
            //                 customClass: 'bg-red-200'
            //             })
            //         }                    
            //     })                
            //     .catch(err =>{})
            // },
            // //切換每頁顯示數量
            // async handleSizeChange (pagination) {
            //     this.pagination = pagination
            //     this.fetch(this.pagination.pageIndex, this.pagination.pageSize)
            // },
            //  //切換頁碼
            // async handleIndexChange (pagination) {
            //     this.pagination = pagination
            //     this.fetch(this.pagination.pageIndex, this.pagination.pageSize)
            // },
            // async notifyFunc (res, type, customClass) { //type:string['success','error','warning'] customClass:string['bg-green-200','bg-red-200','bg-yellow-200']                
            //     this.$notify({
            //         title: res.title,
            //         message: res.msg,
            //         type,
            //         customClass
            //     })
            // } 

        },
        components: {
            dataTable
        }
        // components: {
        //     dataTable,
        //     expandDom: {
        //         props: {
        //             column: {
        //                 required: true
        //             },
        //             row: {
        //                 required: true
        //             }
        //         },
        //         render (h) {
        //         return h('div', {}, ([this.column.render(this.row, this.column)]))
        //         }
        //     }
        // },
    }

</script>
<style scoped>

</style>