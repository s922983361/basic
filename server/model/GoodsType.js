const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const d = new Date();

const GoodsTypeSchema = new Schema({
    name: {
        type: String, 
    },
    description: { 
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

module.exports = GoodsType = mongoose.model("GoodsType", GoodsTypeSchema);