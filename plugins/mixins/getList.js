/**
 * @desc common get another model list to template
 */
export default {
    methods: {
        /**
         * 
         * @param {*} id string : 
         * @param {*} moduleName string :  
         * @param {*} field string :
         */
        async getSelectList(id, moduleName, field) { 
            //find the obj you want to set value in 
            const obj = this.formModels.find((o)=>{
                return o.prop == id
            })               
            try {                    
                // get selectList 
                const { data } = await this.$axios.$get(`admin/getSelectList/${moduleName}`)
                if(!this.$_.isEmpty(data)) {
                    //add select obj key in 
                    data.forEach(item => {
                        item['value'] = item._id
                        item['label'] = item[field]
                    }) 
                    obj.options = data 
                }
            }
            catch(err) {                    
                this.$message({                        
                    message: '發生不明的錯誤,請聯絡管理員!!',
                    type: 'error',
                    customClass: 'bg-red-200'
                })
            }
        }
    }
}