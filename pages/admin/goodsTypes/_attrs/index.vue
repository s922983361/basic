<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ title }}</h1>
            <h3 class="text-2xl text-black">{{ $route.params.attrs }}</h3>
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
                title:'商品所屬類型列表',
                modelName: 'goodsTypeAttrs',//*注意:英文全小寫複數
                addPushTo: `goodsTypes/${this.$route.params.attrs}`,
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
        methods: {
        /**
         * @custom this is custom fetch not equal fetch() in mixins table.js 
         * @desc use $axios to fetch data from database & use $route.params.attrs filter data & total
         * @param {*} pageIndex nunber default:1, table index page 
         * @param {*} pageSize nunber default:20, the count of data in table list
         */
        async fetch(pageIndex = 1, pageSize = 20) {
            try {
                const res = await this.$axios.$get(`admin/rest/${this.modelName}/${pageIndex}/${pageSize}`)
                //Server ERROR
                res.statusCode === 21500 && await this.notifyFunc(res, 'error', 'bg-red-200') 
                //Success
                //get data match this.$route.params.attrs
                const filterData = res.data.filter((item) => {
                    return item.goodsType_id == this.$route.params.attrs
                })
                this.list = filterData
                this.total = filterData.length
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
        },
        components: {
            dataTable
        }
    }

</script>
<style scoped>

</style>