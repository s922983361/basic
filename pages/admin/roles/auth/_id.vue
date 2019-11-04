<template>
    <div class="list w-full">
        <header class="text-center border-b-2 border-teal-300 py-4">
            <h1 class="text-2xl font-bold text-black">{{ pageTitle}}</h1>
            <h3>{{$route.params.id}}</h3>
        </header>
        <div class="w-full mt-10">
            <el-table
                fit
                highlight-current-row
                size="medium"
                :border="true"
                :stripe="true"
                :data="list"
                >               
                <el-table-column                        
                    label="角色模組"
                    width="180"
                    prop="module_name"
                    key="_id"
                    >
                    </el-table-column>
                <el-table-column
                    label="授權功能列表"
                    width="auto"
                    >
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="checkList">
                            <template v-for="child in scope.row.children">
                                <el-checkbox 
                                    :label="child._id" 
                                    :key="child._id"
                                    >{{child.action_name}}
                                    </el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </template>
                    </el-table-column>
            </el-table>
            <el-button @click="save">送出</el-button>
        </div>
    </div>
</template>

<script>
    import notify from '@/plugins/mixins/notify'
    export default {
        layout: 'admin',
        mixins: [notify],
        data () {
            return {
                pageTitle: '角色授權列表',
                modelName: 'accesses',
                list: [],
                checkList: []
            };
        },
        created(){
            this.fetchAccessList()
            this.fetchRoleAccess()
        },
        methods: {
            async fetchAccessList(pageIndex = 1, pageSize = 100) {
                try {
                    const res = await this.$axios.$get(`admin/rest/accesses/${pageIndex}/${pageSize}`)
                    //Server ERROR
                    res.statusCode === 21500 && await this.notifyFunc(res, 'error', 'bg-red-200') 
                    //Success to filter data -- module_id == '0'
                    const topModuleName = res.data.filter((item) => {
                        return item.module_id == '0'
                    })
                    //filter module_id == (module_id == 0)._id 
                    topModuleName.forEach((m) => {
                        m.children = res.data.filter((item) => {
                            return item.module_id == m._id
                        })
                    })
                    this.list = topModuleName
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
            async fetchRoleAccess(pageIndex = 1, pageSize = 100) {
                try {
                    const res = await this.$axios.$get(`admin/rest/roleAccesses/${pageIndex}/${pageSize}`)
                    //Server ERROR
                    res.statusCode === 21500 && await this.notifyFunc(res, 'error', 'bg-red-200')
                    //Success to find data -- item.role_id == this.$route.params.id
                    const accessData = res.data.find((item) => {
                        return item.role_id == this.$route.params.id
                    })
                    this.checkList = accessData.access_id
                }
                catch(err) {

                }
            },
            async save() {
                let model = {}
                let res = {}
                model['role_id'] = this.$route.params.id
                model['access_id'] = this.checkList

                try {
                    res = await this.$axios.$post(`admin/rest/roleAccesses`, model)
                    //Server ERROR
                    res.statusCode === 20500 && await this.notifyFunc(res, 'error', 'bg-red-200')
                     //Success 
                    if(res.statusCode === 20200) {                        
                        await this.notifyFunc(res, 'success', 'bg-green-200')
                        this.$router.push(`/admin/roles`)
                    }

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
        components: {},
    }

</script>
<style scoped>

</style>