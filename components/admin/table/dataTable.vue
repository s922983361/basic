<template>
    <viewPage>        
        <template slot="left-field">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" plain @click="$router.push(`/admin/${addPushTo}/edit`)">新增</el-button>
        </template>

        <template slot="search-field">
            <el-input v-model="searchStr" suffix-icon="el-icon-search" placeholder="要搜尋的內容"></el-input>
        </template>

        <template slot="filter-field">
            <el-select v-if="statusFilter" v-model="filterType" placeholder="使用狀態過濾">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(status, index) in statusArray" :key="status" :label="status" :value="index"></el-option>
            </el-select>
            <el-date-picker v-if="timeFilter" type="daterange" start-placeholder="起始時間" end-placeholder="結束時間"></el-date-picker>
        </template>

        <template slot="right-field">
            <el-button 
                type="primary" 
                icon="el-icon-refresh" 
                size="small" 
                round 
                @click="dataRest">資料重整
                </el-button>
            <el-button                 
                type="info" 
                icon="el-icon-printer" 
                size="small"
                @click="printTable" 
                round >列印本頁
                </el-button>
            <el-button 
                v-if="$router.pramas == 'goods'" 
                type="warning" 
                icon="el-icon-upload2" 
                size="small" 
                round>導入 EXCEL
                </el-button>
            <el-button 
                type="success" 
                icon="el-icon-download" 
                size="small" 
                round 
                :loading="downloadLoading"
                @click="handleDownload">導出 EXCEL
                </el-button>
        </template>
        <el-table 
            id="printTableListData"
            :data="filtedData"
            :default-sort = "{ prop: 'date', order: 'descending' }"           
            fit
            highlight-current-row
            >
            <template v-for=" column in columns">
                <el-table-column
                    :prop="column.prop"
                    :label="column.label"
                    :align="column.align"
                    :min-width="column.width"
                    :sortable="column.sortable"
                    :key="column._id"
                    >
                    <template slot-scope="scope">
                        <template v-if="!column.render">
                            <template v-if="column.is_image">
                                <img :src="scope.row[column.prop]" :alt="scope.row[column.label]" style="height:3rem">
                            </template>
                            <template v-else>
                                {{scope.row[column.prop]}}
                            </template>
                        </template>
                        <template v-else>
                            <expand-dom :column="column" :row="scope.row" :render="column.render"></expand-dom>
                        </template>
                        
                    </template>
                </el-table-column>                
            </template>
            <el-table-column 
                label="操作" 
                width="200" 
                align="center"
                fixed="right" 
                v-if="operates.list.length > 0">
                <template slot-scope="scope">
                    <template v-for="(btn, key) in operates.list">
                        <el-button                             
                            size="mini"
                            :type="btn.type"  
                            :icon="btn.icon"
                            :plain="btn.plain" 
                            :key="key"
                            @click.native.prevent="btn.method(scope.row)"
                            >                            
                            </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination mt-4 float-right">
            <el-pagination v-if="pagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleIndexChange"
                :page-sizes="this.tableCurrentPagination.pageArray"
                :page-size="tableCurrentPagination.pageSize"
                :current-page="tableCurrentPagination.pageIndex"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                >
            </el-pagination>
        </div>
    </viewPage>
</template>

