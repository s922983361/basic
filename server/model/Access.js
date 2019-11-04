/**
 * @權限
 * 1、模块名称: 模块名称就是左侧的主菜单名称，如果增加数据的时候是模块，那么需要指定节点类型是模块，并且选择所属模块为顶级模块
 * 2、节点类型： 1、表示模块   2、表示菜单     3、操作
 * 3、操作名称:如果节点类型是菜单，那么操作名称就是左侧菜单的名称。如果节点类型是操作，那么操作名称就是具体的操作名称
 * 4、操作地址：用户实际访问的地址
 * 5、所属模块：模块（顶级模块）  菜单和操作（父亲模块）
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const d = new Date();

const AccessSchema = new Schema({
    module_name: {  //模組名稱
        type: String 
    },
    icon: { //模組icon
        type: String 
    },      
    action_name: { //操作名稱
        type: String 
    },      
    type: {  // 1、模組   2、菜單     3、操作
        type: Number 
    },   
    url: { 
        type: String 
    },
    module_id: {  //此 module_id 和當前模型_id 關聯  module_id= 0 表示模組名稱
        type: Schema.Types.Mixed,  //混和類型
        default:'0',
        ref: 'Access' //與Access modele關聯(自關聯)
    },
    sort: {
        type: Number,
        default: 100
    },
    description: { 
        type: String 
    },
    status: {
        type: Number,
        default: 1
    },
    create_date: {
        type: Number, default: d.getTime()
    },
    update_date: {
        type: Number
    }, 
})

module.exports = Access = mongoose.model("Access", AccessSchema);