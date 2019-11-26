/**
 * @desc common mixin in All Admin Table List Component
 */
export default {
    data() {
        return { 
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
        }
    },
    methods: {
        /**
         * @desc use $axios to fetch data from database
         * @param {*} pageIndex nunber default:1, table index page 
         * @param {*} pageSize nunber default:20, the count of data in table list
         */
        async fetch(pageIndex = 1, pageSize = 20) {
            try {
                const res = await this.$axios.$get(`admin/rest/${this.modelName}/${pageIndex}/${pageSize}`)
                //Server ERROR
                res.statusCode === 21500 && await this.notifyFunc(res, 'error', 'bg-red-200') 
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
            this.$router.push(`/admin/${this.addPushTo}/edit/${row._id}`)
        },
        /**
         * @desc use $axios to delete data of this row form database
         * Function is binded 'operates.list.methods' on table component
         * @param {*} row scope row data form Datatable component
         */
        async handleDel (row) {
            this.$confirm(`是否刪除 "${row.name ? row.name : row.title }"?`, '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then( async () => {
                try {
                    const res = await this.$axios.$delete(`/admin/rest/${this.modelName}/${row._id}`)
                    //Server ERROR 
                    res.statusCode === 24500 && await this.notifyFunc(res, 'error', 'bg-red-200')
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
         * @desc use $axios to delete data and image of this row form database
         * Function is binded 'operates.list.methods' on table component
         * @param {*} row scope row data form Datatable component
         */
        async handleDelAndDeleteImage (row) {

            let path = '/uploads/' + this.uploadDir + '/'
            let str = process.env.baseUrl + path
            let fileName = row.imageUrl.substring(str.length)
            this.FileName = fileName

            this.$confirm(`是否刪除 "${row.name ? row.name : row.title }"?`, '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then( async () => {
                try {
                    const res = await this.$axios.$delete(`/admin/rest/${this.modelName}/${row._id}/${this.uploadDir}/${this.FileName}`)
                    //Server ERROR 
                    res.statusCode === 24500 && await this.notifyFunc(res, 'error', 'bg-red-200')
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
        //get parent detail
        async fetchGoodsTypeDetail(parentModelName, id) {
            try {
                const res = await this.$axios.$get(`admin/rest/${parentModelName}/${id}`)
                if(res.statusCode === 22500) {
                    await this.notifyFunc(res, 'error', 'bg-red-200')
                    return
                }
                this.pageSubTitle = res.data.name
            }               
            catch(err) {
                this.$message({                        
                    message: '發生不明的錯誤,請聯絡管理員!!',
                    type: 'error',
                    customClass: 'bg-red-200'
                })
            }
        },
    },
    components: {        
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