<script>
    import viewPage from '@/components/admin/table/viewPage'
    
    const _pageArray = [20, 50, 100] // 每頁展示條數控制
    export default {
        data () {
            return {
                data: [],
                searchStr: '',//搜尋欄位
                filterType: '',//狀態欄位
                filterDates: null,//時間間格
                statuses: [],//當前表格內的狀態結構
                statusColor: [],//狀態顏色
                pageIndex: 1,//分頁預設值:當前頁面
                tableCurrentPagination: {}, //當前分頁的數據結構
                downloadLoading: false,
            };
        },
        props:{
            list: { type: Array, default:[] },
            title: { type: String, default:'' },
            addPushTo: { type: String, default:'' },
            columns: { type: Array, default: [] },
            operates: { type: Object, default: {} },
            statusFilter: { type: Boolean, default: false },
            statusArray: { type: Array, default: [] },
            timeFilter: { type: Boolean, default: false },
            total: { type: Number, default: 0 },
            // 分页参数 === pageSize:每页展示的条数，pageIndex:当前页，pageArray: 每页展示条数的控制集合，默认 _page_array
            pagination: { type: Object, default: null }
        },    
        computed: {
            filtedData() {
                return this.list.filter((item) => {
                    let reg = new RegExp(this.searchStr, 'i')
                    let props = this.columns.map( prop => Object.values(prop)[0])//取出資料庫查詢字段
                    
                    return !this.searchStr || reg.test(item[props[0]]) || reg.test(item[props[1]]) || reg.test(item[props[2]]) || reg.test(item[props[3]])
                })
                .filter((item) => {
                    return this.filterType === '' || item.status === this.filterType
                })
                .filter((item) => {
                    return !this.filterDates || (this.filterDates[0] <= new Date(item.completeDate) && this.filterDates[1] >= new Date(item.completeDate))
                })
            }
        },
        mounted () {
            // 每一頁展示條數控制
            if (this.pagination && !this.pagination.pageSizes) {
                this.pagination.pageArray = _pageArray 
            }
            // 判斷是否需要分頁
            this.tableCurrentPagination = this.pagination || {
                pageSize: this.total,
                pageIndex: 1
            } 
        },
        methods: {
            dataRest () {
                this.$emit('dataRest');
            },
            // 切換每頁顯示的數量
            handleSizeChange (size) {
                if (this.pagination) {
                this.tableCurrentPagination = {
                    pageIndex: 1,
                    pageSize: size
                }
                this.$emit('handleSizeChange', this.tableCurrentPagination)
                }
            },
            // 切換頁碼
            handleIndexChange (currnet) {
                if (this.pagination) {
                this.tableCurrentPagination.pageIndex = currnet
                this.$emit('handleIndexChange', this.tableCurrentPagination)
                }
            },
            //Excel 下載
            handleDownload() {
                this.downloadLoading = true
                import('@/plugins/util/Export2Excel').then(excel => {
                    //標題                  
                    const tHeader = this.columns.map( prop => Object.values(prop)[1]) 
                    //數據字段
                    const filterVal = this.columns.map( prop => Object.values(prop)[0])
                    //要轉換的數據經由過濾後
                    const list = this.filtedData
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'Download',
                        autoWidth: true,
                        bookType: 'xlsx'
                    })
                    this.downloadLoading = false
                })
            },
            //轉換數據
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return this.parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            parseTime(time, cFormat) {
                if (arguments.length === 0) {
                    return null
                }
                const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
                let date
                if (typeof time === 'object') {
                    date = time
                } else {
                    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
                    time = parseInt(time)
                    }
                    if ((typeof time === 'number') && (time.toString().length === 10)) {
                    time = time * 1000
                    }
                    date = new Date(time)
                }
                const formatObj = {
                    y: date.getFullYear(),
                    m: date.getMonth() + 1,
                    d: date.getDate(),
                    h: date.getHours(),
                    i: date.getMinutes(),
                    s: date.getSeconds(),
                    a: date.getDay()
                }
                const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
                    let value = formatObj[key]
                    // Note: getDay() returns 0 on Sunday
                    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
                    if (result.length > 0 && value < 10) {
                    value = '0' + value
                    }
                    return value || 0
                })
                return time_str
            },
            printTable () {
                this.$htmlToPaper('printTableListData')
            }
                
        },
        components: {
            viewPage,
            expandDom: {
                functional: true,
                props: {
                    row: Object,
                    render: Function,
                    index: Number,
                    column: {
                        type: Object,
                        default: null
                    }
                },
                render: (h, ctx) => {
                    const params = {
                        row: ctx.props.row,
                        index: ctx.props.index
                    }
                    if (ctx.props.column) params.column = ctx.props.column
                    return ctx.props.render(h, params)
                }
            }    
        },
    }
</script>
