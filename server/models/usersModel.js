const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: {
        type: String,
        required: true,
    },
    friends: [{
        friendEmail: { type: String },
        friendName: { type: String },
        friendSurname: { type: String },
    }],
    adminStatus: { type: Boolean, default: false },
})

module.exports = model('Users', UsersSchema)