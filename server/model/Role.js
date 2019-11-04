/**
 * @管理員角色 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const d = new Date();

const RoleSchema = new Schema({
    title: {  
        type: String 
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

module.exports = Role = mongoose.model("Role", RoleSchema);