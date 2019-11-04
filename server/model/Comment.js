/**
 * 測試用接口
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    movie_id: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    text: {
        type: String
    },  
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);