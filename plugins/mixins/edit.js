export default {
    methods: {
        async save(editData) {
            //image filed 'imageUrl' is exist
            if(this.uploadImage === true && this.$_.isEmpty(editData.imageUrl)) {
                this.$notify({
                    message: '圖片尚未上傳',
                    type: 'error',
                    customClass: 'bg-red-200'
                })
                return
            }
            //extend
            if(!this.$_.isEmpty(this.$route.params.attrs)){ editData.goodsType_id = this.$route.params.attrs }

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
                    this.$router.push(`/admin/${this.afterSavePushTo}`)
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
        async updateAndDeleteImage(editData) {
            let res = {}
            try { 
                res = await this.$axios.$put(`admin/rest/${this.modelName}/${this.$route.params.id}/${this.uploadDir}/${this.FileName}`, editData)
                //Server ERROR 
                if(res.statusCode === 20500 || res.statusCode === 23500) {
                    await this.notifyFunc(res, 'error', 'bg-red-200')
                    return
                }
                //Success 
                if(res.statusCode === 20200 || res.statusCode === 23200) {                        
                    await this.notifyFunc(res, 'success', 'bg-green-200')
                    this.$router.push(`/admin/${this.afterSavePushTo}`)
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
