const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    text: {type:String, required: ()=>{ return this.imageUrl} },
    imageUrl: {type: String, required: ()=>{ return this.text} },
    likes: {type: Number},  
    dislikes: {type: Number},
    userLiked: {type: [String]},
    userDisliked: {type: [String]},
    date: {type: String, required: true},
    comments: {type: [Object]},
});

module.exports = mongoose.model('Post', postSchema);