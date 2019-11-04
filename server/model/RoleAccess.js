/**
 * @管理員角色 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleAccessSchema = new Schema({
    role_id: { 
        //type: Schema.Types.ObjectId 
        type: String
    },
    access_id: { 
        //type: Schema.Types.ObjectId 
        type: [String]
    },
})

module.exports = RoleAccess = mongoose.model("RoleAccess", RoleAccessSchema);