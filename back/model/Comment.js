const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    text: {type:String, required: true},
    commentId: {type: String}
});

module.exports = mongoose.model('Comment', commentSchema);