const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const d = new Date();

const GoodsCateSchema = new Schema({
    name: {
        type: String, 
    },
    imageUrl: { //分類圖片(通用的圖片字段)
        type: String 
    },
    filter_attr: { //篩選 goodsTypeAttrs id
        type: String
    },
    link: { //跳轉地址
        type: String
    },
    template: { //指定當前分類的模板*/
        type: String
    },
    pid: {
        type: Schema.Types.Mixed,  //混合类型 
        default:'0',
    },
    sub_title: { //SEO 相關的標題
        type: String 
    },
    keywords: { //SEO 關鍵字
        type: String 
    },
    description: { //SEO 描述
        type: String 
    },
    status: {
        type: Number, default : 0
    },
    sort: { 
        type: Number, default: 100 
    },
    create_date: {
        type: Number, default: d.getTime()
    },
    update_date: {
        type: Number
    },  
});

module.exports = GoodsCate = mongoose.model("GoodsCate", GoodsCateSchema);