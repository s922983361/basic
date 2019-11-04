
import isEmpty from 'lodash/isEmpty'
import request from './request'
import { Message } from 'element-ui'




//暫時沒用需要修改






export const getSelectList = async (formModels, prop, modelName, label) => {
    /**
     * @desc get select list Data to add  & edit template
     * formModel: 'Array', The data send to normalEdit.vue
     * prop: 'String',Field prop name in formModel you wnat to get (type must be select html)
     * modelName:'String',  what model we choose to get data
     * label: String' ,the prop's name in Data we got that want to put it in select Label,  
     */
    //find the obj in formModels ,that's prop we wnat
    const obj = formModels.find((o)=>{
        return o.prop == prop
    })

    try { 
        const { data } = await request({
            url: `admin/${modelName}/getModuleList`,
            method: 'get'
        })
        // const { data } = await axios.get(`admin/${modelName}/getModuleList`)
        if(!isEmpty(data)) {
            //add select obj key in 

            data.forEach(item => {
                item['value'] = item._id
                item['label'] = item[label]
            }) 
            return obj.options = data 
        }
    }
    catch(err) {                    
        Message({                        
            message: '發生不明的錯誤,請聯絡管理員!!'+err.message,
            type: 'error',
            customClass: 'bg-red-200'
        })
    }
}

// export const commom_Add = async (dataModel, modelName, id = '') => {
//     try {
//         //路由是否帶id-=>修改 不帶id=>新增
//         if(!isEmpty(id)) {
//             let res = await axios.$put(`admin/rest/${modelName}/${id}`, dataModel)
//             return res
//         } else {
//             let res = await axios.$post(`admin/rest/${modelName}`, dataModel)
//             return res
//         }
//     }
//     catch(err) {
//         throw new Error('500 normalAddDatabase server error!')
//     }
// }
// // export const normalFetchDataById = async (modelName, id) => {
// //     try {
// //         const { data } = await this.$axios.$get(`admin/rest/${modelName}/${id}`)
// //         return data
// //     }               
// //     catch(err) {
// //         throw new Error('500 server error!')
// //     }
// // }