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
    export default {
        layout: 'admin',
        data () {
            return {
                title:'範例',
                modelName: 'examples',
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [                    
                    {
                        prop: 'name',
                        label: '名稱',
                        align: 'center',
                        width: 100,
                    },                    
                    {
                        prop: 'artcle',
                        label: '文章',
                        align: 'center',
                        width: 150,
                    },
                    {
                        prop: 'color',
                        label: '顏色',
                        align: 'center',
                        width: 50,
                        sortable: true
                    },
                    {
                        prop: 'gender',
                        label: '性別',
                        align: 'center',
                        width: 50,
                        sortable: true
                    },  
                ],
                operates: {                    
                    list: [ 
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
                total: 0,
                pagination: {
                    pageIndex: 1,
                    pageSize: 20
                }, 
            };
        },
        computed: {},
        created() {
            this.fetch()
        },
        methods: {
            async fetch(pageIndex = 1, pageSize = 20) {
                const { data, total } = await this.$axios.$get(`admin/rest/${this.modelName}/${pageIndex}/${pageSize}`)
                this.list = data
                this.total = total
            }, 
            //跳轉編輯頁面
            async handleEdit (row) {
                this.$router.push(`/admin/${this.modelName}/edit/${row._id}`)
            },
            //刪除數據
            async handleDel (row) {
                this.$confirm(`是否刪除 "${row.name}"?`, '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then( async () => {
                    try {
                        const res = await this.$axios.$delete(`/admin/rest/${this.modelName}/${row._id}`)
                        this.$notify({
                            title: '刪除數據成功',
                            message: res.msg,
                            type: 'success',
                            customClass: 'bg-green-200'
                        })
                        this.fetch()
                    }
                    catch(err) {
                        // throw new Error('500 server error!')
                        throw new Error(err.message)
                        this.$notify({
                            title: '服務器錯誤',
                            message: res.msg,
                            type: 'error',
                            customClass: 'bg-red-200'
                        })
                    }                    
                })
            },
            //切換每頁顯示數量
            async handleSizeChange (pagination) {
                this.pagination = pagination
                this.fetch(this.pagination.pageIndex, this.pagination.pageSize)
            },
             //切換頁碼
            async handleIndexChange (pagination) {
                this.pagination = pagination
                this.fetch(this.pagination.pageIndex, this.pagination.pageSize)
            },

        },
        components: {
            dataTable,
            expandDom: {
                props: {
                    column: {
                        required: true
                    },
                    row: {
                        required: true
                    }
                },
                render (h) {
                return h('div', {}, ([this.column.render(this.row, this.column)]))
                }
            }
        },
    }

</script>
<style scoped>

</style>