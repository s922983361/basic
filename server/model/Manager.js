const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const d = new Date();

const ManagerSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Enter Name is Neccessary'],
        maxlength: [50, 'Too Long!!'],        
    },
    email: {
        type: String, 
        required: [true, 'Enter email is Neccessary'],
        maxlength: [50, 'Too Long!!'],
        match:[/^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/, 'Value is not a valid email' ]
    },
    tel: {
        type: String
    },
    is_super: {
        type: Boolean, default: false//是否為超級管理員
    },
    role_id:{
        type: Schema.Types.ObjectId, ref: 'Role' //與Role modele關聯
    },
    brand_id: {
        type: [String], ref: 'Brand' //與Brand modele關聯, 可管理的品牌
    },
    password: {
        type: String,
        required: [true, 'Enter password is Neccessary'],
        maxlength: [70, 'Too Long!!']    
    },
    avatar: {
        type: String
    },
    create_date: {
        type: Number, default: d.getTime()
    },
    update_date: {
        type: Number
    },  
});

module.exports = Manager = mongoose.model("Manager", ManagerSchema);