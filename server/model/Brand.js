const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const d = new Date();

const BrandSchema = new Schema({
    name: {
        type: String, 
        //required: [true, 'Enter Brand Name is Neccessary'],
    },
    manager_id:{
        type: Schema.Types.ObjectId, ref: 'Manager', //與Manager modele關聯
        //required: [true, 'Enter manager_id is Neccessary'],
    },
    logoUrl: {
        type: String
    },
    status: {
        type: Number, default : 0
    },
    create_date: {
        type: Number, default: d.getTime()
    },
    update_date: {
        type: Number
    },  
});

module.exports = Brand = mongoose.model("Brand", BrandSchema);