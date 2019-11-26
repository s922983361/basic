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
                title:'商品分類列表',
                modelName: 'goodsCates',//*注意:英文全小寫複數
                addPushTo: 'goodsCates',//新增的路由目標
                statusFilter: false,//是否需要狀態過濾
                statusArray:[],//狀態的內容--狀態過濾使用,要依照status順序排列
                timeFilter: true,//是否需要時間過濾
                listLoading: false,
                uploadDir: 'goodsCateImg', //delete pic dirName
                FileName: '', //old image url
                list: [],
                columns: [                    
                    {
                        prop: 'name',
                        label: '分類名稱',
                        align: 'left',
                        width: 70,                        
                    },
                    {
                        prop: 'imageUrl',
                        label: '分類圖片',
                        align: 'left',
                        width: 70,
                        is_image: true //to show image                       
                    },
                    {
                        prop: 'status',
                        label: '狀態',
                        align: 'left',
                        width: 100,                        
                    },
                    {
                        prop: 'sort',
                        label: '排序',
                        align: 'left',
                        width: 100,                        
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
                                this.handleDelAndDeleteImage(row)
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