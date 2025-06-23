const { Schema, model } = require('mongoose');

const PostsSchema = new Schema({
    userId: { type: String, required: true },
    userPosts: [{
        title: { type: String, required: true },
        content: { type: String, required: true },
        comments: {
            type: [{
                author: { type: String, required: true },
                comentContent: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }],
            default: []
        },
        viewStatus: { type: String },
        createdAt: {type: Date, default: Date.now }
    }],
});

module.exports = model('Posts', PostsSchema)

