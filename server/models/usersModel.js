const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: Number, required: true },
    friends: {type: Array, default: []},
})

module.exports = model('Users', UsersSchema)