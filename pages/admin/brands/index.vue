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
    import notify from '@/plugins/mixins/notify'

    export default {
        layout: 'admin',        
        mixins: [ notify ],
        
        data () {
            return {
                title:'品牌列表',
                modelName: 'brands',
                addPushTo: 'brands',
                manager_id: this.$store.state.auth.id,
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: false,//是否需要時間過濾
                listLoading: false,                
                list: [],
                columns: [                    
                    {
                        prop: 'name',
                        label: '品牌名稱',
                        align: 'left',
                        width: 50,
                    }, 
                    {
                        prop: 'logoUrl',
                        label: '品牌logo',
                        align: 'left',
                        width: 50,
                        is_image: true //to show image                       
                    },
                    {
                        prop: 'status',
                        label: '是否啟用',
                        align: 'left',
                        width: 50,
                    }, 
                    {
                        prop: 'create_date',
                        label: '創建時間',
                        align: 'center',
                        width: 50,
                        sortable: true
                    },
                ],
                operates: { /**控制按鈕 */                    
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
                total: 0,/**數據總數量 default:0 */ 
                pagination: {
                    pageIndex: 1,/**第幾頁 default:1 */ 
                    pageSize: 20 /**每頁最多數據量 default:20 */ 
                },
            };
        },
        computed: {},
        created() {
            this.fetch()
        },
        methods: {
            /**
             * @desc use $axios to fetch data from database
             * @param {*} pageIndex nunber default:1, table index page 
             * @param {*} pageSize nunber default:20, the count of data in table list
             */
            async fetch(pageIndex = 1, pageSize = 20) {
                try {
                    const res = await this.$axios.$get(`admin/${this.modelName}/${this.manager_id}/${pageIndex}/${pageSize}`)
                    //Server ERROR
                    res.statusCode === 14500 && await this.notifyFunc(res, 'error', 'bg-red-200') 
                    //Success
                    this.list = res.data
                    this.total = res.total
                }
                catch(err) {
                    //Browser ERROR                   
                    this.$message({                        
                        message: '瀏覽器不明錯誤,請重新操作!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }                
            },
            /**
             * @desc rediect to edit Page (FOR edit data)
             * Function is binded 'operates.list.methods' on table component
             * @param {*} row scope row data form Datatable component
             */        
            async handleEdit (row) {
                this.$router.push(`/admin/${this.modelName}/edit/${row._id}`)
            },
            /**
             * @desc use $axios to delete data of this row form database
             * Function is binded 'operates.list.methods' on table component
             * @param {*} row scope row data form Datatable component
             */
            async handleDel (row) {

                let baseUrl = 'http://localhost:3000'
                let path = '/uploads/brandLogo/'
                let str = baseUrl + path
                let fileName = row.logoUrl.substring(str.length)

                this.$confirm(`是否刪除 "${row.name ? row.name : row.title }"? 如果您的品牌已經建立過商品, 刪除此品牌將會一併刪除相關的所有商品, 確定要刪除?`, '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    type: 'error'
                })
                .then( async () => {
                    try {
                        const res = await this.$axios.$delete(`/admin/${this.modelName}/${row._id}/${this.$store.state.auth.id}/${fileName}`)
                        //Server ERROR 
                        res.statusCode === 15500 && await this.notifyFunc(res, 'error', 'bg-red-200')
                        //Success
                        await this.notifyFunc(res, 'success', 'bg-green-200')
                        this.fetch()
                    }
                    catch(err) {                         
                        //Browser ERROR                   
                        this.$message({                        
                            message: '瀏覽器不明錯誤,請重新操作!!',
                            type: 'error',
                            customClass: 'bg-red-200'
                        })
                    }                    
                })                
                .catch(err =>{})
            },
            /**
             * @desc toggle the count of every page
             * @param {*} pagination number , it is binded table component ,it is setted up by component
             */
            async handleSizeChange (pagination) {
                this.pagination = pagination
                this.fetch(this.pagination.pageIndex, this.pagination.pageSize)
            }, 
            /**
            * @desc toggle which page to show
            * @param {*} pagination number , it is binded table component ,it is setted up by component
            */
            async handleIndexChange (pagination) {
                this.pagination = pagination
                this.fetch(this.pagination.pageIndex, this.pagination.pageSize)
            },
        },
        components: {
            dataTable, 
        },
    }

</script>
<style scoped>

</style>