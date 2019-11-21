const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GoodsType = require('./GoodsType')
const d = new Date();

const GoodsTypeAttrSchema = new Schema({
    name: {
        type: String, 
        //required: [true, 'Enter Brand Name is Neccessary'],
    },
    goodsType_id:{
        type: Schema.Types.ObjectId, ref: 'GoodsType', //與GoodsType modele關聯
        //required: [true, 'Enter manager_id is Neccessary'],
    },
    status: {
        type: Number, default : 0
    },
    attr_type: { 
        type: String 
    },      //类型  1 input/2  textarea/3、select
    attr_value: { 
        type: String 
    },      //默认值： input  textarea默认值是空     select框有默认值  多个默认值以回车隔开
    create_date: {
        type: Number, default: d.getTime()
    },
    update_date: {
        type: Number
    },  
});

module.exports = GoodsTypeAttr = mongoose.model("GoodsTypeAttr", GoodsTypeAttrSchema);