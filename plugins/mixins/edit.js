export default {
    methods: {
        async save(editData) {
            let res = {}
            try { 
                //路由是否帶id-=>修改 不帶id=>新增
                if(!this.$_.isEmpty(this.$route.params.id)) {
                    res = await this.$axios.$put(`admin/rest/${this.modelName}/${this.$route.params.id}`, editData)                        
                } else {
                    res = await this.$axios.$post(`admin/rest/${this.modelName}`, editData)                        
                }
                //Server ERROR 
                if(res.statusCode === 20500 || res.statusCode === 23500) {
                    await this.notifyFunc(res, 'error', 'bg-red-200')
                    return
                }
                //Success 
                if(res.statusCode === 20200 || res.statusCode === 23200) {                        
                    await this.notifyFunc(res, 'success', 'bg-green-200')
                    this.$router.push(`/admin/${this.modelName}`)
                }
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
}
