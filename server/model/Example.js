const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
    name: {
        type: String
    },
    artcle: {
        type: String
    },
    color: {
        type: [String]
    },
    artcle: {
        type: String
    },
    gender: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date
    },  
});

module.exports = Example = mongoose.model("Example", ExampleSchema);