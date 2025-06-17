const { Schema, model } = require('mongoose');

const PostsSchema = new Schema({
    userId: { type: Number, required: true },
    userPosts: [{
        title: { type: String, required: true },
        content: { type: String, required: true },
    }],
});

module.exports = model('Posts', PostsSchema)

