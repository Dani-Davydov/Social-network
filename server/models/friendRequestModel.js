const { Schema, model } = require('mongoose');

const FriendRequestSchema = new Schema({
    fromUserEmail: { type: String, required: true },
    toUserEmail: { type: String, required: true },
    extraInfoFrom: {
        fromName: { type: String, required: true },
        fromSurname: { type: String, required: true },
    },
    extraInfoTo: {
        toName: { type: String, required: true },
        toSurname: { type: String, required: true },
    },
    status: { type: Boolean, default: false },
})

module.exports = model('FriendRequest', FriendRequestSchema)